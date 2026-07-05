from django.db import models

class PeriodeAkademik(models.Model):
    # Kode Periode sebagai unik identifier
    kode_periode = models.CharField(max_length=20, unique=True)
    
    # Informasi Periode
    tahun_ajaran = models.CharField(max_length=20)
    semester = models.CharField(max_length=20)
    nama_periode = models.CharField(max_length=100)
    nama_singkat = models.CharField(max_length=50)
    
    # Tanggal Penting
    tanggal_awal_kuliah = models.DateField()
    tanggal_akhir_kuliah = models.DateField()
    tanggal_awal_uts = models.DateField(null=True, blank=True)
    tanggal_akhir_uts = models.DateField(null=True, blank=True)
    tanggal_awal_uas = models.DateField(null=True, blank=True)
    tanggal_akhir_uas = models.DateField(null=True, blank=True)
    
    # Status dan Info Tambahan
    total_prodi_terisi = models.IntegerField(default=0)
    status_aktif = models.BooleanField(default=False)
    
    # Field untuk fitur kunci periode 
    is_locked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nama_periode} ({self.tahun_ajaran})"