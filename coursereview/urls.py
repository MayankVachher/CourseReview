from django.conf.urls import patterns, include, url
from django.contrib import admin

from coursereview.views import *

from coursereview.views import home, faq, contact, feedbacks, \
    user, thanks, review, profile, courses, features, reviewthanks,\
    allreviews, seereview, statistics, vote, report, seecourse, watch,\
    addCourses, allCourses
#    select2, course_selector



admin.autodiscover()


urlpatterns = patterns('',
                       url(r'^$', home),
                       url(r'^review/$', review),
                       #url(r'^google/login/$', 'django_openid_auth.views.login_begin', name='openid-login'),
                       #url(r'^google/login-complete/$', 'django_openid_auth.views.login_complete', name='openid-complete'),
                       #url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}, name='logout'),
                       url('', include('social.apps.django_app.urls', namespace='social')),
                       url('', include('django.contrib.auth.urls', namespace='auth')),
                       url(r'^faq/$', faq),
                       url(r'^features/$', features),
                       url(r'^feedbacks/$', feedbacks),
                       url(r'^home/$', user),
                       url(r'^thanks/$', thanks),
                       url(r'^rthanks/$', reviewthanks),
                       url(r'^courses/$', courses),
                       url(r'^contact/$', contact),
                       url(r'^admin/', include(admin.site.urls), ),
                       url(r'^profile/', profile),
                       url(r'^allreviews/', allreviews),
                       url(r'^seereview/$', seereview),
                       url(r'^seecourse/$', seecourse),
                       url(r'^statistics/$', statistics),
                       url(r'^vote/$', vote),
                       url(r'^report/$', report),
                       url(r'^watch/$', watch),
                       url(r'^watchlist-addCourses/$', addCourses),
                       url(r'^watchlist-allCourses/$', allCourses),
                       url(r'^ttable/$', test),
)

