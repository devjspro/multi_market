from django.urls import path
from .views import RegisterView
from .views import CustomLoginView
urlpatterns = [
    path('register/', RegisterView.as_view()),
     path('login/', CustomLoginView.as_view()),
]