__author__ = 'Aditya Gupta'

from django.dispatch import receiver
from forms_builder.forms.signals import form_valid
from forms_builder.forms.forms import FormForForm
from forms_builder.forms.models import Form
from django.http.request import HttpRequest

@receiver(form_valid)
def form_verification(sender=None, form=None, entry=None, **kwargs):
    request = sender
    x = form
    print x.form, type(x.form)
    if x.form == Form.objects.get(slug="user-profile-form"):
        print "yes", "-"*100
    #TO BE DONE
        #Feed entries into user database. The user can be obtained from request.user
        #Figure out redirection to homepage / rather than the "sent" page