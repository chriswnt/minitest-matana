---

# Sistem Manajemen Periode Akademik - Matana University

Halo! Ini adalah repositori untuk mini-project Full-Stack yang saya kembangkan khusus untuk mengelola data periode akademik di Matana University.

Di proyek ini, saya fokus membangun sistem yang bisa mengelola jadwal kuliah, rentang ujian (UTS & UAS), dan status semester, lengkap dengan pembatasan hak akses penggunanya.

### Fitur yang Saya Kembangkan:

* Simulasi Role-Based Access: Dropdown role di Navbar untuk tes hak akses (Admin Akademik = Full Access, Dosen/Staf = Read-Only).
* Data Locking: Data periode yang sudah ditutup tidak bisa diedit sembarangan untuk menjaga integritas data.
* Sorting & Filtering: Pencarian rentang tanggal dan urut abjad yang instan di tabel tanpa perlu refresh halaman.
* Export & Print: Data tabel bisa langsung di-download ke format CSV atau dicetak.
* Smart Pagination: Pembagian halaman tabel otomatis (5, 10, 25, atau 50 data per halaman).

### Tech Stack yang Digunakan:

* Frontend: React (Vite), TypeScript, Tailwind CSS
* Backend: Django REST Framework (Python), SQLite3

---

### Cara Menjalankan Proyek Secara Lokal

Pastikan Node.js dan Python sudah terinstal di komputer Anda. Ada dua bagian yang harus dinyalakan di terminal yang berbeda:

**Langkah 1: Menyalakan Backend (Database & API)**

1. Buka terminal (Git Bash/CMD), lalu masuk ke folder: backend
2. Aktifkan virtual environment. (Jika Git Bash ketik: source venv/bin/activate | Jika CMD ketik: venv\Scripts\activate.bat)
3. Jalankan server dengan mengetik perintah: python manage.py runserver
4. Biarkan terminal ini tetap terbuka.

**Langkah 2: Menyalakan Frontend (User Interface)**

1. Buka tab terminal baru.
2. Masuk ke folder: TEMPLATE-REACT
3. Ketik perintah: npm install (untuk mengunduh dependensi).
4. Ketik perintah: npm run dev (untuk menyalakan web).
5. Buka link localhost:5173 yang muncul di terminal lewat browser Anda.

---

### Catatan Tambahan (Troubleshooting)

* Jika error 404 saat membuka link backend, itu sangat wajar karena tidak ada halaman depan. Jalur API-nya ada di /api/periode-akademik/
* Jika web frontend terputus atau datanya tidak muncul, pastikan terminal backend sedang berjalan dan tidak dalam kondisi ter-pause (coba tekan tombol Enter di terminal backend tersebut).
