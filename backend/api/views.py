from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import PeriodeAkademik
from .serializers import PeriodeAkademikSerializer

class PeriodeAkademikViewSet(viewsets.ModelViewSet):
    queryset = PeriodeAkademik.objects.all()
    serializer_class = PeriodeAkademikSerializer
    
    # --- Tambahkan dua baris ini ke dalam ViewSet Anda ---
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'tanggal_awal_kuliah', 
        'tanggal_akhir_kuliah', 
        'tanggal_awal_uts', 
        'tanggal_awal_uas', 
        'status_aktif'
    ]