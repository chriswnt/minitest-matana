from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PeriodeAkademikViewSet

router = DefaultRouter()
router.register(r'periode-akademik', PeriodeAkademikViewSet)

urlpatterns = [
    path('', include(router.urls)),
]