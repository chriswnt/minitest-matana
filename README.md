Sip! Saya rombak total gaya bahasanya. Teks di bawah ini disusun dengan gaya *first-person* (sudut pandang pertama), seolah-olah Anda sendiri yang menceritakan hasil karya dan jerih payah Anda dalam membangun sistem ini. Gaya bahasanya profesional untuk dibaca dosen, namun tetap luwes layaknya seorang *developer* yang sedang mempresentasikan *project*-nya.

Silakan *copy* seluruh teks di bawah ini dan jadikan isi final dari file `README.md` Anda:

---

```markdown
# 🎓 Sistem Manajemen Periode Akademik - Matana University

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Django](https://img.shields.io/badge/Django-Backend-092E20?style=for-the-badge&logo=django)](https://www.djangoproject.com/)

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