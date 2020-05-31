from django.urls import path

from . import views
app_name = 'tasks'
urlpatterns = [
    # ex: /tasks/
    path('', views.index, name='index'),
    # ex: /tasks/add
    path('add/', views.add, name='add'),
    # ex: /tasks/1
    path('<int:task_id>/', views.change_status, name='change'), ]
