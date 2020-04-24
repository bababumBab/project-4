from django.urls import path
from .views import ListView, DetailView, PlanListView

urlpatterns = [
    path('sneakers/', ListView.as_view()),
    path('sneakers/<int:pk>/', DetailView.as_view()),
    path('plan/', PlanListView.as_view())
]