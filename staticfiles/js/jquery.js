(function (window, undefined) {
    function isArraylike(e) {
        var t = e.length, n = jQuery.type(e);
        if (jQuery.isWindow(e)) {
            return false
        }
        if (e.nodeType === 1 && t) {
            return true
        }
        return n === "array" || n !== "function" && (t === 0 || typeof t === "number" && t > 0 && t - 1 in e)
    }

    function createOptions(e) {
        var t = optionsCache[e] = {};
        jQuery.each(e.match(core_rnotwhite) || [], function (e, n) {
            t[n] = true
        });
        return t
    }

    function Data() {
        Object.defineProperty(this.cache = {}, 0, {get: function () {
            return{}
        }});
        this.expando = jQuery.expando + Math.random()
    }

    function dataAttr(e, t, n) {
        var r;
        if (n === undefined && e.nodeType === 1) {
            r = "data-" + t.replace(rmultiDash, "-$1").toLowerCase();
            n = e.getAttribute(r);
            if (typeof n === "string") {
                try {
                    n = n === "true" ? true : n === "false" ? false : n === "null" ? null : +n + "" === n ? +n : rbrace.test(n) ? JSON.parse(n) : n
                } catch (i) {
                }
                data_user.set(e, t, n)
            } else {
                n = undefined
            }
        }
        return n
    }

    function returnTrue() {
        return true
    }

    function returnFalse() {
        return false
    }

    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (e) {
        }
    }

    function sibling(e, t) {
        while ((e = e[t]) && e.nodeType !== 1) {
        }
        return e
    }

    function winnow(e, t, n) {
        if (jQuery.isFunction(t)) {
            return jQuery.grep(e, function (e, r) {
                return!!t.call(e, r, e) !== n
            })
        }
        if (t.nodeType) {
            return jQuery.grep(e, function (e) {
                return e === t !== n
            })
        }
        if (typeof t === "string") {
            if (isSimple.test(t)) {
                return jQuery.filter(t, e, n)
            }
            t = jQuery.filter(t, e)
        }
        return jQuery.grep(e, function (e) {
            return core_indexOf.call(t, e) >= 0 !== n
        })
    }

    function manipulationTarget(e, t) {
        return jQuery.nodeName(e, "table") && jQuery.nodeName(t.nodeType === 1 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function disableScript(e) {
        e.type = (e.getAttribute("type") !== null) + "/" + e.type;
        return e
    }

    function restoreScript(e) {
        var t = rscriptTypeMasked.exec(e.type);
        if (t) {
            e.type = t[1]
        } else {
            e.removeAttribute("type")
        }
        return e
    }

    function setGlobalEval(e, t) {
        var n = e.length, r = 0;
        for (; r < n; r++) {
            data_priv.set(e[r], "globalEval", !t || data_priv.get(t[r], "globalEval"))
        }
    }

    function cloneCopyEvent(e, t) {
        var n, r, i, s, o, u, a, f;
        if (t.nodeType !== 1) {
            return
        }
        if (data_priv.hasData(e)) {
            s = data_priv.access(e);
            o = data_priv.set(t, s);
            f = s.events;
            if (f) {
                delete o.handle;
                o.events = {};
                for (i in f) {
                    for (n = 0, r = f[i].length; n < r; n++) {
                        jQuery.event.add(t, i, f[i][n])
                    }
                }
            }
        }
        if (data_user.hasData(e)) {
            u = data_user.access(e);
            a = jQuery.extend({}, u);
            data_user.set(t, a)
        }
    }

    function getAll(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === undefined || t && jQuery.nodeName(e, t) ? jQuery.merge([e], n) : n
    }

    function fixInput(e, t) {
        var n = t.nodeName.toLowerCase();
        if (n === "input" && manipulation_rcheckableType.test(e.type)) {
            t.checked = e.checked
        } else if (n === "input" || n === "textarea") {
            t.defaultValue = e.defaultValue
        }
    }

    function vendorPropName(e, t) {
        if (t in e) {
            return t
        }
        var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = cssPrefixes.length;
        while (i--) {
            t = cssPrefixes[i] + n;
            if (t in e) {
                return t
            }
        }
        return r
    }

    function isHidden(e, t) {
        e = t || e;
        return jQuery.css(e, "display") === "none" || !jQuery.contains(e.ownerDocument, e)
    }

    function getStyles(e) {
        return window.getComputedStyle(e, null)
    }

    function showHide(e, t) {
        var n, r, i, s = [], o = 0, u = e.length;
        for (; o < u; o++) {
            r = e[o];
            if (!r.style) {
                continue
            }
            s[o] = data_priv.get(r, "olddisplay");
            n = r.style.display;
            if (t) {
                if (!s[o] && n === "none") {
                    r.style.display = ""
                }
                if (r.style.display === "" && isHidden(r)) {
                    s[o] = data_priv.access(r, "olddisplay", css_defaultDisplay(r.nodeName))
                }
            } else {
                if (!s[o]) {
                    i = isHidden(r);
                    if (n && n !== "none" || !i) {
                        data_priv.set(r, "olddisplay", i ? n : jQuery.css(r, "display"))
                    }
                }
            }
        }
        for (o = 0; o < u; o++) {
            r = e[o];
            if (!r.style) {
                continue
            }
            if (!t || r.style.display === "none" || r.style.display === "") {
                r.style.display = t ? s[o] || "" : "none"
            }
        }
        return e
    }

    function setPositiveNumber(e, t, n) {
        var r = rnumsplit.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function augmentWidthOrHeight(e, t, n, r, i) {
        var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0, o = 0;
        for (; s < 4; s += 2) {
            if (n === "margin") {
                o += jQuery.css(e, n + cssExpand[s], true, i)
            }
            if (r) {
                if (n === "content") {
                    o -= jQuery.css(e, "padding" + cssExpand[s], true, i)
                }
                if (n !== "margin") {
                    o -= jQuery.css(e, "border" + cssExpand[s] + "Width", true, i)
                }
            } else {
                o += jQuery.css(e, "padding" + cssExpand[s], true, i);
                if (n !== "padding") {
                    o += jQuery.css(e, "border" + cssExpand[s] + "Width", true, i)
                }
            }
        }
        return o
    }

    function getWidthOrHeight(e, t, n) {
        var r = true, i = t === "width" ? e.offsetWidth : e.offsetHeight, s = getStyles(e), o = jQuery.support.boxSizing && jQuery.css(e, "boxSizing", false, s) === "border-box";
        if (i <= 0 || i == null) {
            i = curCSS(e, t, s);
            if (i < 0 || i == null) {
                i = e.style[t]
            }
            if (rnumnonpx.test(i)) {
                return i
            }
            r = o && (jQuery.support.boxSizingReliable || i === e.style[t]);
            i = parseFloat(i) || 0
        }
        return i + augmentWidthOrHeight(e, t, n || (o ? "border" : "content"), r, s) + "px"
    }

    function css_defaultDisplay(e) {
        var t = document, n = elemdisplay[e];
        if (!n) {
            n = actualDisplay(e, t);
            if (n === "none" || !n) {
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement);
                t = (iframe[0].contentWindow || iframe[0].contentDocument).document;
                t.write("<!doctype html><html><body>");
                t.close();
                n = actualDisplay(e, t);
                iframe.detach()
            }
            elemdisplay[e] = n
        }
        return n
    }

    function actualDisplay(e, t) {
        var n = jQuery(t.createElement(e)).appendTo(t.body), r = jQuery.css(n[0], "display");
        n.remove();
        return r
    }

    function buildParams(e, t, n, r) {
        var i;
        if (jQuery.isArray(t)) {
            jQuery.each(t, function (t, i) {
                if (n || rbracket.test(e)) {
                    r(e, i)
                } else {
                    buildParams(e + "[" + (typeof i === "object" ? t : "") + "]", i, n, r)
                }
            })
        } else if (!n && jQuery.type(t) === "object") {
            for (i in t) {
                buildParams(e + "[" + i + "]", t[i], n, r)
            }
        } else {
            r(e, t)
        }
    }

    function addToPrefiltersOrTransports(e) {
        return function (t, n) {
            if (typeof t !== "string") {
                n = t;
                t = "*"
            }
            var r, i = 0, s = t.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(n)) {
                while (r = s[i++]) {
                    if (r[0] === "+") {
                        r = r.slice(1) || "*";
                        (e[r] = e[r] || []).unshift(n)
                    } else {
                        (e[r] = e[r] || []).push(n)
                    }
                }
            }
        }
    }

    function inspectPrefiltersOrTransports(e, t, n, r) {
        function o(u) {
            var a;
            i[u] = true;
            jQuery.each(e[u] || [], function (e, u) {
                var f = u(t, n, r);
                if (typeof f === "string" && !s && !i[f]) {
                    t.dataTypes.unshift(f);
                    o(f);
                    return false
                } else if (s) {
                    return!(a = f)
                }
            });
            return a
        }

        var i = {}, s = e === transports;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function ajaxExtend(e, t) {
        var n, r, i = jQuery.ajaxSettings.flatOptions || {};
        for (n in t) {
            if (t[n] !== undefined) {
                (i[n] ? e : r || (r = {}))[n] = t[n]
            }
        }
        if (r) {
            jQuery.extend(true, e, r)
        }
        return e
    }

    function ajaxHandleResponses(e, t, n) {
        var r, i, s, o, u = e.contents, a = e.dataTypes;
        while (a[0] === "*") {
            a.shift();
            if (r === undefined) {
                r = e.mimeType || t.getResponseHeader("Content-Type")
            }
        }
        if (r) {
            for (i in u) {
                if (u[i] && u[i].test(r)) {
                    a.unshift(i);
                    break
                }
            }
        }
        if (a[0]in n) {
            s = a[0]
        } else {
            for (i in n) {
                if (!a[0] || e.converters[i + " " + a[0]]) {
                    s = i;
                    break
                }
                if (!o) {
                    o = i
                }
            }
            s = s || o
        }
        if (s) {
            if (s !== a[0]) {
                a.unshift(s)
            }
            return n[s]
        }
    }

    function ajaxConvert(e, t, n, r) {
        var i, s, o, u, a, f = {}, l = e.dataTypes.slice();
        if (l[1]) {
            for (o in e.converters) {
                f[o.toLowerCase()] = e.converters[o]
            }
        }
        s = l.shift();
        while (s) {
            if (e.responseFields[s]) {
                n[e.responseFields[s]] = t
            }
            if (!a && r && e.dataFilter) {
                t = e.dataFilter(t, e.dataType)
            }
            a = s;
            s = l.shift();
            if (s) {
                if (s === "*") {
                    s = a
                } else if (a !== "*" && a !== s) {
                    o = f[a + " " + s] || f["* " + s];
                    if (!o) {
                        for (i in f) {
                            u = i.split(" ");
                            if (u[1] === s) {
                                o = f[a + " " + u[0]] || f["* " + u[0]];
                                if (o) {
                                    if (o === true) {
                                        o = f[i]
                                    } else if (f[i] !== true) {
                                        s = u[0];
                                        l.unshift(u[1])
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (o !== true) {
                        if (o && e["throws"]) {
                            t = o(t)
                        } else {
                            try {
                                t = o(t)
                            } catch (c) {
                                return{state: "parsererror", error: o ? c : "No conversion from " + a + " to " + s}
                            }
                        }
                    }
                }
            }
        }
        return{state: "success", data: t}
    }

    function createFxNow() {
        setTimeout(function () {
            fxNow = undefined
        });
        return fxNow = jQuery.now()
    }

    function createTween(e, t, n) {
        var r, i = (tweeners[t] || []).concat(tweeners["*"]), s = 0, o = i.length;
        for (; s < o; s++) {
            if (r = i[s].call(n, t, e)) {
                return r
            }
        }
    }

    function Animation(e, t, n) {
        var r, i, s = 0, o = animationPrefilters.length, u = jQuery.Deferred().always(function () {
            delete a.elem
        }), a = function () {
            if (i) {
                return false
            }
            var t = fxNow || createFxNow(), n = Math.max(0, f.startTime + f.duration - t), r = n / f.duration || 0, s = 1 - r, o = 0, a = f.tweens.length;
            for (; o < a; o++) {
                f.tweens[o].run(s)
            }
            u.notifyWith(e, [f, s, n]);
            if (s < 1 && a) {
                return n
            } else {
                u.resolveWith(e, [f]);
                return false
            }
        }, f = u.promise({elem: e, props: jQuery.extend({}, t), opts: jQuery.extend(true, {specialEasing: {}}, n), originalProperties: t, originalOptions: n, startTime: fxNow || createFxNow(), duration: n.duration, tweens: [], createTween: function (t, n) {
            var r = jQuery.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
            f.tweens.push(r);
            return r
        }, stop: function (t) {
            var n = 0, r = t ? f.tweens.length : 0;
            if (i) {
                return this
            }
            i = true;
            for (; n < r; n++) {
                f.tweens[n].run(1)
            }
            if (t) {
                u.resolveWith(e, [f, t])
            } else {
                u.rejectWith(e, [f, t])
            }
            return this
        }}), l = f.props;
        propFilter(l, f.opts.specialEasing);
        for (; s < o; s++) {
            r = animationPrefilters[s].call(f, e, l, f.opts);
            if (r) {
                return r
            }
        }
        jQuery.map(l, createTween, f);
        if (jQuery.isFunction(f.opts.start)) {
            f.opts.start.call(e, f)
        }
        jQuery.fx.timer(jQuery.extend(a, {elem: e, anim: f, queue: f.opts.queue}));
        return f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function propFilter(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = jQuery.camelCase(n);
            i = t[r];
            s = e[n];
            if (jQuery.isArray(s)) {
                i = s[1];
                s = e[n] = s[0]
            }
            if (n !== r) {
                e[r] = s;
                delete e[n]
            }
            o = jQuery.cssHooks[r];
            if (o && "expand"in o) {
                s = o.expand(s);
                delete e[r];
                for (n in s) {
                    if (!(n in e)) {
                        e[n] = s[n];
                        t[n] = i
                    }
                }
            } else {
                t[r] = i
            }
        }
    }

    function defaultPrefilter(e, t, n) {
        var r, i, s, o, u, a, f = this, l = {}, c = e.style, h = e.nodeType && isHidden(e), p = data_priv.get(e, "fxshow");
        if (!n.queue) {
            u = jQuery._queueHooks(e, "fx");
            if (u.unqueued == null) {
                u.unqueued = 0;
                a = u.empty.fire;
                u.empty.fire = function () {
                    if (!u.unqueued) {
                        a()
                    }
                }
            }
            u.unqueued++;
            f.always(function () {
                f.always(function () {
                    u.unqueued--;
                    if (!jQuery.queue(e, "fx").length) {
                        u.empty.fire()
                    }
                })
            })
        }
        if (e.nodeType === 1 && ("height"in t || "width"in t)) {
            n.overflow = [c.overflow, c.overflowX, c.overflowY];
            if (jQuery.css(e, "display") === "inline" && jQuery.css(e, "float") === "none") {
                c.display = "inline-block"
            }
        }
        if (n.overflow) {
            c.overflow = "hidden";
            f.always(function () {
                c.overflow = n.overflow[0];
                c.overflowX = n.overflow[1];
                c.overflowY = n.overflow[2]
            })
        }
        for (r in t) {
            i = t[r];
            if (rfxtypes.exec(i)) {
                delete t[r];
                s = s || i === "toggle";
                if (i === (h ? "hide" : "show")) {
                    if (i === "show" && p && p[r] !== undefined) {
                        h = true
                    } else {
                        continue
                    }
                }
                l[r] = p && p[r] || jQuery.style(e, r)
            }
        }
        if (!jQuery.isEmptyObject(l)) {
            if (p) {
                if ("hidden"in p) {
                    h = p.hidden
                }
            } else {
                p = data_priv.access(e, "fxshow", {})
            }
            if (s) {
                p.hidden = !h
            }
            if (h) {
                jQuery(e).show()
            } else {
                f.done(function () {
                    jQuery(e).hide()
                })
            }
            f.done(function () {
                var t;
                data_priv.remove(e, "fxshow");
                for (t in l) {
                    jQuery.style(e, t, l[t])
                }
            });
            for (r in l) {
                o = createTween(h ? p[r] : 0, r, f);
                if (!(r in p)) {
                    p[r] = o.start;
                    if (h) {
                        o.end = o.start;
                        o.start = r === "width" || r === "height" ? 1 : 0
                    }
                }
            }
        }
    }

    function Tween(e, t, n, r, i) {
        return new Tween.prototype.init(e, t, n, r, i)
    }

    function genFx(e, t) {
        var n, r = {height: e}, i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t) {
            n = cssExpand[i];
            r["margin" + n] = r["padding" + n] = e
        }
        if (t) {
            r.opacity = r.width = e
        }
        return r
    }

    function getWindow(e) {
        return jQuery.isWindow(e) ? e : e.nodeType === 9 && e.defaultView
    }

    var rootjQuery, readyList, core_strundefined = typeof undefined, location = window.location, document = window.document, docElem = document.documentElement, _jQuery = window.jQuery, _$ = window.$, class2type = {}, core_deletedIds = [], core_version = "2.0.3", core_concat = core_deletedIds.concat, core_push = core_deletedIds.push, core_slice = core_deletedIds.slice, core_indexOf = core_deletedIds.indexOf, core_toString = class2type.toString, core_hasOwn = class2type.hasOwnProperty, core_trim = core_version.trim, jQuery = function (e, t) {
        return new jQuery.fn.init(e, t, rootjQuery)
    }, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, core_rnotwhite = /\S+/g, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (e, t) {
        return t.toUpperCase()
    }, completed = function () {
        document.removeEventListener("DOMContentLoaded", completed, false);
        window.removeEventListener("load", completed, false);
        jQuery.ready()
    };
    jQuery.fn = jQuery.prototype = {jquery: core_version, constructor: jQuery, init: function (e, t, n) {
        var r, i;
        if (!e) {
            return this
        }
        if (typeof e === "string") {
            if (e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3) {
                r = [null, e, null]
            } else {
                r = rquickExpr.exec(e)
            }
            if (r && (r[1] || !t)) {
                if (r[1]) {
                    t = t instanceof jQuery ? t[0] : t;
                    jQuery.merge(this, jQuery.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : document, true));
                    if (rsingleTag.test(r[1]) && jQuery.isPlainObject(t)) {
                        for (r in t) {
                            if (jQuery.isFunction(this[r])) {
                                this[r](t[r])
                            } else {
                                this.attr(r, t[r])
                            }
                        }
                    }
                    return this
                } else {
                    i = document.getElementById(r[2]);
                    if (i && i.parentNode) {
                        this.length = 1;
                        this[0] = i
                    }
                    this.context = document;
                    this.selector = e;
                    return this
                }
            } else if (!t || t.jquery) {
                return(t || n).find(e)
            } else {
                return this.constructor(t).find(e)
            }
        } else if (e.nodeType) {
            this.context = this[0] = e;
            this.length = 1;
            return this
        } else if (jQuery.isFunction(e)) {
            return n.ready(e)
        }
        if (e.selector !== undefined) {
            this.selector = e.selector;
            this.context = e.context
        }
        return jQuery.makeArray(e, this)
    }, selector: "", length: 0, toArray: function () {
        return core_slice.call(this)
    }, get: function (e) {
        return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
    }, pushStack: function (e) {
        var t = jQuery.merge(this.constructor(), e);
        t.prevObject = this;
        t.context = this.context;
        return t
    }, each: function (e, t) {
        return jQuery.each(this, e, t)
    }, ready: function (e) {
        jQuery.ready.promise().done(e);
        return this
    }, slice: function () {
        return this.pushStack(core_slice.apply(this, arguments))
    }, first: function () {
        return this.eq(0)
    }, last: function () {
        return this.eq(-1)
    }, eq: function (e) {
        var t = this.length, n = +e + (e < 0 ? t : 0);
        return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
    }, map: function (e) {
        return this.pushStack(jQuery.map(this, function (t, n) {
            return e.call(t, n, t)
        }))
    }, end: function () {
        return this.prevObject || this.constructor(null)
    }, push: core_push, sort: [].sort, splice: [].splice};
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function () {
        var e, t, n, r, i, s, o = arguments[0] || {}, u = 1, a = arguments.length, f = false;
        if (typeof o === "boolean") {
            f = o;
            o = arguments[1] || {};
            u = 2
        }
        if (typeof o !== "object" && !jQuery.isFunction(o)) {
            o = {}
        }
        if (a === u) {
            o = this;
            --u
        }
        for (; u < a; u++) {
            if ((e = arguments[u]) != null) {
                for (t in e) {
                    n = o[t];
                    r = e[t];
                    if (o === r) {
                        continue
                    }
                    if (f && r && (jQuery.isPlainObject(r) || (i = jQuery.isArray(r)))) {
                        if (i) {
                            i = false;
                            s = n && jQuery.isArray(n) ? n : []
                        } else {
                            s = n && jQuery.isPlainObject(n) ? n : {}
                        }
                        o[t] = jQuery.extend(f, s, r)
                    } else if (r !== undefined) {
                        o[t] = r
                    }
                }
            }
        }
        return o
    };
    jQuery.extend({expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""), noConflict: function (e) {
        if (window.$ === jQuery) {
            window.$ = _$
        }
        if (e && window.jQuery === jQuery) {
            window.jQuery = _jQuery
        }
        return jQuery
    }, isReady: false, readyWait: 1, holdReady: function (e) {
        if (e) {
            jQuery.readyWait++
        } else {
            jQuery.ready(true)
        }
    }, ready: function (e) {
        if (e === true ? --jQuery.readyWait : jQuery.isReady) {
            return
        }
        jQuery.isReady = true;
        if (e !== true && --jQuery.readyWait > 0) {
            return
        }
        readyList.resolveWith(document, [jQuery]);
        if (jQuery.fn.trigger) {
            jQuery(document).trigger("ready").off("ready")
        }
    }, isFunction: function (e) {
        return jQuery.type(e) === "function"
    }, isArray: Array.isArray, isWindow: function (e) {
        return e != null && e === e.window
    }, isNumeric: function (e) {
        return!isNaN(parseFloat(e)) && isFinite(e)
    }, type: function (e) {
        if (e == null) {
            return String(e)
        }
        return typeof e === "object" || typeof e === "function" ? class2type[core_toString.call(e)] || "object" : typeof e
    }, isPlainObject: function (e) {
        if (jQuery.type(e) !== "object" || e.nodeType || jQuery.isWindow(e)) {
            return false
        }
        try {
            if (e.constructor && !core_hasOwn.call(e.constructor.prototype, "isPrototypeOf")) {
                return false
            }
        } catch (t) {
            return false
        }
        return true
    }, isEmptyObject: function (e) {
        var t;
        for (t in e) {
            return false
        }
        return true
    }, error: function (e) {
        throw new Error(e)
    }, parseHTML: function (e, t, n) {
        if (!e || typeof e !== "string") {
            return null
        }
        if (typeof t === "boolean") {
            n = t;
            t = false
        }
        t = t || document;
        var r = rsingleTag.exec(e), i = !n && [];
        if (r) {
            return[t.createElement(r[1])]
        }
        r = jQuery.buildFragment([e], t, i);
        if (i) {
            jQuery(i).remove()
        }
        return jQuery.merge([], r.childNodes)
    }, parseJSON: JSON.parse, parseXML: function (e) {
        var t, n;
        if (!e || typeof e !== "string") {
            return null
        }
        try {
            n = new DOMParser;
            t = n.parseFromString(e, "text/xml")
        } catch (r) {
            t = undefined
        }
        if (!t || t.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + e)
        }
        return t
    }, noop: function () {
    }, globalEval: function (code) {
        var script, indirect = eval;
        code = jQuery.trim(code);
        if (code) {
            if (code.indexOf("use strict") === 1) {
                script = document.createElement("script");
                script.text = code;
                document.head.appendChild(script).parentNode.removeChild(script)
            } else {
                indirect(code)
            }
        }
    }, camelCase: function (e) {
        return e.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
    }, nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t, n) {
        var r, i = 0, s = e.length, o = isArraylike(e);
        if (n) {
            if (o) {
                for (; i < s; i++) {
                    r = t.apply(e[i], n);
                    if (r === false) {
                        break
                    }
                }
            } else {
                for (i in e) {
                    r = t.apply(e[i], n);
                    if (r === false) {
                        break
                    }
                }
            }
        } else {
            if (o) {
                for (; i < s; i++) {
                    r = t.call(e[i], i, e[i]);
                    if (r === false) {
                        break
                    }
                }
            } else {
                for (i in e) {
                    r = t.call(e[i], i, e[i]);
                    if (r === false) {
                        break
                    }
                }
            }
        }
        return e
    }, trim: function (e) {
        return e == null ? "" : core_trim.call(e)
    }, makeArray: function (e, t) {
        var n = t || [];
        if (e != null) {
            if (isArraylike(Object(e))) {
                jQuery.merge(n, typeof e === "string" ? [e] : e)
            } else {
                core_push.call(n, e)
            }
        }
        return n
    }, inArray: function (e, t, n) {
        return t == null ? -1 : core_indexOf.call(t, e, n)
    }, merge: function (e, t) {
        var n = t.length, r = e.length, i = 0;
        if (typeof n === "number") {
            for (; i < n; i++) {
                e[r++] = t[i]
            }
        } else {
            while (t[i] !== undefined) {
                e[r++] = t[i++]
            }
        }
        e.length = r;
        return e
    }, grep: function (e, t, n) {
        var r, i = [], s = 0, o = e.length;
        n = !!n;
        for (; s < o; s++) {
            r = !!t(e[s], s);
            if (n !== r) {
                i.push(e[s])
            }
        }
        return i
    }, map: function (e, t, n) {
        var r, i = 0, s = e.length, o = isArraylike(e), u = [];
        if (o) {
            for (; i < s; i++) {
                r = t(e[i], i, n);
                if (r != null) {
                    u[u.length] = r
                }
            }
        } else {
            for (i in e) {
                r = t(e[i], i, n);
                if (r != null) {
                    u[u.length] = r
                }
            }
        }
        return core_concat.apply([], u)
    }, guid: 1, proxy: function (e, t) {
        var n, r, i;
        if (typeof t === "string") {
            n = e[t];
            t = e;
            e = n
        }
        if (!jQuery.isFunction(e)) {
            return undefined
        }
        r = core_slice.call(arguments, 2);
        i = function () {
            return e.apply(t || this, r.concat(core_slice.call(arguments)))
        };
        i.guid = e.guid = e.guid || jQuery.guid++;
        return i
    }, access: function (e, t, n, r, i, s, o) {
        var u = 0, a = e.length, f = n == null;
        if (jQuery.type(n) === "object") {
            i = true;
            for (u in n) {
                jQuery.access(e, t, u, n[u], true, s, o)
            }
        } else if (r !== undefined) {
            i = true;
            if (!jQuery.isFunction(r)) {
                o = true
            }
            if (f) {
                if (o) {
                    t.call(e, r);
                    t = null
                } else {
                    f = t;
                    t = function (e, t, n) {
                        return f.call(jQuery(e), n)
                    }
                }
            }
            if (t) {
                for (; u < a; u++) {
                    t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
                }
            }
        }
        return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
    }, now: Date.now, swap: function (e, t, n, r) {
        var i, s, o = {};
        for (s in t) {
            o[s] = e.style[s];
            e.style[s] = t[s]
        }
        i = n.apply(e, r || []);
        for (s in t) {
            e.style[s] = o[s]
        }
        return i
    }});
    jQuery.ready.promise = function (e) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready)
            } else {
                document.addEventListener("DOMContentLoaded", completed, false);
                window.addEventListener("load", completed, false)
            }
        }
        return readyList.promise(e)
    };
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        class2type["[object " + t + "]"] = t.toLowerCase()
    });
    rootjQuery = jQuery(document);
    (function (e, t) {
        function st(e, t, n, i) {
            var s, o, u, a, f, l, p, m, g, E;
            if ((t ? t.ownerDocument || t : w) !== h) {
                c(t)
            }
            t = t || h;
            n = n || [];
            if (!e || typeof e !== "string") {
                return n
            }
            if ((a = t.nodeType) !== 1 && a !== 9) {
                return[]
            }
            if (d && !i) {
                if (s = Y.exec(e)) {
                    if (u = s[1]) {
                        if (a === 9) {
                            o = t.getElementById(u);
                            if (o && o.parentNode) {
                                if (o.id === u) {
                                    n.push(o);
                                    return n
                                }
                            } else {
                                return n
                            }
                        } else {
                            if (t.ownerDocument && (o = t.ownerDocument.getElementById(u)) && y(t, o) && o.id === u) {
                                n.push(o);
                                return n
                            }
                        }
                    } else if (s[2]) {
                        P.apply(n, t.getElementsByTagName(e));
                        return n
                    } else if ((u = s[3]) && r.getElementsByClassName && t.getElementsByClassName) {
                        P.apply(n, t.getElementsByClassName(u));
                        return n
                    }
                }
                if (r.qsa && (!v || !v.test(e))) {
                    m = p = b;
                    g = t;
                    E = a === 9 && e;
                    if (a === 1 && t.nodeName.toLowerCase() !== "object") {
                        l = vt(e);
                        if (p = t.getAttribute("id")) {
                            m = p.replace(tt, "\\$&")
                        } else {
                            t.setAttribute("id", m)
                        }
                        m = "[id='" + m + "'] ";
                        f = l.length;
                        while (f--) {
                            l[f] = m + mt(l[f])
                        }
                        g = V.test(e) && t.parentNode || t;
                        E = l.join(",")
                    }
                    if (E) {
                        try {
                            P.apply(n, g.querySelectorAll(E));
                            return n
                        } catch (S) {
                        } finally {
                            if (!p) {
                                t.removeAttribute("id")
                            }
                        }
                    }
                }
            }
            return Tt(e.replace(z, "$1"), t, n, i)
        }

        function ot() {
            function t(n, r) {
                if (e.push(n += " ") > s.cacheLength) {
                    delete t[e.shift()]
                }
                return t[n] = r
            }

            var e = [];
            return t
        }

        function ut(e) {
            e[b] = true;
            return e
        }

        function at(e) {
            var t = h.createElement("div");
            try {
                return!!e(t)
            } catch (n) {
                return false
            } finally {
                if (t.parentNode) {
                    t.parentNode.removeChild(t)
                }
                t = null
            }
        }

        function ft(e, t) {
            var n = e.split("|"), r = e.length;
            while (r--) {
                s.attrHandle[n[r]] = t
            }
        }

        function lt(e, t) {
            var n = t && e, r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || A) - (~e.sourceIndex || A);
            if (r) {
                return r
            }
            if (n) {
                while (n = n.nextSibling) {
                    if (n === t) {
                        return-1
                    }
                }
            }
            return e ? 1 : -1
        }

        function ct(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e
            }
        }

        function ht(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return(n === "input" || n === "button") && t.type === e
            }
        }

        function pt(e) {
            return ut(function (t) {
                t = +t;
                return ut(function (n, r) {
                    var i, s = e([], n.length, t), o = s.length;
                    while (o--) {
                        if (n[i = s[o]]) {
                            n[i] = !(r[i] = n[i])
                        }
                    }
                })
            })
        }

        function dt() {
        }

        function vt(e, t) {
            var n, r, i, o, u, a, f, l = T[e + " "];
            if (l) {
                return t ? 0 : l.slice(0)
            }
            u = e;
            a = [];
            f = s.preFilter;
            while (u) {
                if (!n || (r = W.exec(u))) {
                    if (r) {
                        u = u.slice(r[0].length) || u
                    }
                    a.push(i = [])
                }
                n = false;
                if (r = X.exec(u)) {
                    n = r.shift();
                    i.push({value: n, type: r[0].replace(z, " ")});
                    u = u.slice(n.length)
                }
                for (o in s.filter) {
                    if ((r = Q[o].exec(u)) && (!f[o] || (r = f[o](r)))) {
                        n = r.shift();
                        i.push({value: n, type: o, matches: r});
                        u = u.slice(n.length)
                    }
                }
                if (!n) {
                    break
                }
            }
            return t ? u.length : u ? st.error(e) : T(e, a).slice(0)
        }

        function mt(e) {
            var t = 0, n = e.length, r = "";
            for (; t < n; t++) {
                r += e[t].value
            }
            return r
        }

        function gt(e, t, n) {
            var r = t.dir, s = n && r === "parentNode", o = S++;
            return t.first ? function (t, n, i) {
                while (t = t[r]) {
                    if (t.nodeType === 1 || s) {
                        return e(t, n, i)
                    }
                }
            } : function (t, n, u) {
                var a, f, l, c = E + " " + o;
                if (u) {
                    while (t = t[r]) {
                        if (t.nodeType === 1 || s) {
                            if (e(t, n, u)) {
                                return true
                            }
                        }
                    }
                } else {
                    while (t = t[r]) {
                        if (t.nodeType === 1 || s) {
                            l = t[b] || (t[b] = {});
                            if ((f = l[r]) && f[0] === c) {
                                if ((a = f[1]) === true || a === i) {
                                    return a === true
                                }
                            } else {
                                f = l[r] = [c];
                                f[1] = e(t, n, u) || i;
                                if (f[1] === true) {
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }

        function yt(e) {
            return e.length > 1 ? function (t, n, r) {
                var i = e.length;
                while (i--) {
                    if (!e[i](t, n, r)) {
                        return false
                    }
                }
                return true
            } : e[0]
        }

        function bt(e, t, n, r, i) {
            var s, o = [], u = 0, a = e.length, f = t != null;
            for (; u < a; u++) {
                if (s = e[u]) {
                    if (!n || n(s, r, i)) {
                        o.push(s);
                        if (f) {
                            t.push(u)
                        }
                    }
                }
            }
            return o
        }

        function wt(e, t, n, r, i, s) {
            if (r && !r[b]) {
                r = wt(r)
            }
            if (i && !i[b]) {
                i = wt(i, s)
            }
            return ut(function (s, o, u, a) {
                var f, l, c, h = [], p = [], d = o.length, v = s || xt(t || "*", u.nodeType ? [u] : u, []), m = e && (s || !t) ? bt(v, h, e, u, a) : v, g = n ? i || (s ? e : d || r) ? [] : o : m;
                if (n) {
                    n(m, g, u, a)
                }
                if (r) {
                    f = bt(g, p);
                    r(f, [], u, a);
                    l = f.length;
                    while (l--) {
                        if (c = f[l]) {
                            g[p[l]] = !(m[p[l]] = c)
                        }
                    }
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [];
                            l = g.length;
                            while (l--) {
                                if (c = g[l]) {
                                    f.push(m[l] = c)
                                }
                            }
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--) {
                            if ((c = g[l]) && (f = i ? B.call(s, c) : h[l]) > -1) {
                                s[f] = !(o[f] = c)
                            }
                        }
                    }
                } else {
                    g = bt(g === o ? g.splice(d, g.length) : g);
                    if (i) {
                        i(null, o, g, a)
                    } else {
                        P.apply(o, g)
                    }
                }
            })
        }

        function Et(e) {
            var t, n, r, i = e.length, o = s.relative[e[0].type], u = o || s.relative[" "], a = o ? 1 : 0, l = gt(function (e) {
                return e === t
            }, u, true), c = gt(function (e) {
                return B.call(t, e) > -1
            }, u, true), h = [function (e, n, r) {
                return!o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
            }];
            for (; a < i; a++) {
                if (n = s.relative[e[a].type]) {
                    h = [gt(yt(h), n)]
                } else {
                    n = s.filter[e[a].type].apply(null, e[a].matches);
                    if (n[b]) {
                        r = ++a;
                        for (; r < i; r++) {
                            if (s.relative[e[r].type]) {
                                break
                            }
                        }
                        return wt(a > 1 && yt(h), a > 1 && mt(e.slice(0, a - 1).concat({value: e[a - 2].type === " " ? "*" : ""})).replace(z, "$1"), n, a < r && Et(e.slice(a, r)), r < i && Et(e = e.slice(r)), r < i && mt(e))
                    }
                    h.push(n)
                }
            }
            return yt(h)
        }

        function St(e, t) {
            var n = 0, r = t.length > 0, o = e.length > 0, u = function (u, a, l, c, p) {
                var d, v, m, g = [], y = 0, b = "0", w = u && [], S = p != null, x = f, T = u || o && s.find["TAG"]("*", p && a.parentNode || a), N = E += x == null ? 1 : Math.random() || .1;
                if (S) {
                    f = a !== h && a;
                    i = n
                }
                for (; (d = T[b]) != null; b++) {
                    if (o && d) {
                        v = 0;
                        while (m = e[v++]) {
                            if (m(d, a, l)) {
                                c.push(d);
                                break
                            }
                        }
                        if (S) {
                            E = N;
                            i = ++n
                        }
                    }
                    if (r) {
                        if (d = !m && d) {
                            y--
                        }
                        if (u) {
                            w.push(d)
                        }
                    }
                }
                y += b;
                if (r && b !== y) {
                    v = 0;
                    while (m = t[v++]) {
                        m(w, g, a, l)
                    }
                    if (u) {
                        if (y > 0) {
                            while (b--) {
                                if (!(w[b] || g[b])) {
                                    g[b] = _.call(c)
                                }
                            }
                        }
                        g = bt(g)
                    }
                    P.apply(c, g);
                    if (S && !u && g.length > 0 && y + t.length > 1) {
                        st.uniqueSort(c)
                    }
                }
                if (S) {
                    E = N;
                    f = x
                }
                return w
            };
            return r ? ut(u) : u
        }

        function xt(e, t, n) {
            var r = 0, i = t.length;
            for (; r < i; r++) {
                st(e, t[r], n)
            }
            return n
        }

        function Tt(e, t, n, i) {
            var o, u, f, l, c, h = vt(e);
            if (!i) {
                if (h.length === 1) {
                    u = h[0] = h[0].slice(0);
                    if (u.length > 2 && (f = u[0]).type === "ID" && r.getById && t.nodeType === 9 && d && s.relative[u[1].type]) {
                        t = (s.find["ID"](f.matches[0].replace(nt, rt), t) || [])[0];
                        if (!t) {
                            return n
                        }
                        e = e.slice(u.shift().value.length)
                    }
                    o = Q["needsContext"].test(e) ? 0 : u.length;
                    while (o--) {
                        f = u[o];
                        if (s.relative[l = f.type]) {
                            break
                        }
                        if (c = s.find[l]) {
                            if (i = c(f.matches[0].replace(nt, rt), V.test(u[0].type) && t.parentNode || t)) {
                                u.splice(o, 1);
                                e = i.length && mt(u);
                                if (!e) {
                                    P.apply(n, i);
                                    return n
                                }
                                break
                            }
                        }
                    }
                }
            }
            a(e, h)(i, t, !d, n, V.test(e));
            return n
        }

        var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b = "sizzle" + -(new Date), w = e.document, E = 0, S = 0, x = ot(), T = ot(), N = ot(), C = false, k = function (e, t) {
            if (e === t) {
                C = true;
                return 0
            }
            return 0
        }, L = typeof t, A = 1 << 31, O = {}.hasOwnProperty, M = [], _ = M.pop, D = M.push, P = M.push, H = M.slice, B = M.indexOf || function (e) {
            var t = 0, n = this.length;
            for (; t < n; t++) {
                if (this[t] === e) {
                    return t
                }
            }
            return-1
        }, j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", F = "[\\x20\\t\\r\\n\\f]", I = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", q = I.replace("w", "w#"), R = "\\[" + F + "*(" + I + ")" + F + "*(?:([*^$|!~]?=)" + F + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + q + ")|)|)" + F + "*\\]", U = ":(" + I + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + R.replace(3, 8) + ")*)|.*)\\)|)", z = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"), W = new RegExp("^" + F + "*," + F + "*"), X = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"), V = new RegExp(F + "*[+~]"), $ = new RegExp("=" + F + "*([^\\]'\"]*)" + F + "*\\]", "g"), J = new RegExp(U), K = new RegExp("^" + q + "$"), Q = {ID: new RegExp("^#(" + I + ")"), CLASS: new RegExp("^\\.(" + I + ")"), TAG: new RegExp("^(" + I.replace("w", "w*") + ")"), ATTR: new RegExp("^" + R), PSEUDO: new RegExp("^" + U), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"), bool: new RegExp("^(?:" + j + ")$", "i"), needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")}, G = /^[^{]+\{\s*\[native \w/, Y = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Z = /^(?:input|select|textarea|button)$/i, et = /^h\d$/i, tt = /'|\\/g, nt = new RegExp("\\\\([\\da-f]{1,6}" + F + "?|(" + F + ")|.)", "ig"), rt = function (e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
        };
        try {
            P.apply(M = H.call(w.childNodes), w.childNodes);
            M[w.childNodes.length].nodeType
        } catch (it) {
            P = {apply: M.length ? function (e, t) {
                D.apply(e, H.call(t))
            } : function (e, t) {
                var n = e.length, r = 0;
                while (e[n++] = t[r++]) {
                }
                e.length = n - 1
            }}
        }
        u = st.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : false
        };
        r = st.support = {};
        c = st.setDocument = function (e) {
            var t = e ? e.ownerDocument || e : w, n = t.defaultView;
            if (t === h || t.nodeType !== 9 || !t.documentElement) {
                return h
            }
            h = t;
            p = t.documentElement;
            d = !u(t);
            if (n && n.attachEvent && n !== n.top) {
                n.attachEvent("onbeforeunload", function () {
                    c()
                })
            }
            r.attributes = at(function (e) {
                e.className = "i";
                return!e.getAttribute("className")
            });
            r.getElementsByTagName = at(function (e) {
                e.appendChild(t.createComment(""));
                return!e.getElementsByTagName("*").length
            });
            r.getElementsByClassName = at(function (e) {
                e.innerHTML = "<div class='a'></div><div class='a i'></div>";
                e.firstChild.className = "i";
                return e.getElementsByClassName("i").length === 2
            });
            r.getById = at(function (e) {
                p.appendChild(e).id = b;
                return!t.getElementsByName || !t.getElementsByName(b).length
            });
            if (r.getById) {
                s.find["ID"] = function (e, t) {
                    if (typeof t.getElementById !== L && d) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                };
                s.filter["ID"] = function (e) {
                    var t = e.replace(nt, rt);
                    return function (e) {
                        return e.getAttribute("id") === t
                    }
                }
            } else {
                delete s.find["ID"];
                s.filter["ID"] = function (e) {
                    var t = e.replace(nt, rt);
                    return function (e) {
                        var n = typeof e.getAttributeNode !== L && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }
            }
            s.find["TAG"] = r.getElementsByTagName ? function (e, t) {
                if (typeof t.getElementsByTagName !== L) {
                    return t.getElementsByTagName(e)
                }
            } : function (e, t) {
                var n, r = [], i = 0, s = t.getElementsByTagName(e);
                if (e === "*") {
                    while (n = s[i++]) {
                        if (n.nodeType === 1) {
                            r.push(n)
                        }
                    }
                    return r
                }
                return s
            };
            s.find["CLASS"] = r.getElementsByClassName && function (e, t) {
                if (typeof t.getElementsByClassName !== L && d) {
                    return t.getElementsByClassName(e)
                }
            };
            m = [];
            v = [];
            if (r.qsa = G.test(t.querySelectorAll)) {
                at(function (e) {
                    e.innerHTML = "<select><option selected=''></option></select>";
                    if (!e.querySelectorAll("[selected]").length) {
                        v.push("\\[" + F + "*(?:value|" + j + ")")
                    }
                    if (!e.querySelectorAll(":checked").length) {
                        v.push(":checked")
                    }
                });
                at(function (e) {
                    var n = t.createElement("input");
                    n.setAttribute("type", "hidden");
                    e.appendChild(n).setAttribute("t", "");
                    if (e.querySelectorAll("[t^='']").length) {
                        v.push("[*^$]=" + F + "*(?:''|\"\")")
                    }
                    if (!e.querySelectorAll(":enabled").length) {
                        v.push(":enabled", ":disabled")
                    }
                    e.querySelectorAll("*,:x");
                    v.push(",.*:")
                })
            }
            if (r.matchesSelector = G.test(g = p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) {
                at(function (e) {
                    r.disconnectedMatch = g.call(e, "div");
                    g.call(e, "[s!='']:x");
                    m.push("!=", U)
                })
            }
            v = v.length && new RegExp(v.join("|"));
            m = m.length && new RegExp(m.join("|"));
            y = G.test(p.contains) || p.compareDocumentPosition ? function (e, t) {
                var n = e.nodeType === 9 ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !!(r && r.nodeType === 1 && (n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16))
            } : function (e, t) {
                if (t) {
                    while (t = t.parentNode) {
                        if (t === e) {
                            return true
                        }
                    }
                }
                return false
            };
            k = p.compareDocumentPosition ? function (e, n) {
                if (e === n) {
                    C = true;
                    return 0
                }
                var i = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
                if (i) {
                    if (i & 1 || !r.sortDetached && n.compareDocumentPosition(e) === i) {
                        if (e === t || y(w, e)) {
                            return-1
                        }
                        if (n === t || y(w, n)) {
                            return 1
                        }
                        return l ? B.call(l, e) - B.call(l, n) : 0
                    }
                    return i & 4 ? -1 : 1
                }
                return e.compareDocumentPosition ? -1 : 1
            } : function (e, n) {
                var r, i = 0, s = e.parentNode, o = n.parentNode, u = [e], a = [n];
                if (e === n) {
                    C = true;
                    return 0
                } else if (!s || !o) {
                    return e === t ? -1 : n === t ? 1 : s ? -1 : o ? 1 : l ? B.call(l, e) - B.call(l, n) : 0
                } else if (s === o) {
                    return lt(e, n)
                }
                r = e;
                while (r = r.parentNode) {
                    u.unshift(r)
                }
                r = n;
                while (r = r.parentNode) {
                    a.unshift(r)
                }
                while (u[i] === a[i]) {
                    i++
                }
                return i ? lt(u[i], a[i]) : u[i] === w ? -1 : a[i] === w ? 1 : 0
            };
            return t
        };
        st.matches = function (e, t) {
            return st(e, null, null, t)
        };
        st.matchesSelector = function (e, t) {
            if ((e.ownerDocument || e) !== h) {
                c(e)
            }
            t = t.replace($, "='$1']");
            if (r.matchesSelector && d && (!m || !m.test(t)) && (!v || !v.test(t))) {
                try {
                    var n = g.call(e, t);
                    if (n || r.disconnectedMatch || e.document && e.document.nodeType !== 11) {
                        return n
                    }
                } catch (i) {
                }
            }
            return st(t, h, null, [e]).length > 0
        };
        st.contains = function (e, t) {
            if ((e.ownerDocument || e) !== h) {
                c(e)
            }
            return y(e, t)
        };
        st.attr = function (e, n) {
            if ((e.ownerDocument || e) !== h) {
                c(e)
            }
            var i = s.attrHandle[n.toLowerCase()], o = i && O.call(s.attrHandle, n.toLowerCase()) ? i(e, n, !d) : t;
            return o === t ? r.attributes || !d ? e.getAttribute(n) : (o = e.getAttributeNode(n)) && o.specified ? o.value : null : o
        };
        st.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        };
        st.uniqueSort = function (e) {
            var t, n = [], i = 0, s = 0;
            C = !r.detectDuplicates;
            l = !r.sortStable && e.slice(0);
            e.sort(k);
            if (C) {
                while (t = e[s++]) {
                    if (t === e[s]) {
                        i = n.push(s)
                    }
                }
                while (i--) {
                    e.splice(n[i], 1)
                }
            }
            return e
        };
        o = st.getText = function (e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (!i) {
                for (; t = e[r]; r++) {
                    n += o(t)
                }
            } else if (i === 1 || i === 9 || i === 11) {
                if (typeof e.textContent === "string") {
                    return e.textContent
                } else {
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        n += o(e)
                    }
                }
            } else if (i === 3 || i === 4) {
                return e.nodeValue
            }
            return n
        };
        s = st.selectors = {cacheLength: 50, createPseudo: ut, match: Q, attrHandle: {}, find: {}, relative: {">": {dir: "parentNode", first: true}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: true}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (e) {
            e[1] = e[1].replace(nt, rt);
            e[3] = (e[4] || e[5] || "").replace(nt, rt);
            if (e[2] === "~=") {
                e[3] = " " + e[3] + " "
            }
            return e.slice(0, 4)
        }, CHILD: function (e) {
            e[1] = e[1].toLowerCase();
            if (e[1].slice(0, 3) === "nth") {
                if (!e[3]) {
                    st.error(e[0])
                }
                e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd"));
                e[5] = +(e[7] + e[8] || e[3] === "odd")
            } else if (e[3]) {
                st.error(e[0])
            }
            return e
        }, PSEUDO: function (e) {
            var n, r = !e[5] && e[2];
            if (Q["CHILD"].test(e[0])) {
                return null
            }
            if (e[3] && e[4] !== t) {
                e[2] = e[4]
            } else if (r && J.test(r) && (n = vt(r, true)) && (n = r.indexOf(")", r.length - n) - r.length)) {
                e[0] = e[0].slice(0, n);
                e[2] = r.slice(0, n)
            }
            return e.slice(0, 3)
        }}, filter: {TAG: function (e) {
            var t = e.replace(nt, rt).toLowerCase();
            return e === "*" ? function () {
                return true
            } : function (e) {
                return e.nodeName && e.nodeName.toLowerCase() === t
            }
        }, CLASS: function (e) {
            var t = x[e + " "];
            return t || (t = new RegExp("(^|" + F + ")" + e + "(" + F + "|$)")) && x(e, function (e) {
                return t.test(typeof e.className === "string" && e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
            })
        }, ATTR: function (e, t, n) {
            return function (r) {
                var i = st.attr(r, e);
                if (i == null) {
                    return t === "!="
                }
                if (!t) {
                    return true
                }
                i += "";
                return t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : false
            }
        }, CHILD: function (e, t, n, r, i) {
            var s = e.slice(0, 3) !== "nth", o = e.slice(-4) !== "last", u = t === "of-type";
            return r === 1 && i === 0 ? function (e) {
                return!!e.parentNode
            } : function (t, n, a) {
                var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling", m = t.parentNode, g = u && t.nodeName.toLowerCase(), y = !a && !u;
                if (m) {
                    if (s) {
                        while (v) {
                            c = t;
                            while (c = c[v]) {
                                if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) {
                                    return false
                                }
                            }
                            d = v = e === "only" && !d && "nextSibling"
                        }
                        return true
                    }
                    d = [o ? m.firstChild : m.lastChild];
                    if (o && y) {
                        l = m[b] || (m[b] = {});
                        f = l[e] || [];
                        p = f[0] === E && f[1];
                        h = f[0] === E && f[2];
                        c = p && m.childNodes[p];
                        while (c = ++p && c && c[v] || (h = p = 0) || d.pop()) {
                            if (c.nodeType === 1 && ++h && c === t) {
                                l[e] = [E, p, h];
                                break
                            }
                        }
                    } else if (y && (f = (t[b] || (t[b] = {}))[e]) && f[0] === E) {
                        h = f[1]
                    } else {
                        while (c = ++p && c && c[v] || (h = p = 0) || d.pop()) {
                            if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                                if (y) {
                                    (c[b] || (c[b] = {}))[e] = [E, h]
                                }
                                if (c === t) {
                                    break
                                }
                            }
                        }
                    }
                    h -= i;
                    return h === r || h % r === 0 && h / r >= 0
                }
            }
        }, PSEUDO: function (e, t) {
            var n, r = s.pseudos[e] || s.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
            if (r[b]) {
                return r(t)
            }
            if (r.length > 1) {
                n = [e, e, "", t];
                return s.setFilters.hasOwnProperty(e.toLowerCase()) ? ut(function (e, n) {
                    var i, s = r(e, t), o = s.length;
                    while (o--) {
                        i = B.call(e, s[o]);
                        e[i] = !(n[i] = s[o])
                    }
                }) : function (e) {
                    return r(e, 0, n)
                }
            }
            return r
        }}, pseudos: {not: ut(function (e) {
            var t = [], n = [], r = a(e.replace(z, "$1"));
            return r[b] ? ut(function (e, t, n, i) {
                var s, o = r(e, null, i, []), u = e.length;
                while (u--) {
                    if (s = o[u]) {
                        e[u] = !(t[u] = s)
                    }
                }
            }) : function (e, i, s) {
                t[0] = e;
                r(t, null, s, n);
                return!n.pop()
            }
        }), has: ut(function (e) {
            return function (t) {
                return st(e, t).length > 0
            }
        }), contains: ut(function (e) {
            return function (t) {
                return(t.textContent || t.innerText || o(t)).indexOf(e) > -1
            }
        }), lang: ut(function (e) {
            if (!K.test(e || "")) {
                st.error("unsupported lang: " + e)
            }
            e = e.replace(nt, rt).toLowerCase();
            return function (t) {
                var n;
                do {
                    if (n = d ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) {
                        n = n.toLowerCase();
                        return n === e || n.indexOf(e + "-") === 0
                    }
                } while ((t = t.parentNode) && t.nodeType === 1);
                return false
            }
        }), target: function (t) {
            var n = e.location && e.location.hash;
            return n && n.slice(1) === t.id
        }, root: function (e) {
            return e === p
        }, focus: function (e) {
            return e === h.activeElement && (!h.hasFocus || h.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }, enabled: function (e) {
            return e.disabled === false
        }, disabled: function (e) {
            return e.disabled === true
        }, checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return t === "input" && !!e.checked || t === "option" && !!e.selected
        }, selected: function (e) {
            if (e.parentNode) {
                e.parentNode.selectedIndex
            }
            return e.selected === true
        }, empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling) {
                if (e.nodeName > "@" || e.nodeType === 3 || e.nodeType === 4) {
                    return false
                }
            }
            return true
        }, parent: function (e) {
            return!s.pseudos["empty"](e)
        }, header: function (e) {
            return et.test(e.nodeName)
        }, input: function (e) {
            return Z.test(e.nodeName)
        }, button: function (e) {
            var t = e.nodeName.toLowerCase();
            return t === "input" && e.type === "button" || t === "button"
        }, text: function (e) {
            var t;
            return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === e.type)
        }, first: pt(function () {
            return[0]
        }), last: pt(function (e, t) {
            return[t - 1]
        }), eq: pt(function (e, t, n) {
            return[n < 0 ? n + t : n]
        }), even: pt(function (e, t) {
            var n = 0;
            for (; n < t; n += 2) {
                e.push(n)
            }
            return e
        }), odd: pt(function (e, t) {
            var n = 1;
            for (; n < t; n += 2) {
                e.push(n)
            }
            return e
        }), lt: pt(function (e, t, n) {
            var r = n < 0 ? n + t : n;
            for (; --r >= 0;) {
                e.push(r)
            }
            return e
        }), gt: pt(function (e, t, n) {
            var r = n < 0 ? n + t : n;
            for (; ++r < t;) {
                e.push(r)
            }
            return e
        })}};
        s.pseudos["nth"] = s.pseudos["eq"];
        for (n in{radio: true, checkbox: true, file: true, password: true, image: true}) {
            s.pseudos[n] = ct(n)
        }
        for (n in{submit: true, reset: true}) {
            s.pseudos[n] = ht(n)
        }
        dt.prototype = s.filters = s.pseudos;
        s.setFilters = new dt;
        a = st.compile = function (e, t) {
            var n, r = [], i = [], s = N[e + " "];
            if (!s) {
                if (!t) {
                    t = vt(e)
                }
                n = t.length;
                while (n--) {
                    s = Et(t[n]);
                    if (s[b]) {
                        r.push(s)
                    } else {
                        i.push(s)
                    }
                }
                s = N(e, St(i, r))
            }
            return s
        };
        r.sortStable = b.split("").sort(k).join("") === b;
        r.detectDuplicates = C;
        c();
        r.sortDetached = at(function (e) {
            return e.compareDocumentPosition(h.createElement("div")) & 1
        });
        if (!at(function (e) {
            e.innerHTML = "<a href='#'></a>";
            return e.firstChild.getAttribute("href") === "#"
        })) {
            ft("type|href|height|width", function (e, t, n) {
                if (!n) {
                    return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
                }
            })
        }
        if (!r.attributes || !at(function (e) {
            e.innerHTML = "<input/>";
            e.firstChild.setAttribute("value", "");
            return e.firstChild.getAttribute("value") === ""
        })) {
            ft("value", function (e, t, n) {
                if (!n && e.nodeName.toLowerCase() === "input") {
                    return e.defaultValue
                }
            })
        }
        if (!at(function (e) {
            return e.getAttribute("disabled") == null
        })) {
            ft(j, function (e, t, n) {
                var r;
                if (!n) {
                    return(r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === true ? t.toLowerCase() : null
                }
            })
        }
        jQuery.find = st;
        jQuery.expr = st.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = st.uniqueSort;
        jQuery.text = st.getText;
        jQuery.isXMLDoc = st.isXML;
        jQuery.contains = st.contains
    })(window);
    var optionsCache = {};
    jQuery.Callbacks = function (e) {
        e = typeof e === "string" ? optionsCache[e] || createOptions(e) : jQuery.extend({}, e);
        var t, n, r, i, s, o, u = [], a = !e.once && [], f = function (c) {
            t = e.memory && c;
            n = true;
            o = i || 0;
            i = 0;
            s = u.length;
            r = true;
            for (; u && o < s; o++) {
                if (u[o].apply(c[0], c[1]) === false && e.stopOnFalse) {
                    t = false;
                    break
                }
            }
            r = false;
            if (u) {
                if (a) {
                    if (a.length) {
                        f(a.shift())
                    }
                } else if (t) {
                    u = []
                } else {
                    l.disable()
                }
            }
        }, l = {add: function () {
            if (u) {
                var n = u.length;
                (function o(t) {
                    jQuery.each(t, function (t, n) {
                        var r = jQuery.type(n);
                        if (r === "function") {
                            if (!e.unique || !l.has(n)) {
                                u.push(n)
                            }
                        } else if (n && n.length && r !== "string") {
                            o(n)
                        }
                    })
                })(arguments);
                if (r) {
                    s = u.length
                } else if (t) {
                    i = n;
                    f(t)
                }
            }
            return this
        }, remove: function () {
            if (u) {
                jQuery.each(arguments, function (e, t) {
                    var n;
                    while ((n = jQuery.inArray(t, u, n)) > -1) {
                        u.splice(n, 1);
                        if (r) {
                            if (n <= s) {
                                s--
                            }
                            if (n <= o) {
                                o--
                            }
                        }
                    }
                })
            }
            return this
        }, has: function (e) {
            return e ? jQuery.inArray(e, u) > -1 : !!(u && u.length)
        }, empty: function () {
            u = [];
            s = 0;
            return this
        }, disable: function () {
            u = a = t = undefined;
            return this
        }, disabled: function () {
            return!u
        }, lock: function () {
            a = undefined;
            if (!t) {
                l.disable()
            }
            return this
        }, locked: function () {
            return!a
        }, fireWith: function (e, t) {
            if (u && (!n || a)) {
                t = t || [];
                t = [e, t.slice ? t.slice() : t];
                if (r) {
                    a.push(t)
                } else {
                    f(t)
                }
            }
            return this
        }, fire: function () {
            l.fireWith(this, arguments);
            return this
        }, fired: function () {
            return!!n
        }};
        return l
    };
    jQuery.extend({Deferred: function (e) {
        var t = [
            ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
            ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
            ["notify", "progress", jQuery.Callbacks("memory")]
        ], n = "pending", r = {state: function () {
            return n
        }, always: function () {
            i.done(arguments).fail(arguments);
            return this
        }, then: function () {
            var e = arguments;
            return jQuery.Deferred(function (n) {
                jQuery.each(t, function (t, s) {
                    var o = s[0], u = jQuery.isFunction(e[t]) && e[t];
                    i[s[1]](function () {
                        var e = u && u.apply(this, arguments);
                        if (e && jQuery.isFunction(e.promise)) {
                            e.promise().done(n.resolve).fail(n.reject).progress(n.notify)
                        } else {
                            n[o + "With"](this === r ? n.promise() : this, u ? [e] : arguments)
                        }
                    })
                });
                e = null
            }).promise()
        }, promise: function (e) {
            return e != null ? jQuery.extend(e, r) : r
        }}, i = {};
        r.pipe = r.then;
        jQuery.each(t, function (e, s) {
            var o = s[2], u = s[3];
            r[s[1]] = o.add;
            if (u) {
                o.add(function () {
                    n = u
                }, t[e ^ 1][2].disable, t[2][2].lock)
            }
            i[s[0]] = function () {
                i[s[0] + "With"](this === i ? r : this, arguments);
                return this
            };
            i[s[0] + "With"] = o.fireWith
        });
        r.promise(i);
        if (e) {
            e.call(i, i)
        }
        return i
    }, when: function (e) {
        var t = 0, n = core_slice.call(arguments), r = n.length, i = r !== 1 || e && jQuery.isFunction(e.promise) ? r : 0, s = i === 1 ? e : jQuery.Deferred(), o = function (e, t, n) {
            return function (r) {
                t[e] = this;
                n[e] = arguments.length > 1 ? core_slice.call(arguments) : r;
                if (n === u) {
                    s.notifyWith(t, n)
                } else if (!--i) {
                    s.resolveWith(t, n)
                }
            }
        }, u, a, f;
        if (r > 1) {
            u = new Array(r);
            a = new Array(r);
            f = new Array(r);
            for (; t < r; t++) {
                if (n[t] && jQuery.isFunction(n[t].promise)) {
                    n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u))
                } else {
                    --i
                }
            }
        }
        if (!i) {
            s.resolveWith(f, n)
        }
        return s.promise()
    }});
    jQuery.support = function (e) {
        var t = document.createElement("input"), n = document.createDocumentFragment(), r = document.createElement("div"), i = document.createElement("select"), s = i.appendChild(document.createElement("option"));
        if (!t.type) {
            return e
        }
        t.type = "checkbox";
        e.checkOn = t.value !== "";
        e.optSelected = s.selected;
        e.reliableMarginRight = true;
        e.boxSizingReliable = true;
        e.pixelPosition = false;
        t.checked = true;
        e.noCloneChecked = t.cloneNode(true).checked;
        i.disabled = true;
        e.optDisabled = !s.disabled;
        t = document.createElement("input");
        t.value = "t";
        t.type = "radio";
        e.radioValue = t.value === "t";
        t.setAttribute("checked", "t");
        t.setAttribute("name", "t");
        n.appendChild(t);
        e.checkClone = n.cloneNode(true).cloneNode(true).lastChild.checked;
        e.focusinBubbles = "onfocusin"in window;
        r.style.backgroundClip = "content-box";
        r.cloneNode(true).style.backgroundClip = "";
        e.clearCloneStyle = r.style.backgroundClip === "content-box";
        jQuery(function () {
            var t, n, i = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", s = document.getElementsByTagName("body")[0];
            if (!s) {
                return
            }
            t = document.createElement("div");
            t.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
            s.appendChild(t).appendChild(r);
            r.innerHTML = "";
            r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";
            jQuery.swap(s, s.style.zoom != null ? {zoom: 1} : {}, function () {
                e.boxSizing = r.offsetWidth === 4
            });
            if (window.getComputedStyle) {
                e.pixelPosition = (window.getComputedStyle(r, null) || {}).top !== "1%";
                e.boxSizingReliable = (window.getComputedStyle(r, null) || {width: "4px"}).width === "4px";
                n = r.appendChild(document.createElement("div"));
                n.style.cssText = r.style.cssText = i;
                n.style.marginRight = n.style.width = "0";
                r.style.width = "1px";
                e.reliableMarginRight = !parseFloat((window.getComputedStyle(n, null) || {}).marginRight)
            }
            s.removeChild(t)
        });
        return e
    }({});
    var data_user, data_priv, rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
    Data.uid = 1;
    Data.accepts = function (e) {
        return e.nodeType ? e.nodeType === 1 || e.nodeType === 9 : true
    };
    Data.prototype = {key: function (e) {
        if (!Data.accepts(e)) {
            return 0
        }
        var t = {}, n = e[this.expando];
        if (!n) {
            n = Data.uid++;
            try {
                t[this.expando] = {value: n};
                Object.defineProperties(e, t)
            } catch (r) {
                t[this.expando] = n;
                jQuery.extend(e, t)
            }
        }
        if (!this.cache[n]) {
            this.cache[n] = {}
        }
        return n
    }, set: function (e, t, n) {
        var r, i = this.key(e), s = this.cache[i];
        if (typeof t === "string") {
            s[t] = n
        } else {
            if (jQuery.isEmptyObject(s)) {
                jQuery.extend(this.cache[i], t)
            } else {
                for (r in t) {
                    s[r] = t[r]
                }
            }
        }
        return s
    }, get: function (e, t) {
        var n = this.cache[this.key(e)];
        return t === undefined ? n : n[t]
    }, access: function (e, t, n) {
        var r;
        if (t === undefined || t && typeof t === "string" && n === undefined) {
            r = this.get(e, t);
            return r !== undefined ? r : this.get(e, jQuery.camelCase(t))
        }
        this.set(e, t, n);
        return n !== undefined ? n : t
    }, remove: function (e, t) {
        var n, r, i, s = this.key(e), o = this.cache[s];
        if (t === undefined) {
            this.cache[s] = {}
        } else {
            if (jQuery.isArray(t)) {
                r = t.concat(t.map(jQuery.camelCase))
            } else {
                i = jQuery.camelCase(t);
                if (t in o) {
                    r = [t, i]
                } else {
                    r = i;
                    r = r in o ? [r] : r.match(core_rnotwhite) || []
                }
            }
            n = r.length;
            while (n--) {
                delete o[r[n]]
            }
        }
    }, hasData: function (e) {
        return!jQuery.isEmptyObject(this.cache[e[this.expando]] || {})
    }, discard: function (e) {
        if (e[this.expando]) {
            delete this.cache[e[this.expando]]
        }
    }};
    data_user = new Data;
    data_priv = new Data;
    jQuery.extend({acceptData: Data.accepts, hasData: function (e) {
        return data_user.hasData(e) || data_priv.hasData(e)
    }, data: function (e, t, n) {
        return data_user.access(e, t, n)
    }, removeData: function (e, t) {
        data_user.remove(e, t)
    }, _data: function (e, t, n) {
        return data_priv.access(e, t, n)
    }, _removeData: function (e, t) {
        data_priv.remove(e, t)
    }});
    jQuery.fn.extend({data: function (e, t) {
        var n, r, i = this[0], s = 0, o = null;
        if (e === undefined) {
            if (this.length) {
                o = data_user.get(i);
                if (i.nodeType === 1 && !data_priv.get(i, "hasDataAttrs")) {
                    n = i.attributes;
                    for (; s < n.length; s++) {
                        r = n[s].name;
                        if (r.indexOf("data-") === 0) {
                            r = jQuery.camelCase(r.slice(5));
                            dataAttr(i, r, o[r])
                        }
                    }
                    data_priv.set(i, "hasDataAttrs", true)
                }
            }
            return o
        }
        if (typeof e === "object") {
            return this.each(function () {
                data_user.set(this, e)
            })
        }
        return jQuery.access(this, function (t) {
            var n, r = jQuery.camelCase(e);
            if (i && t === undefined) {
                n = data_user.get(i, e);
                if (n !== undefined) {
                    return n
                }
                n = data_user.get(i, r);
                if (n !== undefined) {
                    return n
                }
                n = dataAttr(i, r, undefined);
                if (n !== undefined) {
                    return n
                }
                return
            }
            this.each(function () {
                var n = data_user.get(this, r);
                data_user.set(this, r, t);
                if (e.indexOf("-") !== -1 && n !== undefined) {
                    data_user.set(this, e, t)
                }
            })
        }, null, t, arguments.length > 1, null, true)
    }, removeData: function (e) {
        return this.each(function () {
            data_user.remove(this, e)
        })
    }});
    jQuery.extend({queue: function (e, t, n) {
        var r;
        if (e) {
            t = (t || "fx") + "queue";
            r = data_priv.get(e, t);
            if (n) {
                if (!r || jQuery.isArray(n)) {
                    r = data_priv.access(e, t, jQuery.makeArray(n))
                } else {
                    r.push(n)
                }
            }
            return r || []
        }
    }, dequeue: function (e, t) {
        t = t || "fx";
        var n = jQuery.queue(e, t), r = n.length, i = n.shift(), s = jQuery._queueHooks(e, t), o = function () {
            jQuery.dequeue(e, t)
        };
        if (i === "inprogress") {
            i = n.shift();
            r--
        }
        if (i) {
            if (t === "fx") {
                n.unshift("inprogress")
            }
            delete s.stop;
            i.call(e, o, s)
        }
        if (!r && s) {
            s.empty.fire()
        }
    }, _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return data_priv.get(e, n) || data_priv.access(e, n, {empty: jQuery.Callbacks("once memory").add(function () {
            data_priv.remove(e, [t + "queue", n])
        })})
    }});
    jQuery.fn.extend({queue: function (e, t) {
        var n = 2;
        if (typeof e !== "string") {
            t = e;
            e = "fx";
            n--
        }
        if (arguments.length < n) {
            return jQuery.queue(this[0], e)
        }
        return t === undefined ? this : this.each(function () {
            var n = jQuery.queue(this, e, t);
            jQuery._queueHooks(this, e);
            if (e === "fx" && n[0] !== "inprogress") {
                jQuery.dequeue(this, e)
            }
        })
    }, dequeue: function (e) {
        return this.each(function () {
            jQuery.dequeue(this, e)
        })
    }, delay: function (e, t) {
        e = jQuery.fx ? jQuery.fx.speeds[e] || e : e;
        t = t || "fx";
        return this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, clearQueue: function (e) {
        return this.queue(e || "fx", [])
    }, promise: function (e, t) {
        var n, r = 1, i = jQuery.Deferred(), s = this, o = this.length, u = function () {
            if (!--r) {
                i.resolveWith(s, [s])
            }
        };
        if (typeof e !== "string") {
            t = e;
            e = undefined
        }
        e = e || "fx";
        while (o--) {
            n = data_priv.get(s[o], e + "queueHooks");
            if (n && n.empty) {
                r++;
                n.empty.add(u)
            }
        }
        u();
        return i.promise(t)
    }});
    var nodeHook, boolHook, rclass = /[\t\r\n\f]/g, rreturn = /\r/g, rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({attr: function (e, t) {
        return jQuery.access(this, jQuery.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
        return this.each(function () {
            jQuery.removeAttr(this, e)
        })
    }, prop: function (e, t) {
        return jQuery.access(this, jQuery.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
        return this.each(function () {
            delete this[jQuery.propFix[e] || e]
        })
    }, addClass: function (e) {
        var t, n, r, i, s, o = 0, u = this.length, a = typeof e === "string" && e;
        if (jQuery.isFunction(e)) {
            return this.each(function (t) {
                jQuery(this).addClass(e.call(this, t, this.className))
            })
        }
        if (a) {
            t = (e || "").match(core_rnotwhite) || [];
            for (; o < u; o++) {
                n = this[o];
                r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : " ");
                if (r) {
                    s = 0;
                    while (i = t[s++]) {
                        if (r.indexOf(" " + i + " ") < 0) {
                            r += i + " "
                        }
                    }
                    n.className = jQuery.trim(r)
                }
            }
        }
        return this
    }, removeClass: function (e) {
        var t, n, r, i, s, o = 0, u = this.length, a = arguments.length === 0 || typeof e === "string" && e;
        if (jQuery.isFunction(e)) {
            return this.each(function (t) {
                jQuery(this).removeClass(e.call(this, t, this.className))
            })
        }
        if (a) {
            t = (e || "").match(core_rnotwhite) || [];
            for (; o < u; o++) {
                n = this[o];
                r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : "");
                if (r) {
                    s = 0;
                    while (i = t[s++]) {
                        while (r.indexOf(" " + i + " ") >= 0) {
                            r = r.replace(" " + i + " ", " ")
                        }
                    }
                    n.className = e ? jQuery.trim(r) : ""
                }
            }
        }
        return this
    }, toggleClass: function (e, t) {
        var n = typeof e;
        if (typeof t === "boolean" && n === "string") {
            return t ? this.addClass(e) : this.removeClass(e)
        }
        if (jQuery.isFunction(e)) {
            return this.each(function (n) {
                jQuery(this).toggleClass(e.call(this, n, this.className, t), t)
            })
        }
        return this.each(function () {
            if (n === "string") {
                var t, r = 0, i = jQuery(this), s = e.match(core_rnotwhite) || [];
                while (t = s[r++]) {
                    if (i.hasClass(t)) {
                        i.removeClass(t)
                    } else {
                        i.addClass(t)
                    }
                }
            } else if (n === core_strundefined || n === "boolean") {
                if (this.className) {
                    data_priv.set(this, "__className__", this.className)
                }
                this.className = this.className || e === false ? "" : data_priv.get(this, "__className__") || ""
            }
        })
    }, hasClass: function (e) {
        var t = " " + e + " ", n = 0, r = this.length;
        for (; n < r; n++) {
            if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(rclass, " ").indexOf(t) >= 0) {
                return true
            }
        }
        return false
    }, val: function (e) {
        var t, n, r, i = this[0];
        if (!arguments.length) {
            if (i) {
                t = jQuery.valHooks[i.type] || jQuery.valHooks[i.nodeName.toLowerCase()];
                if (t && "get"in t && (n = t.get(i, "value")) !== undefined) {
                    return n
                }
                n = i.value;
                return typeof n === "string" ? n.replace(rreturn, "") : n == null ? "" : n
            }
            return
        }
        r = jQuery.isFunction(e);
        return this.each(function (n) {
            var i;
            if (this.nodeType !== 1) {
                return
            }
            if (r) {
                i = e.call(this, n, jQuery(this).val())
            } else {
                i = e
            }
            if (i == null) {
                i = ""
            } else if (typeof i === "number") {
                i += ""
            } else if (jQuery.isArray(i)) {
                i = jQuery.map(i, function (e) {
                    return e == null ? "" : e + ""
                })
            }
            t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
            if (!t || !("set"in t) || t.set(this, i, "value") === undefined) {
                this.value = i
            }
        })
    }});
    jQuery.extend({valHooks: {option: {get: function (e) {
        var t = e.attributes.value;
        return!t || t.specified ? e.value : e.text
    }}, select: {get: function (e) {
        var t, n, r = e.options, i = e.selectedIndex, s = e.type === "select-one" || i < 0, o = s ? null : [], u = s ? i + 1 : r.length, a = i < 0 ? u : s ? i : 0;
        for (; a < u; a++) {
            n = r[a];
            if ((n.selected || a === i) && (jQuery.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !jQuery.nodeName(n.parentNode, "optgroup"))) {
                t = jQuery(n).val();
                if (s) {
                    return t
                }
                o.push(t)
            }
        }
        return o
    }, set: function (e, t) {
        var n, r, i = e.options, s = jQuery.makeArray(t), o = i.length;
        while (o--) {
            r = i[o];
            if (r.selected = jQuery.inArray(jQuery(r).val(), s) >= 0) {
                n = true
            }
        }
        if (!n) {
            e.selectedIndex = -1
        }
        return s
    }}}, attr: function (e, t, n) {
        var r, i, s = e.nodeType;
        if (!e || s === 3 || s === 8 || s === 2) {
            return
        }
        if (typeof e.getAttribute === core_strundefined) {
            return jQuery.prop(e, t, n)
        }
        if (s !== 1 || !jQuery.isXMLDoc(e)) {
            t = t.toLowerCase();
            r = jQuery.attrHooks[t] || (jQuery.expr.match.bool.test(t) ? boolHook : nodeHook)
        }
        if (n !== undefined) {
            if (n === null) {
                jQuery.removeAttr(e, t)
            } else if (r && "set"in r && (i = r.set(e, n, t)) !== undefined) {
                return i
            } else {
                e.setAttribute(t, n + "");
                return n
            }
        } else if (r && "get"in r && (i = r.get(e, t)) !== null) {
            return i
        } else {
            i = jQuery.find.attr(e, t);
            return i == null ? undefined : i
        }
    }, removeAttr: function (e, t) {
        var n, r, i = 0, s = t && t.match(core_rnotwhite);
        if (s && e.nodeType === 1) {
            while (n = s[i++]) {
                r = jQuery.propFix[n] || n;
                if (jQuery.expr.match.bool.test(n)) {
                    e[r] = false
                }
                e.removeAttribute(n)
            }
        }
    }, attrHooks: {type: {set: function (e, t) {
        if (!jQuery.support.radioValue && t === "radio" && jQuery.nodeName(e, "input")) {
            var n = e.value;
            e.setAttribute("type", t);
            if (n) {
                e.value = n
            }
            return t
        }
    }}}, propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
        var r, i, s, o = e.nodeType;
        if (!e || o === 3 || o === 8 || o === 2) {
            return
        }
        s = o !== 1 || !jQuery.isXMLDoc(e);
        if (s) {
            t = jQuery.propFix[t] || t;
            i = jQuery.propHooks[t]
        }
        if (n !== undefined) {
            return i && "set"in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n
        } else {
            return i && "get"in i && (r = i.get(e, t)) !== null ? r : e[t]
        }
    }, propHooks: {tabIndex: {get: function (e) {
        return e.hasAttribute("tabindex") || rfocusable.test(e.nodeName) || e.href ? e.tabIndex : -1
    }}}});
    boolHook = {set: function (e, t, n) {
        if (t === false) {
            jQuery.removeAttr(e, n)
        } else {
            e.setAttribute(n, n)
        }
        return n
    }};
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = jQuery.expr.attrHandle[t] || jQuery.find.attr;
        jQuery.expr.attrHandle[t] = function (e, t, r) {
            var i = jQuery.expr.attrHandle[t], s = r ? undefined : (jQuery.expr.attrHandle[t] = undefined) != n(e, t, r) ? t.toLowerCase() : null;
            jQuery.expr.attrHandle[t] = i;
            return s
        }
    });
    if (!jQuery.support.optSelected) {
        jQuery.propHooks.selected = {get: function (e) {
            var t = e.parentNode;
            if (t && t.parentNode) {
                t.parentNode.selectedIndex
            }
            return null
        }}
    }
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        jQuery.propFix[this.toLowerCase()] = this
    });
    jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = {set: function (e, t) {
            if (jQuery.isArray(t)) {
                return e.checked = jQuery.inArray(jQuery(e).val(), t) >= 0
            }
        }};
        if (!jQuery.support.checkOn) {
            jQuery.valHooks[this].get = function (e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
        }
    });
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {global: {}, add: function (e, t, n, r, i) {
        var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.get(e);
        if (!m) {
            return
        }
        if (n.handler) {
            s = n;
            n = s.handler;
            i = s.selector
        }
        if (!n.guid) {
            n.guid = jQuery.guid++
        }
        if (!(a = m.events)) {
            a = m.events = {}
        }
        if (!(o = m.handle)) {
            o = m.handle = function (e) {
                return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(o.elem, arguments) : undefined
            };
            o.elem = e
        }
        t = (t || "").match(core_rnotwhite) || [""];
        f = t.length;
        while (f--) {
            u = rtypenamespace.exec(t[f]) || [];
            p = v = u[1];
            d = (u[2] || "").split(".").sort();
            if (!p) {
                continue
            }
            c = jQuery.event.special[p] || {};
            p = (i ? c.delegateType : c.bindType) || p;
            c = jQuery.event.special[p] || {};
            l = jQuery.extend({type: p, origType: v, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && jQuery.expr.match.needsContext.test(i), namespace: d.join(".")}, s);
            if (!(h = a[p])) {
                h = a[p] = [];
                h.delegateCount = 0;
                if (!c.setup || c.setup.call(e, r, d, o) === false) {
                    if (e.addEventListener) {
                        e.addEventListener(p, o, false)
                    }
                }
            }
            if (c.add) {
                c.add.call(e, l);
                if (!l.handler.guid) {
                    l.handler.guid = n.guid
                }
            }
            if (i) {
                h.splice(h.delegateCount++, 0, l)
            } else {
                h.push(l)
            }
            jQuery.event.global[p] = true
        }
        e = null
    }, remove: function (e, t, n, r, i) {
        var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.hasData(e) && data_priv.get(e);
        if (!m || !(a = m.events)) {
            return
        }
        t = (t || "").match(core_rnotwhite) || [""];
        f = t.length;
        while (f--) {
            u = rtypenamespace.exec(t[f]) || [];
            p = v = u[1];
            d = (u[2] || "").split(".").sort();
            if (!p) {
                for (p in a) {
                    jQuery.event.remove(e, p + t[f], n, r, true)
                }
                continue
            }
            c = jQuery.event.special[p] || {};
            p = (r ? c.delegateType : c.bindType) || p;
            h = a[p] || [];
            u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)");
            o = s = h.length;
            while (s--) {
                l = h[s];
                if ((i || v === l.origType) && (!n || n.guid === l.guid) && (!u || u.test(l.namespace)) && (!r || r === l.selector || r === "**" && l.selector)) {
                    h.splice(s, 1);
                    if (l.selector) {
                        h.delegateCount--
                    }
                    if (c.remove) {
                        c.remove.call(e, l)
                    }
                }
            }
            if (o && !h.length) {
                if (!c.teardown || c.teardown.call(e, d, m.handle) === false) {
                    jQuery.removeEvent(e, p, m.handle)
                }
                delete a[p]
            }
        }
        if (jQuery.isEmptyObject(a)) {
            delete m.handle;
            data_priv.remove(e, "events")
        }
    }, trigger: function (e, t, n, r) {
        var i, s, o, u, a, f, l, c = [n || document], h = core_hasOwn.call(e, "type") ? e.type : e, p = core_hasOwn.call(e, "namespace") ? e.namespace.split(".") : [];
        s = o = n = n || document;
        if (n.nodeType === 3 || n.nodeType === 8) {
            return
        }
        if (rfocusMorph.test(h + jQuery.event.triggered)) {
            return
        }
        if (h.indexOf(".") >= 0) {
            p = h.split(".");
            h = p.shift();
            p.sort()
        }
        a = h.indexOf(":") < 0 && "on" + h;
        e = e[jQuery.expando] ? e : new jQuery.Event(h, typeof e === "object" && e);
        e.isTrigger = r ? 2 : 3;
        e.namespace = p.join(".");
        e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
        e.result = undefined;
        if (!e.target) {
            e.target = n
        }
        t = t == null ? [e] : jQuery.makeArray(t, [e]);
        l = jQuery.event.special[h] || {};
        if (!r && l.trigger && l.trigger.apply(n, t) === false) {
            return
        }
        if (!r && !l.noBubble && !jQuery.isWindow(n)) {
            u = l.delegateType || h;
            if (!rfocusMorph.test(u + h)) {
                s = s.parentNode
            }
            for (; s; s = s.parentNode) {
                c.push(s);
                o = s
            }
            if (o === (n.ownerDocument || document)) {
                c.push(o.defaultView || o.parentWindow || window)
            }
        }
        i = 0;
        while ((s = c[i++]) && !e.isPropagationStopped()) {
            e.type = i > 1 ? u : l.bindType || h;
            f = (data_priv.get(s, "events") || {})[e.type] && data_priv.get(s, "handle");
            if (f) {
                f.apply(s, t)
            }
            f = a && s[a];
            if (f && jQuery.acceptData(s) && f.apply && f.apply(s, t) === false) {
                e.preventDefault()
            }
        }
        e.type = h;
        if (!r && !e.isDefaultPrevented()) {
            if ((!l._default || l._default.apply(c.pop(), t) === false) && jQuery.acceptData(n)) {
                if (a && jQuery.isFunction(n[h]) && !jQuery.isWindow(n)) {
                    o = n[a];
                    if (o) {
                        n[a] = null
                    }
                    jQuery.event.triggered = h;
                    n[h]();
                    jQuery.event.triggered = undefined;
                    if (o) {
                        n[a] = o
                    }
                }
            }
        }
        return e.result
    }, dispatch: function (e) {
        e = jQuery.event.fix(e);
        var t, n, r, i, s, o = [], u = core_slice.call(arguments), a = (data_priv.get(this, "events") || {})[e.type] || [], f = jQuery.event.special[e.type] || {};
        u[0] = e;
        e.delegateTarget = this;
        if (f.preDispatch && f.preDispatch.call(this, e) === false) {
            return
        }
        o = jQuery.event.handlers.call(this, e, a);
        t = 0;
        while ((i = o[t++]) && !e.isPropagationStopped()) {
            e.currentTarget = i.elem;
            n = 0;
            while ((s = i.handlers[n++]) && !e.isImmediatePropagationStopped()) {
                if (!e.namespace_re || e.namespace_re.test(s.namespace)) {
                    e.handleObj = s;
                    e.data = s.data;
                    r = ((jQuery.event.special[s.origType] || {}).handle || s.handler).apply(i.elem, u);
                    if (r !== undefined) {
                        if ((e.result = r) === false) {
                            e.preventDefault();
                            e.stopPropagation()
                        }
                    }
                }
            }
        }
        if (f.postDispatch) {
            f.postDispatch.call(this, e)
        }
        return e.result
    }, handlers: function (e, t) {
        var n, r, i, s, o = [], u = t.delegateCount, a = e.target;
        if (u && a.nodeType && (!e.button || e.type !== "click")) {
            for (; a !== this; a = a.parentNode || this) {
                if (a.disabled !== true || e.type !== "click") {
                    r = [];
                    for (n = 0; n < u; n++) {
                        s = t[n];
                        i = s.selector + " ";
                        if (r[i] === undefined) {
                            r[i] = s.needsContext ? jQuery(i, this).index(a) >= 0 : jQuery.find(i, this, null, [a]).length
                        }
                        if (r[i]) {
                            r.push(s)
                        }
                    }
                    if (r.length) {
                        o.push({elem: a, handlers: r})
                    }
                }
            }
        }
        if (u < t.length) {
            o.push({elem: this, handlers: t.slice(u)})
        }
        return o
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        if (e.which == null) {
            e.which = t.charCode != null ? t.charCode : t.keyCode
        }
        return e
    }}, mouseHooks: {props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, t) {
        var n, r, i, s = t.button;
        if (e.pageX == null && t.clientX != null) {
            n = e.target.ownerDocument || document;
            r = n.documentElement;
            i = n.body;
            e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0);
            e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)
        }
        if (!e.which && s !== undefined) {
            e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0
        }
        return e
    }}, fix: function (e) {
        if (e[jQuery.expando]) {
            return e
        }
        var t, n, r, i = e.type, s = e, o = this.fixHooks[i];
        if (!o) {
            this.fixHooks[i] = o = rmouseEvent.test(i) ? this.mouseHooks : rkeyEvent.test(i) ? this.keyHooks : {}
        }
        r = o.props ? this.props.concat(o.props) : this.props;
        e = new jQuery.Event(s);
        t = r.length;
        while (t--) {
            n = r[t];
            e[n] = s[n]
        }
        if (!e.target) {
            e.target = document
        }
        if (e.target.nodeType === 3) {
            e.target = e.target.parentNode
        }
        return o.filter ? o.filter(e, s) : e
    }, special: {load: {noBubble: true}, focus: {trigger: function () {
        if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false
        }
    }, delegateType: "focusin"}, blur: {trigger: function () {
        if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false
        }
    }, delegateType: "focusout"}, click: {trigger: function () {
        if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false
        }
    }, _default: function (e) {
        return jQuery.nodeName(e.target, "a")
    }}, beforeunload: {postDispatch: function (e) {
        if (e.result !== undefined) {
            e.originalEvent.returnValue = e.result
        }
    }}}, simulate: function (e, t, n, r) {
        var i = jQuery.extend(new jQuery.Event, n, {type: e, isSimulated: true, originalEvent: {}});
        if (r) {
            jQuery.event.trigger(i, null, t)
        } else {
            jQuery.event.dispatch.call(t, i)
        }
        if (i.isDefaultPrevented()) {
            n.preventDefault()
        }
    }};
    jQuery.removeEvent = function (e, t, n) {
        if (e.removeEventListener) {
            e.removeEventListener(t, n, false)
        }
    };
    jQuery.Event = function (e, t) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(e, t)
        }
        if (e && e.type) {
            this.originalEvent = e;
            this.type = e.type;
            this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? returnTrue : returnFalse
        } else {
            this.type = e
        }
        if (t) {
            jQuery.extend(this, t)
        }
        this.timeStamp = e && e.timeStamp || jQuery.now();
        this[jQuery.expando] = true
    };
    jQuery.Event.prototype = {isDefaultPrevented: returnFalse, isPropagationStopped: returnFalse, isImmediatePropagationStopped: returnFalse, preventDefault: function () {
        var e = this.originalEvent;
        this.isDefaultPrevented = returnTrue;
        if (e && e.preventDefault) {
            e.preventDefault()
        }
    }, stopPropagation: function () {
        var e = this.originalEvent;
        this.isPropagationStopped = returnTrue;
        if (e && e.stopPropagation) {
            e.stopPropagation()
        }
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = returnTrue;
        this.stopPropagation()
    }};
    jQuery.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        jQuery.event.special[e] = {delegateType: t, bindType: t, handle: function (e) {
            var n, r = this, i = e.relatedTarget, s = e.handleObj;
            if (!i || i !== r && !jQuery.contains(r, i)) {
                e.type = s.origType;
                n = s.handler.apply(this, arguments);
                e.type = t
            }
            return n
        }}
    });
    if (!jQuery.support.focusinBubbles) {
        jQuery.each({focus: "focusin", blur: "focusout"}, function (e, t) {
            var n = 0, r = function (e) {
                jQuery.event.simulate(t, e.target, jQuery.event.fix(e), true)
            };
            jQuery.event.special[t] = {setup: function () {
                if (n++ === 0) {
                    document.addEventListener(e, r, true)
                }
            }, teardown: function () {
                if (--n === 0) {
                    document.removeEventListener(e, r, true)
                }
            }}
        })
    }
    jQuery.fn.extend({on: function (e, t, n, r, i) {
        var s, o;
        if (typeof e === "object") {
            if (typeof t !== "string") {
                n = n || t;
                t = undefined
            }
            for (o in e) {
                this.on(o, t, n, e[o], i)
            }
            return this
        }
        if (n == null && r == null) {
            r = t;
            n = t = undefined
        } else if (r == null) {
            if (typeof t === "string") {
                r = n;
                n = undefined
            } else {
                r = n;
                n = t;
                t = undefined
            }
        }
        if (r === false) {
            r = returnFalse
        } else if (!r) {
            return this
        }
        if (i === 1) {
            s = r;
            r = function (e) {
                jQuery().off(e);
                return s.apply(this, arguments)
            };
            r.guid = s.guid || (s.guid = jQuery.guid++)
        }
        return this.each(function () {
            jQuery.event.add(this, e, r, n, t)
        })
    }, one: function (e, t, n, r) {
        return this.on(e, t, n, r, 1)
    }, off: function (e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj) {
            r = e.handleObj;
            jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler);
            return this
        }
        if (typeof e === "object") {
            for (i in e) {
                this.off(i, t, e[i])
            }
            return this
        }
        if (t === false || typeof t === "function") {
            n = t;
            t = undefined
        }
        if (n === false) {
            n = returnFalse
        }
        return this.each(function () {
            jQuery.event.remove(this, e, n, t)
        })
    }, trigger: function (e, t) {
        return this.each(function () {
            jQuery.event.trigger(e, t, this)
        })
    }, triggerHandler: function (e, t) {
        var n = this[0];
        if (n) {
            return jQuery.event.trigger(e, t, n, true)
        }
    }});
    var isSimple = /^.[^:#\[\.,]*$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {children: true, contents: true, next: true, prev: true};
    jQuery.fn.extend({find: function (e) {
        var t, n = [], r = this, i = r.length;
        if (typeof e !== "string") {
            return this.pushStack(jQuery(e).filter(function () {
                for (t = 0; t < i; t++) {
                    if (jQuery.contains(r[t], this)) {
                        return true
                    }
                }
            }))
        }
        for (t = 0; t < i; t++) {
            jQuery.find(e, r[t], n)
        }
        n = this.pushStack(i > 1 ? jQuery.unique(n) : n);
        n.selector = this.selector ? this.selector + " " + e : e;
        return n
    }, has: function (e) {
        var t = jQuery(e, this), n = t.length;
        return this.filter(function () {
            var e = 0;
            for (; e < n; e++) {
                if (jQuery.contains(this, t[e])) {
                    return true
                }
            }
        })
    }, not: function (e) {
        return this.pushStack(winnow(this, e || [], true))
    }, filter: function (e) {
        return this.pushStack(winnow(this, e || [], false))
    }, is: function (e) {
        return!!winnow(this, typeof e === "string" && rneedsContext.test(e) ? jQuery(e) : e || [], false).length
    }, closest: function (e, t) {
        var n, r = 0, i = this.length, s = [], o = rneedsContext.test(e) || typeof e !== "string" ? jQuery(e, t || this.context) : 0;
        for (; r < i; r++) {
            for (n = this[r]; n && n !== t; n = n.parentNode) {
                if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && jQuery.find.matchesSelector(n, e))) {
                    n = s.push(n);
                    break
                }
            }
        }
        return this.pushStack(s.length > 1 ? jQuery.unique(s) : s)
    }, index: function (e) {
        if (!e) {
            return this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }
        if (typeof e === "string") {
            return core_indexOf.call(jQuery(e), this[0])
        }
        return core_indexOf.call(this, e.jquery ? e[0] : e)
    }, add: function (e, t) {
        var n = typeof e === "string" ? jQuery(e, t) : jQuery.makeArray(e && e.nodeType ? [e] : e), r = jQuery.merge(this.get(), n);
        return this.pushStack(jQuery.unique(r))
    }, addBack: function (e) {
        return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
    }});
    jQuery.each({parent: function (e) {
        var t = e.parentNode;
        return t && t.nodeType !== 11 ? t : null
    }, parents: function (e) {
        return jQuery.dir(e, "parentNode")
    }, parentsUntil: function (e, t, n) {
        return jQuery.dir(e, "parentNode", n)
    }, next: function (e) {
        return sibling(e, "nextSibling")
    }, prev: function (e) {
        return sibling(e, "previousSibling")
    }, nextAll: function (e) {
        return jQuery.dir(e, "nextSibling")
    }, prevAll: function (e) {
        return jQuery.dir(e, "previousSibling")
    }, nextUntil: function (e, t, n) {
        return jQuery.dir(e, "nextSibling", n)
    }, prevUntil: function (e, t, n) {
        return jQuery.dir(e, "previousSibling", n)
    }, siblings: function (e) {
        return jQuery.sibling((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
        return jQuery.sibling(e.firstChild)
    }, contents: function (e) {
        return e.contentDocument || jQuery.merge([], e.childNodes)
    }}, function (e, t) {
        jQuery.fn[e] = function (n, r) {
            var i = jQuery.map(this, t, n);
            if (e.slice(-5) !== "Until") {
                r = n
            }
            if (r && typeof r === "string") {
                i = jQuery.filter(r, i)
            }
            if (this.length > 1) {
                if (!guaranteedUnique[e]) {
                    jQuery.unique(i)
                }
                if (rparentsprev.test(e)) {
                    i.reverse()
                }
            }
            return this.pushStack(i)
        }
    });
    jQuery.extend({filter: function (e, t, n) {
        var r = t[0];
        if (n) {
            e = ":not(" + e + ")"
        }
        return t.length === 1 && r.nodeType === 1 ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, function (e) {
            return e.nodeType === 1
        }))
    }, dir: function (e, t, n) {
        var r = [], i = n !== undefined;
        while ((e = e[t]) && e.nodeType !== 9) {
            if (e.nodeType === 1) {
                if (i && jQuery(e).is(n)) {
                    break
                }
                r.push(e)
            }
        }
        return r
    }, sibling: function (e, t) {
        var n = [];
        for (; e; e = e.nextSibling) {
            if (e.nodeType === 1 && e !== t) {
                n.push(e)
            }
        }
        return n
    }});
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, manipulation_rcheckableType = /^(?:checkbox|radio)$/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""]};
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    jQuery.fn.extend({text: function (e) {
        return jQuery.access(this, function (e) {
            return e === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(e))
        }, null, e, arguments.length)
    }, append: function () {
        return this.domManip(arguments, function (e) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var t = manipulationTarget(this, e);
                t.appendChild(e)
            }
        })
    }, prepend: function () {
        return this.domManip(arguments, function (e) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var t = manipulationTarget(this, e);
                t.insertBefore(e, t.firstChild)
            }
        })
    }, before: function () {
        return this.domManip(arguments, function (e) {
            if (this.parentNode) {
                this.parentNode.insertBefore(e, this)
            }
        })
    }, after: function () {
        return this.domManip(arguments, function (e) {
            if (this.parentNode) {
                this.parentNode.insertBefore(e, this.nextSibling)
            }
        })
    }, remove: function (e, t) {
        var n, r = e ? jQuery.filter(e, this) : this, i = 0;
        for (; (n = r[i]) != null; i++) {
            if (!t && n.nodeType === 1) {
                jQuery.cleanData(getAll(n))
            }
            if (n.parentNode) {
                if (t && jQuery.contains(n.ownerDocument, n)) {
                    setGlobalEval(getAll(n, "script"))
                }
                n.parentNode.removeChild(n)
            }
        }
        return this
    }, empty: function () {
        var e, t = 0;
        for (; (e = this[t]) != null; t++) {
            if (e.nodeType === 1) {
                jQuery.cleanData(getAll(e, false));
                e.textContent = ""
            }
        }
        return this
    }, clone: function (e, t) {
        e = e == null ? false : e;
        t = t == null ? e : t;
        return this.map(function () {
            return jQuery.clone(this, e, t)
        })
    }, html: function (e) {
        return jQuery.access(this, function (e) {
            var t = this[0] || {}, n = 0, r = this.length;
            if (e === undefined && t.nodeType === 1) {
                return t.innerHTML
            }
            if (typeof e === "string" && !rnoInnerhtml.test(e) && !wrapMap[(rtagName.exec(e) || ["", ""])[1].toLowerCase()]) {
                e = e.replace(rxhtmlTag, "<$1></$2>");
                try {
                    for (; n < r; n++) {
                        t = this[n] || {};
                        if (t.nodeType === 1) {
                            jQuery.cleanData(getAll(t, false));
                            t.innerHTML = e
                        }
                    }
                    t = 0
                } catch (i) {
                }
            }
            if (t) {
                this.empty().append(e)
            }
        }, null, e, arguments.length)
    }, replaceWith: function () {
        var e = jQuery.map(this, function (e) {
            return[e.nextSibling, e.parentNode]
        }), t = 0;
        this.domManip(arguments, function (n) {
            var r = e[t++], s = e[t++];
            if (s) {
                if (r && r.parentNode !== s) {
                    r = this.nextSibling
                }
                jQuery(this).remove();
                s.insertBefore(n, r)
            }
        }, true);
        return t ? this : this.remove()
    }, detach: function (e) {
        return this.remove(e, true)
    }, domManip: function (e, t, n) {
        e = core_concat.apply([], e);
        var r, i, s, o, u, a, f = 0, l = this.length, c = this, h = l - 1, p = e[0], d = jQuery.isFunction(p);
        if (d || !(l <= 1 || typeof p !== "string" || jQuery.support.checkClone || !rchecked.test(p))) {
            return this.each(function (r) {
                var i = c.eq(r);
                if (d) {
                    e[0] = p.call(this, r, i.html())
                }
                i.domManip(e, t, n)
            })
        }
        if (l) {
            r = jQuery.buildFragment(e, this[0].ownerDocument, false, !n && this);
            i = r.firstChild;
            if (r.childNodes.length === 1) {
                r = i
            }
            if (i) {
                s = jQuery.map(getAll(r, "script"), disableScript);
                o = s.length;
                for (; f < l; f++) {
                    u = r;
                    if (f !== h) {
                        u = jQuery.clone(u, true, true);
                        if (o) {
                            jQuery.merge(s, getAll(u, "script"))
                        }
                    }
                    t.call(this[f], u, f)
                }
                if (o) {
                    a = s[s.length - 1].ownerDocument;
                    jQuery.map(s, restoreScript);
                    for (f = 0; f < o; f++) {
                        u = s[f];
                        if (rscriptType.test(u.type || "") && !data_priv.access(u, "globalEval") && jQuery.contains(a, u)) {
                            if (u.src) {
                                jQuery._evalUrl(u.src)
                            } else {
                                jQuery.globalEval(u.textContent.replace(rcleanScript, ""))
                            }
                        }
                    }
                }
            }
        }
        return this
    }});
    jQuery.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (e, t) {
        jQuery.fn[e] = function (e) {
            var n, r = [], i = jQuery(e), s = i.length - 1, o = 0;
            for (; o <= s; o++) {
                n = o === s ? this : this.clone(true);
                jQuery(i[o])[t](n);
                core_push.apply(r, n.get())
            }
            return this.pushStack(r)
        }
    });
    jQuery.extend({clone: function (e, t, n) {
        var r, i, s, o, u = e.cloneNode(true), a = jQuery.contains(e.ownerDocument, e);
        if (!jQuery.support.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !jQuery.isXMLDoc(e)) {
            o = getAll(u);
            s = getAll(e);
            for (r = 0, i = s.length; r < i; r++) {
                fixInput(s[r], o[r])
            }
        }
        if (t) {
            if (n) {
                s = s || getAll(e);
                o = o || getAll(u);
                for (r = 0, i = s.length; r < i; r++) {
                    cloneCopyEvent(s[r], o[r])
                }
            } else {
                cloneCopyEvent(e, u)
            }
        }
        o = getAll(u, "script");
        if (o.length > 0) {
            setGlobalEval(o, !a && getAll(e, "script"))
        }
        return u
    }, buildFragment: function (e, t, n, r) {
        var i, s, o, u, a, f, l = 0, c = e.length, h = t.createDocumentFragment(), p = [];
        for (; l < c; l++) {
            i = e[l];
            if (i || i === 0) {
                if (jQuery.type(i) === "object") {
                    jQuery.merge(p, i.nodeType ? [i] : i)
                } else if (!rhtml.test(i)) {
                    p.push(t.createTextNode(i))
                } else {
                    s = s || h.appendChild(t.createElement("div"));
                    o = (rtagName.exec(i) || ["", ""])[1].toLowerCase();
                    u = wrapMap[o] || wrapMap._default;
                    s.innerHTML = u[1] + i.replace(rxhtmlTag, "<$1></$2>") + u[2];
                    f = u[0];
                    while (f--) {
                        s = s.lastChild
                    }
                    jQuery.merge(p, s.childNodes);
                    s = h.firstChild;
                    s.textContent = ""
                }
            }
        }
        h.textContent = "";
        l = 0;
        while (i = p[l++]) {
            if (r && jQuery.inArray(i, r) !== -1) {
                continue
            }
            a = jQuery.contains(i.ownerDocument, i);
            s = getAll(h.appendChild(i), "script");
            if (a) {
                setGlobalEval(s)
            }
            if (n) {
                f = 0;
                while (i = s[f++]) {
                    if (rscriptType.test(i.type || "")) {
                        n.push(i)
                    }
                }
            }
        }
        return h
    }, cleanData: function (e) {
        var t, n, r, i, s, o, u = jQuery.event.special, a = 0;
        for (; (n = e[a]) !== undefined; a++) {
            if (Data.accepts(n)) {
                s = n[data_priv.expando];
                if (s && (t = data_priv.cache[s])) {
                    r = Object.keys(t.events || {});
                    if (r.length) {
                        for (o = 0; (i = r[o]) !== undefined; o++) {
                            if (u[i]) {
                                jQuery.event.remove(n, i)
                            } else {
                                jQuery.removeEvent(n, i, t.handle)
                            }
                        }
                    }
                    if (data_priv.cache[s]) {
                        delete data_priv.cache[s]
                    }
                }
            }
            delete data_user.cache[n[data_user.expando]]
        }
    }, _evalUrl: function (e) {
        return jQuery.ajax({url: e, type: "GET", dataType: "script", async: false, global: false, "throws": true})
    }});
    jQuery.fn.extend({wrapAll: function (e) {
        var t;
        if (jQuery.isFunction(e)) {
            return this.each(function (t) {
                jQuery(this).wrapAll(e.call(this, t))
            })
        }
        if (this[0]) {
            t = jQuery(e, this[0].ownerDocument).eq(0).clone(true);
            if (this[0].parentNode) {
                t.insertBefore(this[0])
            }
            t.map(function () {
                var e = this;
                while (e.firstElementChild) {
                    e = e.firstElementChild
                }
                return e
            }).append(this)
        }
        return this
    }, wrapInner: function (e) {
        if (jQuery.isFunction(e)) {
            return this.each(function (t) {
                jQuery(this).wrapInner(e.call(this, t))
            })
        }
        return this.each(function () {
            var t = jQuery(this), n = t.contents();
            if (n.length) {
                n.wrapAll(e)
            } else {
                t.append(e)
            }
        })
    }, wrap: function (e) {
        var t = jQuery.isFunction(e);
        return this.each(function (n) {
            jQuery(this).wrapAll(t ? e.call(this, n) : e)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            if (!jQuery.nodeName(this, "body")) {
                jQuery(this).replaceWith(this.childNodes)
            }
        }).end()
    }});
    var curCSS, iframe, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"), rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"), rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"), elemdisplay = {BODY: "block"}, cssShow = {position: "absolute", visibility: "hidden", display: "block"}, cssNormalTransform = {letterSpacing: 0, fontWeight: 400}, cssExpand = ["Top", "Right", "Bottom", "Left"], cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.fn.extend({css: function (e, t) {
        return jQuery.access(this, function (e, t, n) {
            var r, i, s = {}, o = 0;
            if (jQuery.isArray(t)) {
                r = getStyles(e);
                i = t.length;
                for (; o < i; o++) {
                    s[t[o]] = jQuery.css(e, t[o], false, r)
                }
                return s
            }
            return n !== undefined ? jQuery.style(e, t, n) : jQuery.css(e, t)
        }, e, t, arguments.length > 1)
    }, show: function () {
        return showHide(this, true)
    }, hide: function () {
        return showHide(this)
    }, toggle: function (e) {
        if (typeof e === "boolean") {
            return e ? this.show() : this.hide()
        }
        return this.each(function () {
            if (isHidden(this)) {
                jQuery(this).show()
            } else {
                jQuery(this).hide()
            }
        })
    }});
    jQuery.extend({cssHooks: {opacity: {get: function (e, t) {
        if (t) {
            var n = curCSS(e, "opacity");
            return n === "" ? "1" : n
        }
    }}}, cssNumber: {columnCount: true, fillOpacity: true, fontWeight: true, lineHeight: true, opacity: true, order: true, orphans: true, widows: true, zIndex: true, zoom: true}, cssProps: {"float": "cssFloat"}, style: function (e, t, n, r) {
        if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) {
            return
        }
        var i, s, o, u = jQuery.camelCase(t), a = e.style;
        t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(a, u));
        o = jQuery.cssHooks[t] || jQuery.cssHooks[u];
        if (n !== undefined) {
            s = typeof n;
            if (s === "string" && (i = rrelNum.exec(n))) {
                n = (i[1] + 1) * i[2] + parseFloat(jQuery.css(e, t));
                s = "number"
            }
            if (n == null || s === "number" && isNaN(n)) {
                return
            }
            if (s === "number" && !jQuery.cssNumber[u]) {
                n += "px"
            }
            if (!jQuery.support.clearCloneStyle && n === "" && t.indexOf("background") === 0) {
                a[t] = "inherit"
            }
            if (!o || !("set"in o) || (n = o.set(e, n, r)) !== undefined) {
                a[t] = n
            }
        } else {
            if (o && "get"in o && (i = o.get(e, false, r)) !== undefined) {
                return i
            }
            return a[t]
        }
    }, css: function (e, t, n, r) {
        var i, s, o, u = jQuery.camelCase(t);
        t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(e.style, u));
        o = jQuery.cssHooks[t] || jQuery.cssHooks[u];
        if (o && "get"in o) {
            i = o.get(e, true, n)
        }
        if (i === undefined) {
            i = curCSS(e, t, r)
        }
        if (i === "normal" && t in cssNormalTransform) {
            i = cssNormalTransform[t]
        }
        if (n === "" || n) {
            s = parseFloat(i);
            return n === true || jQuery.isNumeric(s) ? s || 0 : i
        }
        return i
    }});
    curCSS = function (e, t, n) {
        var r, i, s, o = n || getStyles(e), u = o ? o.getPropertyValue(t) || o[t] : undefined, a = e.style;
        if (o) {
            if (u === "" && !jQuery.contains(e.ownerDocument, e)) {
                u = jQuery.style(e, t)
            }
            if (rnumnonpx.test(u) && rmargin.test(t)) {
                r = a.width;
                i = a.minWidth;
                s = a.maxWidth;
                a.minWidth = a.maxWidth = a.width = u;
                u = o.width;
                a.width = r;
                a.minWidth = i;
                a.maxWidth = s
            }
        }
        return u
    };
    jQuery.each(["height", "width"], function (e, t) {
        jQuery.cssHooks[t] = {get: function (e, n, r) {
            if (n) {
                return e.offsetWidth === 0 && rdisplayswap.test(jQuery.css(e, "display")) ? jQuery.swap(e, cssShow, function () {
                    return getWidthOrHeight(e, t, r)
                }) : getWidthOrHeight(e, t, r)
            }
        }, set: function (e, n, r) {
            var i = r && getStyles(e);
            return setPositiveNumber(e, n, r ? augmentWidthOrHeight(e, t, r, jQuery.support.boxSizing && jQuery.css(e, "boxSizing", false, i) === "border-box", i) : 0)
        }}
    });
    jQuery(function () {
        if (!jQuery.support.reliableMarginRight) {
            jQuery.cssHooks.marginRight = {get: function (e, t) {
                if (t) {
                    return jQuery.swap(e, {display: "inline-block"}, curCSS, [e, "marginRight"])
                }
            }}
        }
        if (!jQuery.support.pixelPosition && jQuery.fn.position) {
            jQuery.each(["top", "left"], function (e, t) {
                jQuery.cssHooks[t] = {get: function (e, n) {
                    if (n) {
                        n = curCSS(e, t);
                        return rnumnonpx.test(n) ? jQuery(e).position()[t] + "px" : n
                    }
                }}
            })
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function (e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0
        };
        jQuery.expr.filters.visible = function (e) {
            return!jQuery.expr.filters.hidden(e)
        }
    }
    jQuery.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        jQuery.cssHooks[e + t] = {expand: function (n) {
            var r = 0, i = {}, s = typeof n === "string" ? n.split(" ") : [n];
            for (; r < 4; r++) {
                i[e + cssExpand[r] + t] = s[r] || s[r - 2] || s[0]
            }
            return i
        }};
        if (!rmargin.test(e)) {
            jQuery.cssHooks[e + t].set = setPositiveNumber
        }
    });
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({serialize: function () {
        return jQuery.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            var e = jQuery.prop(this, "elements");
            return e ? jQuery.makeArray(e) : this
        }).filter(function () {
                var e = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(e) && (this.checked || !manipulation_rcheckableType.test(e))
            }).map(function (e, t) {
                var n = jQuery(this).val();
                return n == null ? null : jQuery.isArray(n) ? jQuery.map(n, function (e) {
                    return{name: t.name, value: e.replace(rCRLF, "\r\n")}
                }) : {name: t.name, value: n.replace(rCRLF, "\r\n")}
            }).get()
    }});
    jQuery.param = function (e, t) {
        var n, r = [], i = function (e, t) {
            t = jQuery.isFunction(t) ? t() : t == null ? "" : t;
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (t === undefined) {
            t = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
        }
        if (jQuery.isArray(e) || e.jquery && !jQuery.isPlainObject(e)) {
            jQuery.each(e, function () {
                i(this.name, this.value)
            })
        } else {
            for (n in e) {
                buildParams(n, e[n], t, i)
            }
        }
        return r.join("&").replace(r20, "+")
    };
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (e, t) {
        jQuery.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    });
    jQuery.fn.extend({hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    }, bind: function (e, t, n) {
        return this.on(e, null, t, n)
    }, unbind: function (e, t) {
        return this.off(e, null, t)
    }, delegate: function (e, t, n, r) {
        return this.on(t, e, n, r)
    }, undelegate: function (e, t, n) {
        return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
    }});
    var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(), ajax_rquery = /\?/, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    jQuery.fn.load = function (e, t, n) {
        if (typeof e !== "string" && _load) {
            return _load.apply(this, arguments)
        }
        var r, i, s, o = this, u = e.indexOf(" ");
        if (u >= 0) {
            r = e.slice(u);
            e = e.slice(0, u)
        }
        if (jQuery.isFunction(t)) {
            n = t;
            t = undefined
        } else if (t && typeof t === "object") {
            i = "POST"
        }
        if (o.length > 0) {
            jQuery.ajax({url: e, type: i, dataType: "html", data: t}).done(function (e) {
                s = arguments;
                o.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
            }).complete(n && function (e, t) {
                    o.each(n, s || [e.responseText, t, e])
                })
        }
        return this
    };
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        jQuery.fn[t] = function (e) {
            return this.on(t, e)
        }
    });
    jQuery.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: ajaxLocation, type: "GET", isLocal: rlocalProtocol.test(ajaxLocParts[1]), global: true, processData: true, async: true, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: {"*": allTypes, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript"}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"}, converters: {"* text": String, "text html": true, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML}, flatOptions: {url: true, context: true}}, ajaxSetup: function (e, t) {
        return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e)
    }, ajaxPrefilter: addToPrefiltersOrTransports(prefilters), ajaxTransport: addToPrefiltersOrTransports(transports), ajax: function (e, t) {
        function S(e, t, s, u) {
            var f, m, g, b, E, S = t;
            if (y === 2) {
                return
            }
            y = 2;
            if (o) {
                clearTimeout(o)
            }
            n = undefined;
            i = u || "";
            w.readyState = e > 0 ? 4 : 0;
            f = e >= 200 && e < 300 || e === 304;
            if (s) {
                b = ajaxHandleResponses(l, w, s)
            }
            b = ajaxConvert(l, b, w, f);
            if (f) {
                if (l.ifModified) {
                    E = w.getResponseHeader("Last-Modified");
                    if (E) {
                        jQuery.lastModified[r] = E
                    }
                    E = w.getResponseHeader("etag");
                    if (E) {
                        jQuery.etag[r] = E
                    }
                }
                if (e === 204 || l.type === "HEAD") {
                    S = "nocontent"
                } else if (e === 304) {
                    S = "notmodified"
                } else {
                    S = b.state;
                    m = b.data;
                    g = b.error;
                    f = !g
                }
            } else {
                g = S;
                if (e || !S) {
                    S = "error";
                    if (e < 0) {
                        e = 0
                    }
                }
            }
            w.status = e;
            w.statusText = (t || S) + "";
            if (f) {
                p.resolveWith(c, [m, S, w])
            } else {
                p.rejectWith(c, [w, S, g])
            }
            w.statusCode(v);
            v = undefined;
            if (a) {
                h.trigger(f ? "ajaxSuccess" : "ajaxError", [w, l, f ? m : g])
            }
            d.fireWith(c, [w, S]);
            if (a) {
                h.trigger("ajaxComplete", [w, l]);
                if (!--jQuery.active) {
                    jQuery.event.trigger("ajaxStop")
                }
            }
        }

        if (typeof e === "object") {
            t = e;
            e = undefined
        }
        t = t || {};
        var n, r, i, s, o, u, a, f, l = jQuery.ajaxSetup({}, t), c = l.context || l, h = l.context && (c.nodeType || c.jquery) ? jQuery(c) : jQuery.event, p = jQuery.Deferred(), d = jQuery.Callbacks("once memory"), v = l.statusCode || {}, m = {}, g = {}, y = 0, b = "canceled", w = {readyState: 0, getResponseHeader: function (e) {
            var t;
            if (y === 2) {
                if (!s) {
                    s = {};
                    while (t = rheaders.exec(i)) {
                        s[t[1].toLowerCase()] = t[2]
                    }
                }
                t = s[e.toLowerCase()]
            }
            return t == null ? null : t
        }, getAllResponseHeaders: function () {
            return y === 2 ? i : null
        }, setRequestHeader: function (e, t) {
            var n = e.toLowerCase();
            if (!y) {
                e = g[n] = g[n] || e;
                m[e] = t
            }
            return this
        }, overrideMimeType: function (e) {
            if (!y) {
                l.mimeType = e
            }
            return this
        }, statusCode: function (e) {
            var t;
            if (e) {
                if (y < 2) {
                    for (t in e) {
                        v[t] = [v[t], e[t]]
                    }
                } else {
                    w.always(e[w.status])
                }
            }
            return this
        }, abort: function (e) {
            var t = e || b;
            if (n) {
                n.abort(t)
            }
            S(0, t);
            return this
        }};
        p.promise(w).complete = d.add;
        w.success = w.done;
        w.error = w.fail;
        l.url = ((e || l.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
        l.type = t.method || t.type || l.method || l.type;
        l.dataTypes = jQuery.trim(l.dataType || "*").toLowerCase().match(core_rnotwhite) || [""];
        if (l.crossDomain == null) {
            u = rurl.exec(l.url.toLowerCase());
            l.crossDomain = !!(u && (u[1] !== ajaxLocParts[1] || u[2] !== ajaxLocParts[2] || (u[3] || (u[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))))
        }
        if (l.data && l.processData && typeof l.data !== "string") {
            l.data = jQuery.param(l.data, l.traditional)
        }
        inspectPrefiltersOrTransports(prefilters, l, t, w);
        if (y === 2) {
            return w
        }
        a = l.global;
        if (a && jQuery.active++ === 0) {
            jQuery.event.trigger("ajaxStart")
        }
        l.type = l.type.toUpperCase();
        l.hasContent = !rnoContent.test(l.type);
        r = l.url;
        if (!l.hasContent) {
            if (l.data) {
                r = l.url += (ajax_rquery.test(r) ? "&" : "?") + l.data;
                delete l.data
            }
            if (l.cache === false) {
                l.url = rts.test(r) ? r.replace(rts, "$1_=" + ajax_nonce++) : r + (ajax_rquery.test(r) ? "&" : "?") + "_=" + ajax_nonce++
            }
        }
        if (l.ifModified) {
            if (jQuery.lastModified[r]) {
                w.setRequestHeader("If-Modified-Since", jQuery.lastModified[r])
            }
            if (jQuery.etag[r]) {
                w.setRequestHeader("If-None-Match", jQuery.etag[r])
            }
        }
        if (l.data && l.hasContent && l.contentType !== false || t.contentType) {
            w.setRequestHeader("Content-Type", l.contentType)
        }
        w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : l.accepts["*"]);
        for (f in l.headers) {
            w.setRequestHeader(f, l.headers[f])
        }
        if (l.beforeSend && (l.beforeSend.call(c, w, l) === false || y === 2)) {
            return w.abort()
        }
        b = "abort";
        for (f in{success: 1, error: 1, complete: 1}) {
            w[f](l[f])
        }
        n = inspectPrefiltersOrTransports(transports, l, t, w);
        if (!n) {
            S(-1, "No Transport")
        } else {
            w.readyState = 1;
            if (a) {
                h.trigger("ajaxSend", [w, l])
            }
            if (l.async && l.timeout > 0) {
                o = setTimeout(function () {
                    w.abort("timeout")
                }, l.timeout)
            }
            try {
                y = 1;
                n.send(m, S)
            } catch (E) {
                if (y < 2) {
                    S(-1, E)
                } else {
                    throw E
                }
            }
        }
        return w
    }, getJSON: function (e, t, n) {
        return jQuery.get(e, t, n, "json")
    }, getScript: function (e, t) {
        return jQuery.get(e, undefined, t, "script")
    }});
    jQuery.each(["get", "post"], function (e, t) {
        jQuery[t] = function (e, n, r, i) {
            if (jQuery.isFunction(n)) {
                i = i || r;
                r = n;
                n = undefined
            }
            return jQuery.ajax({url: e, type: t, dataType: i, data: n, success: r})
        }
    });
    jQuery.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /(?:java|ecma)script/}, converters: {"text script": function (e) {
        jQuery.globalEval(e);
        return e
    }}});
    jQuery.ajaxPrefilter("script", function (e) {
        if (e.cache === undefined) {
            e.cache = false
        }
        if (e.crossDomain) {
            e.type = "GET"
        }
    });
    jQuery.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n;
            return{send: function (r, i) {
                t = jQuery("<script>").prop({async: true, charset: e.scriptCharset, src: e.url}).on("load error", n = function (e) {
                    t.remove();
                    n = null;
                    if (e) {
                        i(e.type === "error" ? 404 : 200, e.type)
                    }
                });
                document.head.appendChild(t[0])
            }, abort: function () {
                if (n) {
                    n()
                }
            }}
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        var e = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
        this[e] = true;
        return e
    }});
    jQuery.ajaxPrefilter("json jsonp", function (e, t, n) {
        var r, i, s, o = e.jsonp !== false && (rjsonp.test(e.url) ? "url" : typeof e.data === "string" && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(e.data) && "data");
        if (o || e.dataTypes[0] === "jsonp") {
            r = e.jsonpCallback = jQuery.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback;
            if (o) {
                e[o] = e[o].replace(rjsonp, "$1" + r)
            } else if (e.jsonp !== false) {
                e.url += (ajax_rquery.test(e.url) ? "&" : "?") + e.jsonp + "=" + r
            }
            e.converters["script json"] = function () {
                if (!s) {
                    jQuery.error(r + " was not called")
                }
                return s[0]
            };
            e.dataTypes[0] = "json";
            i = window[r];
            window[r] = function () {
                s = arguments
            };
            n.always(function () {
                window[r] = i;
                if (e[r]) {
                    e.jsonpCallback = t.jsonpCallback;
                    oldCallbacks.push(r)
                }
                if (s && jQuery.isFunction(i)) {
                    i(s[0])
                }
                s = i = undefined
            });
            return"script"
        }
    });
    jQuery.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest
        } catch (e) {
        }
    };
    var xhrSupported = jQuery.ajaxSettings.xhr(), xhrSuccessStatus = {0: 200, 1223: 204}, xhrId = 0, xhrCallbacks = {};
    if (window.ActiveXObject) {
        jQuery(window).on("unload", function () {
            for (var e in xhrCallbacks) {
                xhrCallbacks[e]()
            }
            xhrCallbacks = undefined
        })
    }
    jQuery.support.cors = !!xhrSupported && "withCredentials"in xhrSupported;
    jQuery.support.ajax = xhrSupported = !!xhrSupported;
    jQuery.ajaxTransport(function (e) {
        var t;
        if (jQuery.support.cors || xhrSupported && !e.crossDomain) {
            return{send: function (n, r) {
                var i, s, o = e.xhr();
                o.open(e.type, e.url, e.async, e.username, e.password);
                if (e.xhrFields) {
                    for (i in e.xhrFields) {
                        o[i] = e.xhrFields[i]
                    }
                }
                if (e.mimeType && o.overrideMimeType) {
                    o.overrideMimeType(e.mimeType)
                }
                if (!e.crossDomain && !n["X-Requested-With"]) {
                    n["X-Requested-With"] = "XMLHttpRequest"
                }
                for (i in n) {
                    o.setRequestHeader(i, n[i])
                }
                t = function (e) {
                    return function () {
                        if (t) {
                            delete xhrCallbacks[s];
                            t = o.onload = o.onerror = null;
                            if (e === "abort") {
                                o.abort()
                            } else if (e === "error") {
                                r(o.status || 404, o.statusText)
                            } else {
                                r(xhrSuccessStatus[o.status] || o.status, o.statusText, typeof o.responseText === "string" ? {text: o.responseText} : undefined, o.getAllResponseHeaders())
                            }
                        }
                    }
                };
                o.onload = t();
                o.onerror = t("error");
                t = xhrCallbacks[s = xhrId++] = t("abort");
                o.send(e.hasContent && e.data || null)
            }, abort: function () {
                if (t) {
                    t()
                }
            }}
        }
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {"*": [function (e, t) {
        var n = this.createTween(e, t), r = n.cur(), i = rfxnum.exec(t), s = i && i[3] || (jQuery.cssNumber[e] ? "" : "px"), o = (jQuery.cssNumber[e] || s !== "px" && +r) && rfxnum.exec(jQuery.css(n.elem, e)), u = 1, a = 20;
        if (o && o[3] !== s) {
            s = s || o[3];
            i = i || [];
            o = +r || 1;
            do {
                u = u || ".5";
                o = o / u;
                jQuery.style(n.elem, e, o + s)
            } while (u !== (u = n.cur() / r) && u !== 1 && --a)
        }
        if (i) {
            o = n.start = +o || +r || 0;
            n.unit = s;
            n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]
        }
        return n
    }]};
    jQuery.Animation = jQuery.extend(Animation, {tweener: function (e, t) {
        if (jQuery.isFunction(e)) {
            t = e;
            e = ["*"]
        } else {
            e = e.split(" ")
        }
        var n, r = 0, i = e.length;
        for (; r < i; r++) {
            n = e[r];
            tweeners[n] = tweeners[n] || [];
            tweeners[n].unshift(t)
        }
    }, prefilter: function (e, t) {
        if (t) {
            animationPrefilters.unshift(e)
        } else {
            animationPrefilters.push(e)
        }
    }});
    jQuery.Tween = Tween;
    Tween.prototype = {constructor: Tween, init: function (e, t, n, r, i, s) {
        this.elem = e;
        this.prop = n;
        this.easing = i || "swing";
        this.options = t;
        this.start = this.now = this.cur();
        this.end = r;
        this.unit = s || (jQuery.cssNumber[n] ? "" : "px")
    }, cur: function () {
        var e = Tween.propHooks[this.prop];
        return e && e.get ? e.get(this) : Tween.propHooks._default.get(this)
    }, run: function (e) {
        var t, n = Tween.propHooks[this.prop];
        if (this.options.duration) {
            this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration)
        } else {
            this.pos = t = e
        }
        this.now = (this.end - this.start) * t + this.start;
        if (this.options.step) {
            this.options.step.call(this.elem, this.now, this)
        }
        if (n && n.set) {
            n.set(this)
        } else {
            Tween.propHooks._default.set(this)
        }
        return this
    }};
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {_default: {get: function (e) {
        var t;
        if (e.elem[e.prop] != null && (!e.elem.style || e.elem.style[e.prop] == null)) {
            return e.elem[e.prop]
        }
        t = jQuery.css(e.elem, e.prop, "");
        return!t || t === "auto" ? 0 : t
    }, set: function (e) {
        if (jQuery.fx.step[e.prop]) {
            jQuery.fx.step[e.prop](e)
        } else if (e.elem.style && (e.elem.style[jQuery.cssProps[e.prop]] != null || jQuery.cssHooks[e.prop])) {
            jQuery.style(e.elem, e.prop, e.now + e.unit)
        } else {
            e.elem[e.prop] = e.now
        }
    }}};
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function (e) {
        if (e.elem.nodeType && e.elem.parentNode) {
            e.elem[e.prop] = e.now
        }
    }};
    jQuery.each(["toggle", "show", "hide"], function (e, t) {
        var n = jQuery.fn[t];
        jQuery.fn[t] = function (e, r, i) {
            return e == null || typeof e === "boolean" ? n.apply(this, arguments) : this.animate(genFx(t, true), e, r, i)
        }
    });
    jQuery.fn.extend({fadeTo: function (e, t, n, r) {
        return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
    }, animate: function (e, t, n, r) {
        var i = jQuery.isEmptyObject(e), s = jQuery.speed(t, n, r), o = function () {
            var t = Animation(this, jQuery.extend({}, e), s);
            if (i || data_priv.get(this, "finish")) {
                t.stop(true)
            }
        };
        o.finish = o;
        return i || s.queue === false ? this.each(o) : this.queue(s.queue, o)
    }, stop: function (e, t, n) {
        var r = function (e) {
            var t = e.stop;
            delete e.stop;
            t(n)
        };
        if (typeof e !== "string") {
            n = t;
            t = e;
            e = undefined
        }
        if (t && e !== false) {
            this.queue(e || "fx", [])
        }
        return this.each(function () {
            var t = true, i = e != null && e + "queueHooks", s = jQuery.timers, o = data_priv.get(this);
            if (i) {
                if (o[i] && o[i].stop) {
                    r(o[i])
                }
            } else {
                for (i in o) {
                    if (o[i] && o[i].stop && rrun.test(i)) {
                        r(o[i])
                    }
                }
            }
            for (i = s.length; i--;) {
                if (s[i].elem === this && (e == null || s[i].queue === e)) {
                    s[i].anim.stop(n);
                    t = false;
                    s.splice(i, 1)
                }
            }
            if (t || !n) {
                jQuery.dequeue(this, e)
            }
        })
    }, finish: function (e) {
        if (e !== false) {
            e = e || "fx"
        }
        return this.each(function () {
            var t, n = data_priv.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], s = jQuery.timers, o = r ? r.length : 0;
            n.finish = true;
            jQuery.queue(this, e, []);
            if (i && i.stop) {
                i.stop.call(this, true)
            }
            for (t = s.length; t--;) {
                if (s[t].elem === this && s[t].queue === e) {
                    s[t].anim.stop(true);
                    s.splice(t, 1)
                }
            }
            for (t = 0; t < o; t++) {
                if (r[t] && r[t].finish) {
                    r[t].finish.call(this)
                }
            }
            delete n.finish
        })
    }});
    jQuery.each({slideDown: genFx("show"), slideUp: genFx("hide"), slideToggle: genFx("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (e, t) {
        jQuery.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    });
    jQuery.speed = function (e, t, n) {
        var r = e && typeof e === "object" ? jQuery.extend({}, e) : {complete: n || !n && t || jQuery.isFunction(e) && e, duration: e, easing: n && t || t && !jQuery.isFunction(t) && t};
        r.duration = jQuery.fx.off ? 0 : typeof r.duration === "number" ? r.duration : r.duration in jQuery.fx.speeds ? jQuery.fx.speeds[r.duration] : jQuery.fx.speeds._default;
        if (r.queue == null || r.queue === true) {
            r.queue = "fx"
        }
        r.old = r.complete;
        r.complete = function () {
            if (jQuery.isFunction(r.old)) {
                r.old.call(this)
            }
            if (r.queue) {
                jQuery.dequeue(this, r.queue)
            }
        };
        return r
    };
    jQuery.easing = {linear: function (e) {
        return e
    }, swing: function (e) {
        return.5 - Math.cos(e * Math.PI) / 2
    }};
    jQuery.timers = [];
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.tick = function () {
        var e, t = jQuery.timers, n = 0;
        fxNow = jQuery.now();
        for (; n < t.length; n++) {
            e = t[n];
            if (!e() && t[n] === e) {
                t.splice(n--, 1)
            }
        }
        if (!t.length) {
            jQuery.fx.stop()
        }
        fxNow = undefined
    };
    jQuery.fx.timer = function (e) {
        if (e() && jQuery.timers.push(e)) {
            jQuery.fx.start()
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function () {
        if (!timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
        }
    };
    jQuery.fx.stop = function () {
        clearInterval(timerId);
        timerId = null
    };
    jQuery.fx.speeds = {slow: 600, fast: 200, _default: 400};
    jQuery.fx.step = {};
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function (e) {
            return jQuery.grep(jQuery.timers,function (t) {
                return e === t.elem
            }).length
        }
    }
    jQuery.fn.offset = function (e) {
        if (arguments.length) {
            return e === undefined ? this : this.each(function (t) {
                jQuery.offset.setOffset(this, e, t)
            })
        }
        var t, n, r = this[0], i = {top: 0, left: 0}, s = r && r.ownerDocument;
        if (!s) {
            return
        }
        t = s.documentElement;
        if (!jQuery.contains(t, r)) {
            return i
        }
        if (typeof r.getBoundingClientRect !== core_strundefined) {
            i = r.getBoundingClientRect()
        }
        n = getWindow(s);
        return{top: i.top + n.pageYOffset - t.clientTop, left: i.left + n.pageXOffset - t.clientLeft}
    };
    jQuery.offset = {setOffset: function (e, t, n) {
        var r, i, s, o, u, a, f, l = jQuery.css(e, "position"), c = jQuery(e), h = {};
        if (l === "static") {
            e.style.position = "relative"
        }
        u = c.offset();
        s = jQuery.css(e, "top");
        a = jQuery.css(e, "left");
        f = (l === "absolute" || l === "fixed") && (s + a).indexOf("auto") > -1;
        if (f) {
            r = c.position();
            o = r.top;
            i = r.left
        } else {
            o = parseFloat(s) || 0;
            i = parseFloat(a) || 0
        }
        if (jQuery.isFunction(t)) {
            t = t.call(e, n, u)
        }
        if (t.top != null) {
            h.top = t.top - u.top + o
        }
        if (t.left != null) {
            h.left = t.left - u.left + i
        }
        if ("using"in t) {
            t.using.call(e, h)
        } else {
            c.css(h)
        }
    }};
    jQuery.fn.extend({position: function () {
        if (!this[0]) {
            return
        }
        var e, t, n = this[0], r = {top: 0, left: 0};
        if (jQuery.css(n, "position") === "fixed") {
            t = n.getBoundingClientRect()
        } else {
            e = this.offsetParent();
            t = this.offset();
            if (!jQuery.nodeName(e[0], "html")) {
                r = e.offset()
            }
            r.top += jQuery.css(e[0], "borderTopWidth", true);
            r.left += jQuery.css(e[0], "borderLeftWidth", true)
        }
        return{top: t.top - r.top - jQuery.css(n, "marginTop", true), left: t.left - r.left - jQuery.css(n, "marginLeft", true)}
    }, offsetParent: function () {
        return this.map(function () {
            var e = this.offsetParent || docElem;
            while (e && !jQuery.nodeName(e, "html") && jQuery.css(e, "position") === "static") {
                e = e.offsetParent
            }
            return e || docElem
        })
    }});
    jQuery.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = "pageYOffset" === t;
        jQuery.fn[e] = function (r) {
            return jQuery.access(this, function (e, r, i) {
                var s = getWindow(e);
                if (i === undefined) {
                    return s ? s[t] : e[r]
                }
                if (s) {
                    s.scrollTo(!n ? i : window.pageXOffset, n ? i : window.pageYOffset)
                } else {
                    e[r] = i
                }
            }, e, r, arguments.length, null)
        }
    });
    jQuery.each({Height: "height", Width: "width"}, function (e, t) {
        jQuery.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
            jQuery.fn[r] = function (r, i) {
                var s = arguments.length && (n || typeof r !== "boolean"), o = n || (r === true || i === true ? "margin" : "border");
                return jQuery.access(this, function (t, n, r) {
                    var i;
                    if (jQuery.isWindow(t)) {
                        return t.document.documentElement["client" + e]
                    }
                    if (t.nodeType === 9) {
                        i = t.documentElement;
                        return Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])
                    }
                    return r === undefined ? jQuery.css(t, n, o) : jQuery.style(t, n, r, o)
                }, t, s ? r : undefined, s, null)
            }
        })
    });
    jQuery.fn.size = function () {
        return this.length
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = jQuery
    } else {
        if (typeof define === "function" && define.amd) {
            define("jquery", [], function () {
                return jQuery
            })
        }
    }
    if (typeof window === "object" && typeof window.document === "object") {
        window.jQuery = window.$ = jQuery
    }
})(window)