from django.urls import path

from . import views

app_name = 'core'

urlpatterns = [
    path('', views.home, name='home'),
    path('green-drive/', views.green_drive, name='green_drive'),
    path('impact/', views.impact, name='impact'),
    path('marathon/', views.marathon, name='marathon'),
    path('programs/usafi/', views.usafi, name='usafi'),
    path('programs/oqota/', views.oqota, name='oqota'),
    path('programs/ndakaini-source-trek/', views.source_trek, name='source_trek'),
    path('newsletter/subscribe/', views.newsletter_subscribe, name='newsletter_subscribe'),
]
