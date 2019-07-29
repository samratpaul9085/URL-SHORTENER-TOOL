from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('get-create-url', views.get_create_url),
    path('update-url', views.update_url),
    path('delete-url', views.delete_url)
]
