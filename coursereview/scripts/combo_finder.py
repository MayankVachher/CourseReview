def check_clash(d, tt):
    can = []
    for x in d:
        can += [tuple(y) for y in tt[x[1]][1]]
    if len(can) > len(set(can)):
        return False
    return True


def find_clash(myl, i, timetable):
    combos = []
    combo = []
    s = range(len(myl)/i)
    myl.sort()
    myl = myl[::-1]
    print myl
    print s
    for a in s:
        for b in s[a+1:]:
            for c in s[b+1:]:
                for d in s[c+1:]:
                    for e in s[d+1:]:
                        combo = [myl[a], myl[b], myl[c], myl[d], myl[e]]
                        if check_clash(combo, timetable):
                            #print "inside"
                            print combo
                            combos += [combo]
                            if len(combos) >= 5:
                                return combos
    return combos