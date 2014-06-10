__author__ = 'agupta1'

# users.views
from django.dispatch import receiver
from allauth.account.signals import user_logged_in

@receiver(user_logged_in)
def set_gender(sender, **kwargs):
    user = kwargs.pop('user')
    print kwargs
    print user
    #extra_data = user.socialaccount_set.filter(provider='google')[0].extra_data
    #gender = extra_data['gender']

    #if gender == 'male': # because the default is female.
    #    user.gender = 'male'
    user.save()
