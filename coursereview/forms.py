from django import forms
from django.forms import ModelForm
from models import Course, Review
from django_select2.widgets import Select2Widget


class CourseForm(forms.Form):
    all = Course.objects.all().values()
    idList = []
    idList = [('', '')] + [(course['courseID'], course['courseID'] + ' - ' + course['name']) for course in all]
    id = forms.ChoiceField(label=u'', choices=idList, required=True,
                           error_messages={'required': 'You forgot to choose a course !'},
                           widget=Select2Widget(attrs={'placeholder': 'Select a Course', 'class': 'choiceWidget'},
                                                select2_options={
                                                    'width': '600px',
                                                    'allowClear': 'True',
                                                }))

class reviewForm(ModelForm):
    class Meta:
        model = Review
        exclude = {'reviewer', 'createdTime', 'upvotes'}
        fields = {'course', 'anon', 'yearTaken', 'semTaken', 'creditsTaken', 'faculty',
                  'easeOfScoring', 'industryApplication', 'interesting', 'easeOfContent', 'workload', 'qualityTeaching', 'relevance',
                  'technicality', 'projectBurden', 'comment'}