

```markdown
# Sistem Manajemen Periode Akademik - Matana University

Halo! Ini adalah repositori untuk mini-project Full-Stack yang saya kembangkan khusus untuk mengelola data periode akademik di Matana University.

Di proyek ini, saya fokus membangun sistem yang bisa mengelola jadwal kuliah, rentang ujian (UTS & UAS), dan status semester, lengkap dengan pembatasan hak akses penggunanya.

### Fitur yang Saya Kembangkan:

* **Simulasi Role-Based Access:** Dropdown role di Navbar untuk tes hak akses (Admin Akademik = Full Access, Dosen/Staf = Read-Only).
* **Data Locking:** Data periode yang sudah ditutup tidak bisa diedit sembarangan untuk menjaga integritas data.
* **Sorting & Filtering:** Pencarian rentang tanggal dan urut abjad yang instan di tabel tanpa perlu refresh halaman.
* **Export & Print:** Data tabel bisa langsung di-download ke format CSV atau dicetak.
* **Smart Pagination:** Pembagian halaman tabel otomatis (5, 10, 25, atau 50 data per halaman).

### Tech Stack yang Digunakan:

* **Frontend:** React (Vite), TypeScript, Tailwind CSS
* **Backend:** Django REST Framework (Python), SQLite3

---

### Cara Menjalankan Proyek Secara Lokal

Pastikan **Node.js** dan **Python** sudah terinstal di komputer Anda. Lakukan *clone* repositori ini, lalu buka terminal di dalam folder hasil *clone* tersebut.

Ada dua bagian yang harus dinyalakan melalui terminal yang berbeda:

#### Langkah 1: Menyalakan Backend (Database & API)

1. Buka terminal (Git Bash/CMD/PowerShell), lalu masuk ke folder backend:
   ```bash
   cd backend

```

2. Buat *virtual environment* baru:
```bash
python -m venv venv

```


3. Aktifkan *virtual environment*:
* Jika Git Bash / Mac / Linux: `source venv/bin/activate`
* Jika CMD: `venv\Scripts\activate.bat`
* Jika PowerShell: `.\venv\Scripts\Activate.ps1`


4. Instal semua dependensi Python yang dibutuhkan:
```bash
pip install -r requirements.txt

```


5. Lakukan migrasi untuk membuat tabel database bawaan:
```bash
python manage.py migrate

```


6. *(Opsional)* Jalankan file *seed* untuk mengisi data awal ke dalam database:
```bash
python seed_data.py

```


7. Jalankan server backend:
```bash
python manage.py runserver

```


8. Biarkan terminal ini tetap terbuka.

#### Langkah 2: Menyalakan Frontend (User Interface)

1. Buka tab terminal baru. Pastikan posisi terminal saat ini berada di **folder utama/root** proyek (sejajar dengan file `package.json`).
2. *(Opsional)* Jika diperlukan, gandakan file `.env.example` menjadi `.env`.
3. Ketik perintah berikut untuk mengunduh dependensi Node.js:
```bash
npm install

```


4. Ketik perintah berikut untuk menyalakan web UI:
```bash
npm run dev

```


5. Buka link (biasanya `http://localhost:5173`) yang muncul di terminal lewat browser Anda.

---

### Catatan Tambahan (Troubleshooting)

* Jika error `404 Not Found` saat membuka link backend, itu sangat wajar karena tidak ada halaman depan (*homepage*). Jalur API utamanya berada di `/api/periode-akademik/`.
* Jika web frontend terputus atau datanya tidak muncul, pastikan terminal backend sedang berjalan dan tidak dalam kondisi ter-pause (coba tekan tombol `Enter` di terminal backend tersebut).

```

```
