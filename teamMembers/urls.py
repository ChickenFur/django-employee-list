from django.urls import path
from . import views

urlpatterns = [
  path('', views.getData),
  path('add/', views.postData),  
  path('put/', views.putData),
  path('delete/<int:id>/', views.deleteData, name='delete-data'),
  path('<int:id>/', views.getTeamMemberById),
]