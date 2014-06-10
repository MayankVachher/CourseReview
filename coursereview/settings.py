# Django settings for coursereview project.
import os
from dev_file import *
DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    ('Aditya Gupta', 'Aditya11009@iiitd.ac.in'),
)

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
STATIC_URL = '/static/'

MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': db_engine,
        'NAME': db_name,
        'USER': db_user,
        'PASSWORD': db_password,
        'HOST': db_host,
        'PORT': db_port,			                      # Set to empty string for default.
    }
}

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = []

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'Asia/Kolkata'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/var/www/example.com/media/"
MEDIA_ROOT = ''

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://example.com/media/", "http://media.example.com/"
MEDIA_URL = ''

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/var/www/example.com/static/"
STATIC_ROOT = '/static/'

# URL prefix for static files.
# Example: "http://example.com/static/", "http://static.example.com/"
STATIC_URL = '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(PROJECT_ROOT, '../static'),
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    #    'django.contrib.staticfiles.finders.DefaultStorageFinder',

)

# Make this unique, and don't share it with anybody.
SECRET_KEY = secret_key

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
    # 'django.template.loaders.eggs.Loader',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    # other context processors....
    'django.core.context_processors.static',
    'django.core.context_processors.request',
    'django.core.context_processors.debug',

    'django.contrib.auth.context_processors.auth',
    #'django.contrib.messages.context_processors.messages',
    # allauth specific context processors
    "allauth.account.context_processors.account",
    "allauth.socialaccount.context_processors.socialaccount",
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'coursereview.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'coursereview.wsgi.application'

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(os.path.dirname(__file__), '').replace('\\', '/'),
)


AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
    # auth.GoogleBackend', NO LONGER USED, OPENID
    #'social.backends.google.GoogleOAuth2',
)
INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    'django.contrib.admindocs',
    #'books',
    'coursereview',
    #'django_openid_auth', WAS BEING USED EARLIER
    # DO NOT REMOVE
    #'forms_builder.forms',
    'django_select2',
    'south',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
)

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
            },
        }
}



SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = social_auth_google_oauth2_key
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = social_auth_google_oauth2_secret

#ACCOUNT_USER_MODEL_USERNAME_FIELD = None
#ACCOUNT_USER_MODEL_EMAIL_FIELD = None

LOGIN_REDIRECT_URL = '/home/'
AUTH_USER_MODEL = 'coursereview.UserProfile'

"""
# Unused Login Parameters
AUTH_USER_MODEL = 'coursereview.UserProfile'
SOCIAL_AUTH_USER_MODEL = 'coursereview.UserProfile'
# LOGIN_REDIRECT_URL = '/home/'
# SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/home/'



# Auth Details
SOCIAL_AUTH_LOGIN_URL = '/login/'
SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/logged-in/'
#Used to redirect the user once the auth process ended successfully. The value of ?next=/foo is used if it was present
SOCIAL_AUTH_LOGIN_ERROR_URL = '/login-error/'
#URL where the user will be redirected in case of an error
SOCIAL_AUTH_LOGIN_URL = '/login-url/'
#Is used as a fallback for LOGIN_ERROR_URL
SOCIAL_AUTH_NEW_USER_REDIRECT_URL = '/new-users-redirect-url/'
#Used to redirect new registered users, will be used in place of SOCIAL_AUTH_LOGIN_REDIRECT_URL if defined.
SOCIAL_AUTH_NEW_ASSOCIATION_REDIRECT_URL = '/new-association-redirect-url/'
#Like SOCIAL_AUTH_NEW_USER_REDIRECT_URL but for new associated accounts (user is already logged in). Used in place of SOCIAL_AUTH_LOGIN_REDIRECT_URL
SOCIAL_AUTH_DISCONNECT_REDIRECT_URL = '/account-disconnected-redirect-url/'
#The user will be redirected to this URL when a social account is disconnected
SOCIAL_AUTH_INACTIVE_USER_URL = '/inactive-user/'
#Inactive users can be redirected to this URL when trying to authenticate.
"""
