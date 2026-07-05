from rest_framework import serializers
from .models import PeriodeAkademik

class PeriodeAkademikSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodeAkademik
        fields = '__all__'