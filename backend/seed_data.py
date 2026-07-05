import os
import django

# Setup environment Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import PeriodeAkademik

print("Memproses pembuatan 45 data dummy secara otomatis...")

# Looping dari tahun 2010 sampai 2024
for start_year in range(2010, 2025):
    end_year = start_year + 1
    tahun_ajaran = f"{start_year}/{end_year}"

    # 1. Generate Semester Ganjil
    PeriodeAkademik.objects.get_or_create(
        kode_periode=f"{start_year}1",
        defaults={
            "tahun_ajaran": tahun_ajaran,
            "semester": "Ganjil",
            "nama_periode": f"Periode {tahun_ajaran} Ganjil",
            "nama_singkat": f"{str(start_year)[-2:]}1 (Ganjil)",
            "tanggal_awal_kuliah": f"{start_year}-09-01",
            "tanggal_akhir_kuliah": f"{end_year}-01-15",
            "tanggal_awal_uts": f"{start_year}-10-20",
            "tanggal_akhir_uts": f"{start_year}-10-25",
            "tanggal_awal_uas": f"{end_year}-01-05",
            "tanggal_akhir_uas": f"{end_year}-01-10",
            "total_prodi_terisi": 15,
            "status_aktif": False
        }
    )

    # 2. Generate Semester Genap
    PeriodeAkademik.objects.get_or_create(
        kode_periode=f"{start_year}2",
        defaults={
            "tahun_ajaran": tahun_ajaran,
            "semester": "Genap",
            "nama_periode": f"Periode {tahun_ajaran} Genap",
            "nama_singkat": f"{str(start_year)[-2:]}2 (Genap)",
            "tanggal_awal_kuliah": f"{end_year}-02-10",
            "tanggal_akhir_kuliah": f"{end_year}-06-25",
            "tanggal_awal_uts": f"{end_year}-04-05",
            "tanggal_akhir_uts": f"{end_year}-04-10",
            "tanggal_awal_uas": f"{end_year}-06-15",
            "tanggal_akhir_uas": f"{end_year}-06-20",
            "total_prodi_terisi": 15,
            "status_aktif": False
        }
    )

    # 3. Generate Semester Pendek
    PeriodeAkademik.objects.get_or_create(
        kode_periode=f"{start_year}3",
        defaults={
            "tahun_ajaran": tahun_ajaran,
            "semester": "Pendek",
            "nama_periode": f"Semester Pendek {tahun_ajaran}",
            "nama_singkat": f"{str(start_year)[-2:]}3 (Pendek)",
            "tanggal_awal_kuliah": f"{end_year}-07-05",
            "tanggal_akhir_kuliah": f"{end_year}-08-20",
            "tanggal_awal_uts": f"{end_year}-07-25",
            "tanggal_akhir_uts": f"{end_year}-07-28",
            "tanggal_awal_uas": f"{end_year}-08-15",
            "tanggal_akhir_uas": f"{end_year}-08-18",
            "total_prodi_terisi": 5,
            "status_aktif": False
        }
    )

print("✅ Berhasil! 45 data dummy telah dimasukkan ke database.")z