from django.urls import path

from . import views

app_name = 'core'

urlpatterns = [
    path('', views.home, name='home'),
     path('green-drive/', views.green_drive, name='green_drive'),
    path('impact/', views.impact, name='impact'),
    path('marathon/', views.marathon, name='marathon'),
]
