from datetime import datetime
from datetime import date
import json, os, sys
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.mail import EmailMessage
from django.conf import settings
from django.http import Http404, HttpResponse
from scripts import combo_finder
from django.template import RequestContext
import time
from django.template import Context, Template

from models import FeedbackForm, Review, Course, UserProfile, Faculty
from stats import *
from forms import *
from auth_receiver import *


def home(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        return render(request, 'templates/home/bhome.html',
                      {'user': request.user,
                       'title': "CourseReview - Home",
                       'homeNavClass':"active",
                       'request':request
                      })
    else:
        return user(request)

def faq(request):
    return render(request, 'templates/home/faq.html',
                  {'user': request.user, 'title': "CourseReview - FAQs", 'faqNavClass':"active"})


def features(request):
    return render(request, 'templates/home/features.html',
                  {'user': request.user, 'title': "CourseReview - Features", 'featuresNavClass':"active"})


def user(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        #return render(request, 'templates/home/bhome.html',{'user': request.user, 'title': "CourseReview - Welcome", 'homeNavClass':"active"})
        return home(request)
    elif request.method == "POST":
        print request.POST.items()
        p = UserProfile.objects.get(username=request.user)
        p.name = request.POST.get("name")
        p.sex = request.POST.get("sex")
        p.dob = datetime.strptime(request.POST.get("DOB"),"%d-%m-%Y").date()
        p.save()
    else:
        p = UserProfile.objects.get(username=request.user)
    if p.dob:
        dob = p.dob.strftime("%d-%m-%Y")
    else:
        dob = "01-01-1990"

    submitted_reviews=request.user.reviewReviewer

    if(len(submitted_reviews.all())):
        hasReview=1
    else:
        hasReview=0

    return render(request, 'templates/home/userhome.html',
                  dict(
                      user=request.user,
                      title="CourseReview - Home",
                      name=p.name,
                      DOB= dob,
                      type=p.type,
                      sex=p.sex,
                      email=p.email.split("@")[0],
                      homeNavClass="active",
                      hasReview=hasReview
                  )
    )


def contact(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        return render(request, 'templates/home/contact_us.html',
                      {'user': request.user, 'title': "CourseReview - Contact Us", 'contactNavClass':"active"})
    else:
        return render(request, 'templates/home/contact_us2.html',
                      {'user': request.user, 'title': "CourseReview - Contact Us", 'contactNavClass':"active"})


def feedbacks(request):
    if request.method == 'POST':
        form = FeedbackForm(request.POST, request.FILES)
        if form.is_valid():
            userName = request.POST.get('user-name')
            emailID = request.POST.get('email-id')
            feedbackType = request.POST.get('feedbacktype')
            bugExpected = request.POST.get('bug_expected')
            bugCurrent = request.POST.get('bug_current')
            bugSteps = request.POST.get('bug_steps')
            message = request.POST.get('message')
            say = request.POST.get('say')
            attachment = request.FILES.get('attachment')
            recipients = ['iiitdcoursereview@gmail.com']

            if feedbackType == 'feature':
                subject = "Feature Suggestion"
                msg = "User Name: " + userName + "\nEmail ID: " + emailID + "\n\n" + message
                mail = EmailMessage(subject, msg, settings.DEFAULT_FROM_EMAIL, recipients)
                if attachment is not None:
                    mail.attach(attachment.name, attachment.read(), attachment.content_type)
                mail.send()
            elif feedbackType == 'bug':
                subject = "Bug Report"
                msg = "User Name: " + userName + "\nEmail ID: " + emailID + "\n\n"
                msg = msg + "Expected Behaviour:\n" + bugExpected + "\n\nCurrent Behaviour:\n" + bugCurrent + \
                      "\n\nSteps To Reproduce Bug:\n" + bugSteps
                mail = EmailMessage(subject, msg, settings.DEFAULT_FROM_EMAIL, recipients)
                if attachment is not None:
                    mail.attach(attachment.name, attachment.read(), attachment.content_type)
                mail.send()
            else:
                subject = "Something About Coursereview"
                msg = "User Name: " + userName + "\nEmail ID: " + emailID + "\n\n" + say
                mail = EmailMessage(subject, msg, settings.DEFAULT_FROM_EMAIL, recipients)
                if attachment is not None:
                    mail.attach(attachment.name, attachment.read(), attachment.content_type)
                mail.send()

            return HttpResponseRedirect('/thanks/')
    else:
        raise Http404


def thanks(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        raise Http404
    else:
        return render(request, 'templates/home/feedback_thanks.html',
                      {'user': request.user, 'title': "Feedback - Thanks"})

def reviewthanks(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        raise Http404
    else:
        return render(request, 'templates/home2/review_thanks.html',
                      {'user': request.user, 'title': "Review - Thanks"})

def review(request):
    logged_in = request.user.is_authenticated()
    courselist = Course.objects.all().values()
    proflist = Faculty.objects.all().values()

    if not logged_in:
        raise Http404
    elif request.method == "GET":
        y = date.today().year
        return render(request, 'templates/home2/reviewcourse.html',
                      {'user': request.user,
                       'title': "Coursereview - Reviews",
                       'time': range(y, y - 4, -1),
                       "clist": courselist,
                       "plist": proflist,
                       'reviewNavClass':"active"})

    elif request.method == "POST":
        userReview = Review(reviewer=request.user, createdTime=datetime.now())

        courseID = request.POST.get('course').split("-")
        item = courseID[0].replace(" ", "")
        courseTaken = item.encode('ascii', 'ignore')
        userReview.course = Course.objects.get(courseID = courseTaken)

        #TODO : insert using facultyID instead of name
        userReview.faculty = Faculty.objects.get(name=request.POST.get('faculty'))
        userReview.yearTaken = request.POST.get("yearTaken")
        userReview.creditsTaken = int(request.POST.get("creditsTaken")[0])
        userReview.semTaken = request.POST.get("semTaken")
        #userReview.upvotes=0

        #reviws and criteria
        userReview.easeOfScoring = request.POST.get("easeOfScoring")
        userReview.workload = request.POST.get("workload")
        userReview.easeOfContent = request.POST.get("easeOfContent")
        userReview.industryApplication = request.POST.get("industryApplication")
        userReview.interesting = request.POST.get("interesting")
        userReview.qualityTeaching = request.POST.get("qualityTeaching")
        userReview.relevance = request.POST.get("relevance")
        userReview.technicality = request.POST.get("technicality")
        userReview.projectBurden = request.POST.get("projectBurden")
        userReview.comment = request.POST.get("comment")


        if request.POST.get("anonymous")=="True":
            userReview.anon = "True"  ##False by default

        userReview.save()
        return HttpResponseRedirect('/rthanks/')
    else:
        raise Http404



def courses(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        raise Http404
    else:
        d = {}
        for y in Course.objects.all():
            d[y.id] = [y.courseID, y.name, "No reviews yet", "No information yet", "No information yet"]
        for x in Review.objects.all():
            if type(d[x.course.id][2]) != int:
                d[x.course.id][2] = 1
                d[x.course.id][3] = round((sum([x.easeOfScoring, x.easeOfContent, x.industryApplication, x.interesting,
                                                x.workload, x.qualityTeaching, x.relevance, x.technicality,
                                                x.projectBurden])/9.0), 3)
                d[x.course.id][4] = [x.faculty.name]
            else:
                d[x.course.id][2] += 1
                d[x.course.id][3] += round((sum([x.easeOfScoring, x.easeOfContent, x.industryApplication, x.interesting,
                                                x.workload, x.qualityTeaching, x.relevance, x.technicality,
                                                x.projectBurden])/9.0), 3)
                d[x.course.id][4] += [x.faculty.name]
        for x in Course.objects.all():
            if type(d[x.id][2]) == int:
                d[x.id][3] = round(d[x.id][3]*1.0/d[x.id][2], 3)
                d[x.id][4] = ", ".join(list(set(d[x.id][4])))
            ### COMMENT BELOW two show courses for which no information is available. ###
            else:
                d.pop(x.id)
        d = [[k] + v for (k, v) in d.items()]
        #for x in d:
        #    print x
        return render(request, 'templates/home2/courses_table.html',
                  {'user': request.user, 'title': "CourseReview - Courses", "clist": d, 'coursesNavClass':"active"})

    # if request.method == 'POST':
    #     form = CourseForm(request.POST)
    #     print "ERRORS:", form.errors
    #     if form.is_valid():
    #         course = form.cleaned_data['id']
    #         print "Course Selected:", course
    #         return HttpResponseRedirect('/home/')
    # else:
    #     form = CourseForm()


def profile(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        raise Http404
    else:
        return render(request, 'templates/home/user_profile.html',
                      {'user': request.user, 'title': "Your Profile"})


def allreviews(request):
    logged_in = request.user.is_authenticated()
    list = []
    for x in Review.objects.all():
        overall = [x.easeOfScoring, x.easeOfContent, x.industryApplication, x.interesting, x.workload, x.qualityTeaching, x.relevance, x.technicality, x.projectBurden]
        overall = round(1.0*sum(overall)/len(overall), 3)
        list += [{'faculty': x.faculty.name, 'course': x.course.name, 'yearTaken': x.yearTaken, 'creditsTaken': x.creditsTaken,
        'myUpvotes': x.upvotes, 'comment': x.comment, 'rating': overall, 'myid':x.id}]
    if not logged_in:
        raise Http404
    else:
        return render(request, 'templates/home2/review_view.html',
                      {'user': request.user, 'revs': list, 'allrevpage':"active", 'title': "CourseReview - All Reviews"})

def seereview(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        raise Http404
    else:
        gid = request.GET.get('revid','1')
        x = Review.objects.get(id=gid)
        prof = x.faculty.name
        overall = [x.easeOfScoring, x.easeOfContent, x.industryApplication, x.interesting, x.workload, x.qualityTeaching, x.relevance, x.technicality, x.projectBurden]
        overall = round(1.0*sum(overall)/len(overall), 3)
        reviewer = x.reviewer
        return render(request, 'templates/home2/review_review.html',
                      {'user': request.user, 'rev': x, 'overall': overall, 'reviewer': reviewer,
                       'bar': int(overall*10), 'title': "CourseReview - Review", 'prof': prof})

def vote(request):
    results = {'success': False, 'votes': -1}
    if request.method == u'GET':
        GET = request.GET
        if GET.has_key(u'pk') and GET.has_key(u'vote'):
            pk = int(GET[u'pk'])
            vote = GET[u'vote']
            myUser = UserProfile.objects.get(email = GET[u'myUser'])
            myReview = Review.objects.get(pk=pk)
            if vote == u"up":
                if myUser in myReview.downvoters.all():
                    myReview.downvoters.remove(myUser)
                elif myUser not in myReview.upvoters.all():
                    myReview.upvoters.add(myUser)
            elif vote == u"down":
                if myUser in myReview.upvoters.all():
                    myReview.upvoters.remove(myUser)
                elif myUser not in myReview.downvoters.all():
                    myReview.downvoters.add(myUser)
            myReview.upvotes = myReview.upvoters.all().count() - myReview.downvoters.all().count()
            myReview.save()
            results['success'] = True
            results['votes'] = myReview.upvotes
            results['myUser'] = myUser.email
    myjson = json.dumps(results)
    return HttpResponse(myjson, mimetype='application/json')

def watch(request):
    results = {'success': False, 'watchText': -1}
    if request.method == u'GET':
        GET = request.GET
        if GET.has_key(u'myCourse') and GET.has_key(u'text'):
            courseID = GET[u'myCourse']
            courseID = courseID.encode('ascii', 'ignore')
            text = GET[u'text']
            myUser = UserProfile.objects.get(username = GET[u'myUser'])
            myCourse = Course.objects.get(courseID = courseID)
            if text == u"Watch":
                myUser.watchList.add(myCourse)
                results['watchText'] = "Unwatch"
            elif text == u"Unwatch":
                myUser.watchList.remove(myCourse)
                results['watchText'] = "Watch"
            else:
                if myCourse in myUser.watchList.all():
                    results['watchText'] = "Unwatch"
                elif myCourse not in myUser.watchList.all():
                    results['watchText'] = "Watch"
            myCourse.save()
            results['success'] = True
            results['myUser'] = myUser.email
    myjson = json.dumps(results)
    return HttpResponse(myjson, mimetype='application/json')

def statistics(request):
    logged_in = request.user.is_authenticated()
    if logged_in:
        reviewCount = getReviewCount()
        courseCount = getCoursesCount()
        reviewedCount = getCoursesReviewed()
        studentCount, profCount = getStudentAndProfCount()
        if profCount is None:
            profCount = 0;
        topReviewers = getTopReviewers(4)
        print topReviewers
        topReviewersByReviews=topReviewers[0]
        topReviewersByUpvotes=topReviewers[1]

        topCourses = getTopCourses(4)
        return render(request, 'templates/home/stats.html', {'students':studentCount, 'profs':profCount, \
                                                             'coursesReviewed': reviewedCount, 'totalReviews': reviewCount, \
                                                             'courses': courseCount, 'topByRev':topReviewersByReviews, \
                                                             'topByUp':topReviewersByUpvotes, 'title': "CourseReview - Statistics"})
    else:
        reviewCount = getReviewCount()
        courseCount = getCoursesCount()
        reviewedCount = getCoursesReviewed()
        studentCount, profCount = getStudentAndProfCount()
        if profCount is None:
            profCount = 0;
        topReviewers=getTopReviewers(4)
        topReviewersByReviews=topReviewers[0]
        topReviewersByUpvotes=topReviewers[1]

        topCourses = getTopCourses(4)
        print topReviewers
        return render(request, 'templates/home/stats2.html', {'students':studentCount, 'profs':profCount, \
                                                             'coursesReviewed': reviewedCount, 'totalReviews': reviewCount, \
                                                             'courses': courseCount, 'topByRev':topReviewersByReviews, \
                                                             'topByUp':topReviewersByUpvotes, 'title': "CourseReview - Statistics"})


def report(request):
    results = {'success': False, 'mess': -1}
    if request.method == u'GET':
        GET = request.GET
        if GET.has_key(u'pk'):
            pk = int(GET[u'pk'])
            myUser = UserProfile.objects.get(username = GET[u'myUser'])
            myReview = Review.objects.get(pk=pk)
            results['mess'] = "You have already reported this review."
            if myUser not in myReview.reporter.all():
                myReview.reporter.add(myUser)
                results['mess'] = "Reported!"
            myReview.save()
    myjson = json.dumps(results)
    return HttpResponse(myjson, mimetype='application/json')


def seecourse(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        raise Http404
    else:
        gid = request.GET.get('cid', '1')
        myc = Course.objects.get(id=gid)
        courseOverall = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        count = 0
        proflist = []
        lrevs = []
        if len(Review.objects.filter(course = myc)) == 0:
            return render(request, 'templates/home2/course_overview.html',
                      {'user': request.user, 'rev': {}, 'overall': "No Score", 'bar':int(5*10), 'course': myc,
                       'profs': "Unknown", 'lrevs':{}, 'count':0, 'title': "Coursereview - Course Overview", 'none': True})
        for x in Review.objects.filter(course = myc):
            proflist += [x.faculty.name]
            count += 1
            overall = [x.easeOfScoring, x.easeOfContent, x.industryApplication,
                       x.interesting, x.workload, x.qualityTeaching, x.relevance,
                       x.technicality, x.projectBurden]
            for i in range(len(overall)):
                courseOverall[i] += overall[i]
            lname = "Anonymous"
            if not x.anon:
                lname = x.reviewer.name
            lrevs += [[x.upvotes, x.id, round(sum(overall)*1.0/len(overall), 3), lname]]
        lrevs.sort()
        lrevs = lrevs[::-1]
        if len(lrevs) > 5:
            lrevs = lrevs[:5]
        for i in range(len(overall)):
                courseOverall[i] = round(courseOverall[i]*1.0/count, 3)
        proflist = ", ".join(list(set(proflist)))
        totscore = round(sum(courseOverall)*1.0/len(courseOverall), 3)
        d = {"easeOfScoring": courseOverall[0],
             "easeOfContent": courseOverall[1],
             "industryApplication": courseOverall[2],
             "interesting": courseOverall[3],
             "workload": courseOverall[4],
             "qualityTeaching": courseOverall[5],
             "relevance": courseOverall[6],
             "technicality": courseOverall[7],
             "projectBurden": courseOverall[8]}
        return render(request, 'templates/home2/course_overview.html',
                      {'user': request.user, 'rev': d, 'overall': totscore, 'bar':int(totscore*10), 'course': myc,
                       'profs': proflist, 'lrevs':lrevs, 'count':count, 'title': "Coursereview - Course Overview",
                       "none": False})

def allCourses(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        raise Http404
    else:
        myUser = UserProfile.objects.get(username = request.user)
        myList = myUser.watchList.all()
        cid = []
        for c in myList:
            cid.append(c.id)
        d = {}
        for y in myList:
            d[y.id] = [y.courseID, y.name, "No reviews yet", "No information yet"]
        for x in Review.objects.all():
            if x.course.id in cid:
                if type(d[x.course.id][2]) != int:
                    d[x.course.id][2] = 1
                    d[x.course.id][3] = round((sum([x.easeOfScoring, x.easeOfContent, x.industryApplication, x.interesting,
                                                    x.workload, x.qualityTeaching, x.relevance, x.technicality,
                                                    x.projectBurden])/9.0), 3)
                else:
                    d[x.course.id][2] += 1
                    d[x.course.id][3] += round((sum([x.easeOfScoring, x.easeOfContent, x.industryApplication, x.interesting,
                                                    x.workload, x.qualityTeaching, x.relevance, x.technicality,
                                                    x.projectBurden])/9.0), 3)
        for x in myList:
            if type(d[x.id][2]) == int:
                d[x.id][3] = round(d[x.id][3]*1.0/d[x.id][2], 3)
            ### COMMENT BELOW two show courses for which no information is available. ###
            #else:
            #    d.pop(x.id)
        d = [[k] + v for (k, v) in d.items()]

        return render(request, 'templates/home2/watchlist.html',
                      {'user': request.user, 'title': "CourseReview - Watchlist", 'watchlist':"active", 'wlist': d})

def addCourses(request):
    logged_in = request.user.is_authenticated()
    if not logged_in:
        raise Http404
    elif request.method == 'POST':
            form = CourseForm(request.POST)
            if form.is_valid():
                course = form.cleaned_data['id']
                watchCourse = Course.objects.get(courseID = course)
                id = watchCourse.id
                return HttpResponseRedirect("/seecourse/?cid=" + str(id))
    else:
        form = CourseForm()
    return render(request, 'templates/home2/add_course.html',
                  {'user': request.user, 'title': "Coursereview - More Courses", 'form': form, 'watchlist':"active"})


def test(request):
    basepath = os.path.dirname(__file__)
    """ settings parh """
    settingPath = os.path.abspath(os.path.join(basepath, ".."))
    """ file path for SERVER """
    #jsonfilepath = os.path.abspath(os.path.join(basepath, "..", "..", "..", "staticfiles", "data", "courseData.json"))
    """ file path for LOCALHOST """
    ttable = os.path.abspath(os.path.join(basepath, "..", "static", "data", "timetable.json"))
    ttable = json.load(open(ttable, "r"))
    if request.method == 'POST':
        s = request.POST.keys()[0]
        s = s.split(",")
        print len(s)
        s = [(int(s[i+1].strip()), s[i].strip()) for i in range(len(s))[::2]]
        print s
        d = {k:5 for k in ttable}
        for x in s:
            d[x[1]] = x[0]
        print d
        d = [(d[k], k) for k in d]
        combos = combo_finder.find_clash(d, 3, ttable)
        combos = [[sum([x[0] for x in combo])] + [x[1] for x in combo] for combo in combos]
        combos = json.dumps(combos)
        return HttpResponse(combos, mimetype='application/json')
    else:
        d = [[k] + v[0] for (k, v) in ttable.items()]
    return render(request, 'templates/home2/ctable_select.html',
        {'user': request.user, 'title': "CourseReview - Courses", "clist": d, 'coursesNavClass': "active"})
