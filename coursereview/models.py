
import datetime

from django.contrib.auth.models import User
from django.db import models
from django import forms


class UserProfile(models.Model):
    user = models.OneToOneField(User, unique=True)
    email = models.CharField(max_length=40, blank=True, null=True)
    name = models.CharField(max_length=40, blank=True, null=True)
    typeChoice = ((u'S', u'Student'), (u'P', u'Professor'))
    type = models.CharField(max_length=1, choices=typeChoice)
    genderChoice = ((u'M', u'Male'), (u'F', u'Female'))
    sex = models.CharField(max_length=1, choices=genderChoice)
    dob = models.DateField(blank=True, null=True)
    #Foreign key to many reviews
    #Foreign key to many reviews (as faculty too)
    favouriteReviews = models.ManyToManyField('Review', related_name="favBy")
    watchList = models.ManyToManyField('Course', related_name="watcher")
    #reports
    #upvoted_revs
    #downvoted_revs
    #review_reviewer

class Faculty(models.Model):
    facultyID = models.CharField(max_length=6, blank="True", null="True")
    name = models.CharField(max_length=40, blank="True", null="True")
    email = models.CharField(max_length=40, blank="True", null="True")
    genderChoice = ((u'M', u'Male'), (u'P', u'Female'))
    sex = models.CharField(max_length=1, choices=genderChoice)
    #Foreign key to many reviews
    #Foreign key to many reviews (as faculty too)
    teaches = models.ManyToManyField('Course', related_name="taughtBy")



class Review(models.Model):
    reviewer = models.ForeignKey(User, related_name='reviewReviewer')
    course = models.ForeignKey('Course', blank=False)
    #please do not touch. DateField, not TimeField.
    createdTime = models.DateField()
    #Is the review anonymous?
    anon = models.BooleanField()
    yearChoices = tuple([(x, x) for x in range(2007, datetime.datetime.now().year + 1)])
    yearTaken = models.IntegerField(choices=yearChoices)
    semTaken = models.PositiveSmallIntegerField(default=1)
    creditsTaken = models.PositiveSmallIntegerField(choices=[(2,2), (4,4)], default=4)

    faculty = models.ForeignKey('Faculty', blank=False)
    upvotes = models.SmallIntegerField(default=0)
    upvoters = models.ManyToManyField(User, related_name="upvotedRevs")
    downvoters = models.ManyToManyField(User, related_name="downwotedRevs")
    reporter = models.ManyToManyField(User, related_name="reports")
    #fav_by

    easeOfScoring = models.PositiveSmallIntegerField(default=5)
    industryApplication = models.PositiveSmallIntegerField(default=5)
    interesting = models.PositiveSmallIntegerField(default=5)
    easeOfContent = models.PositiveSmallIntegerField(default=5)
    workload = models.PositiveSmallIntegerField(default=5)
    qualityTeaching = models.PositiveSmallIntegerField(default=5)
    relevance = models.PositiveSmallIntegerField(default=5)
    technicality = models.PositiveSmallIntegerField(default=5)
    projectBurden = models.PositiveSmallIntegerField(default=5)

    comment = models.TextField(max_length=5000, null="True")


class Course(models.Model):
    courseID = models.CharField(max_length=6, blank="True", null="True")
    name = models.CharField(max_length=256, blank="True", null="True")
    hasProject = models.BooleanField(default=False)
    #taught_by

    #Foreign key to many reviews


class CourseCombination(models.Model):
    favOf = models.ForeignKey(User)
    courses = models.ManyToManyField(Course)


class FeedbackForm(forms.Form):
    userName = forms.TextInput
    emailId = forms.TextInput
    feedbackType = forms.RadioSelect
    bugExpected = forms.Textarea
    bugCurrent = forms.Textarea
    bugSteps = forms.Textarea
    message = forms.Textarea
    say = forms.Textarea
    attachment = forms.FileField