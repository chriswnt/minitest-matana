from django.contrib import admin
from .models import PeriodeAkademik

@admin.register(PeriodeAkademik)
class PeriodeAkademikAdmin(admin.ModelAdmin):
    list_display = ('kode_periode', 'nama_periode', 'tahun_ajaran', 'status_aktif')
    search_fields = ('kode_periode', 'nama_periode')