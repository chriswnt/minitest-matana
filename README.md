

---

```markdown
# 🎓 Sistem Manajemen Periode Akademik - Matana University


Halo! Ini adalah repositori untuk mini-project *Full-Stack* yang saya kembangkan khusus untuk mengelola data periode akademik di Matana University. 

Di proyek ini, saya fokus membangun sistem yang bisa mengelola jadwal kuliah, rentang ujian (UTS & UAS), dan status semester, lengkap dengan pembatasan hak akses penggunanya. Frontend-nya saya bangun menggunakan ekosistem React modern, dan untuk API backend-nya saya memercayakannya pada framework Django.

---

## ✨ Fitur yang Saya Kembangkan

- **🔐 Simulasi Role-Based Access:** Saya menambahkan dropdown role di bagian Navbar. Tujuannya agar kita bisa langsung mengetes perbandingan hak akses. Kalau login sebagai *Admin Akademik*, kita punya akses penuh (CRUD). Tapi kalau diganti ke *Staf Admisi* atau *Dosen*, sistem otomatis beralih ke mode *Read-Only* (hanya bisa melihat dan memfilter data).
- **🛡️ Data Locking (Kunci Periode):** Saya merancang logika agar data periode yang sudah lewat atau ditutup bisa dikunci. Data yang berstatus terkunci tidak akan bisa diedit atau dihapus secara sembarangan, demi menjaga integritas data historis kampus.
- **🔀 Sorting & Filtering Instan:** Fitur pencarian rentang tanggal awal/akhir kuliah dan pengurutan tabel (A-Z/Z-A). Semua pemrosesan filter ini saya letakkan di *frontend* agar respons perpindahan datanya sangat cepat tanpa perlu me-*refresh* browser.
- **📄 Export to CSV & Print:** Data jadwal yang ada di tabel bisa langsung di-download ke format `.csv` atau dicetak langsung dari browser.
- **🔢 Smart Pagination:** Agar tabel tidak kepanjangan saat datanya banyak, saya sudah menyematkan fitur pembagian halaman (bisa disesuaikan untuk menampilkan 5, 10, 25, atau 50 data per halaman).

---

## 🛠️ Tech Stack yang Saya Gunakan

**Area Frontend (User Interface):**
- **React (via Vite):** Biar proses *build* dan *hot-reload* saat *coding* terasa lebih kencang.
- **TypeScript:** Supaya kodingan lebih rapi dan minim *bug* akibat bentrok tipe data.
- **Tailwind CSS:** Untuk *styling* dan membuat tampilan *responsive* dengan cepat.
- **Framer Motion & Lucide React:** Sedikit sentuhan animasi transisi dan ikon modern supaya UI-nya tidak kaku.

**Area Backend (Server & API):**
- **Django & Django REST Framework (Python):** Fondasi utama saya dalam merancang REST API yang solid.
- **SQLite3:** Database relasional bawaan yang saya pakai agar *setup* lokalnya praktis tanpa perlu instalasi *engine* database tambahan.

---

## 🚀 Cara Menjalankan Proyek Ini Secara Lokal

Karena proyek ini *Full-Stack*, ada dua bagian yang harus dinyalakan di terminal yang berbeda. Pastikan **Node.js** dan **Python** sudah terinstal di komputer Anda!

### 1. Nyalakan Backend (Database & API)
Buka terminal (saya sangat menyarankan pakai **Git Bash** atau CMD), lalu ketik perintah ini secara berurutan:

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
# Masuk ke folder backend
cd backend

# Aktifkan Virtual Environment
source venv/bin/activate    # (Jika menggunakan Git Bash / Mac)
venv\Scripts\activate.bat   # (Jika menggunakan CMD Windows)

# Jalankan server API
python manage.py runserver

```

*Biarkan terminal ini terbuka. Backend sekarang sudah jalan di `http://127.0.0.1:8000/*`

### 2. Nyalakan Frontend (User Interface)

Buka tab terminal baru (agar terminal backend yang tadi tidak tertutup), lalu jalankan:

1. Buka tab terminal baru. Pastikan posisi terminal saat ini berada di **folder utama/root** proyek (sejajar dengan file `package.json`).
2. *(Opsional)* Jika diperlukan, gandakan file `.env.example` menjadi `.env`.
3. Ketik perintah berikut untuk mengunduh dependensi Node.js:
```bash
# Masuk ke folder frontend
cd TEMPLATE-REACT

# Instal semua dependensi (hanya perlu dilakukan saat pertama kali)
npm install

# Nyalakan web interface-nya
npm run dev

```

*Selesai! Buka browser dan sistem sudah bisa diakses di `http://localhost:5173/*`

---

## 💡 Catatan Tambahan (Troubleshooting)

* **Kok datanya nggak muncul / "Koneksi Terputus"?**
Coba cek terminal backend Django-nya. Biasanya terminal suka dalam kondisi *paused/freeze* karena terklik kursor. Cukup pencet tombol `Enter` atau tekan `Ctrl+C` sekali di terminal backend tersebut untuk membangunkannya lagi.
* **Kenapa URL backend 127.0.0.1:8000/ menampilkan Error 404 Not Found?**
Ini sangat normal! Di backend ini, saya sengaja tidak membuat halaman depan (*Root*). Jalur komunikasi datanya langsung saya arahkan ke *endpoint* spesifik untuk API, yaitu di `http://127.0.0.1:8000/api/periode-akademik/`.

```

```
