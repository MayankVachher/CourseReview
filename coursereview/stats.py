__author__ = 'Ankur'

from models import Review, Course, UserProfile
from collections import Counter

def getReviewCount():
    return len(Review.objects.all());

def getCoursesCount():
    return len(Course.objects.all())

def getCoursesReviewed():
    allReviews=Review.objects.all()

    cnt = Counter()
    for review in allReviews:
        cnt[review.course.courseID]+=1

    return len(cnt)

def getStudentAndProfCount():
    allUsers = UserProfile.objects.all()
    cnt = Counter()

    for user in allUsers:
        cnt[user.type]+=1

    return cnt.get('S'),cnt.get('P')

def getTopReviewers(n):
    allReviews=Review.objects.all()
    d = {}
    for x in allReviews:
        if x.reviewer in d:
            d[x.reviewer][0] += x.upvotes
            d[x.reviewer][1] += 1
        else:
            d[x.reviewer] = [x.upvotes, 1]
    votes = [[d[x][0], d[x][1], UserProfile.objects.get(user=x).name] for x in d.keys()]
    revs = [[d[x][1], d[x][0], UserProfile.objects.get(user=x).name] for x in d.keys()]
    votes.sort()
    revs.sort()
    print votes, revs
    if len(d) < n:
        n = len(d)
    return revs[-1:-1-n:-1], votes[-1:-1-n:-1]

#return top n Courses
def getTopCourses(n):
    allReviews=Review.objects.all()

    dict = {}

    for review in allReviews:
        reviewer=str(review.course.name)
        if(not dict.has_key(reviewer)):
            dict[reviewer]=review

    for x in dict.values():
        overall = [x.easeOfScoring, x.easeOfContent, x.industryApplication, x.interesting, x.workload, x.qualityTeaching, x.relevance, x.technicality, x.projectBurden]
        dict[str(x.course.name)] = round(1.0*sum(overall)/len(overall), 3)

    sortedCoursesList = [[dict[key],key] for key in dict.keys()]
    sortedCoursesList.sort()

    if len(dict)<n:
        print 'here', sortedCoursesList[::-1]
        return sortedCoursesList[::-1]
    else:
        print 'there',sortedCoursesList[0:n][::-1]
        return sortedCoursesList[0:n][::-1]