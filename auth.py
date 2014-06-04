from django.contrib.auth.models import User
from openid.consumer.consumer import SUCCESS
from django.core.mail import mail_admins
from coursereview.models import UserProfile

class GoogleBackend:
    def authenticate(self, openid_response):
        allow = ['neha1541993@gmail.com', 'courserev@gmail.com']
        if openid_response is None:
            return None
        if openid_response.status != SUCCESS:
            return None

        google_email = openid_response.getSigned('http://openid.net/srv/ax/1.0',  'value.email')
        google_firstname = openid_response.getSigned('http://openid.net/srv/ax/1.0', 'value.firstname')
        google_lastname = openid_response.getSigned('http://openid.net/srv/ax/1.0', 'value.lastname')

        if ("@iiitd.ac.in" not in google_email and google_email not in allow):
            return None

        try:
            #user = User.objects.get(username=google_email)
            # Make sure that the e-mail is unique.
            user = User.objects.get(email=google_email)
        except User.DoesNotExist:
            user = User.objects.create_user(google_email, google_email, 'password')
            user.save()
            user = User.objects.get(username=google_email)

        p = UserProfile.objects.get_or_create(user= user,
                                              email= google_email,
                                              defaults= {'name': google_firstname + " " + google_lastname})[0]

        if p.email.split("@")[0][-1] in "0123456789": #Most likely a student
            print p.email.split("@")[0][-1]
            print p.email, p.email.split("@")[0]
            p.type = "S"
            print p.type
            print p.__dict__
        else:
            p.type = "P"
        p.save()
        return user


    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
