# Sistem Manajemen Periode Akademik - Matana University

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Django](https://img.shields.io/badge/Django-Backend-092E20?style=for-the-badge&logo=django)](https://www.djangoproject.com/)

## 📖 Daftar Isi

- [Overview](#overview)
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Struktur Proyek](#struktur-proyek)
- [Panduan Instalasi & Menjalankan Sistem](#panduan-instalasi--menjalankan-sistem)
- [Dokumentasi Komponen & Sistem](#dokumentasi-komponen--sistem)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

**Sistem Manajemen Periode Akademik** adalah aplikasi *Full-Stack* yang dirancang untuk mengelola data jadwal perkuliahan, rentang waktu ujian (UTS & UAS), serta status aktif semester di Matana University. 

Sistem ini memisahkan hak akses pengguna (*Role-Based Access Control*) dan menyediakan antarmuka yang responsif untuk melakukan operasi CRUD (Create, Read, Update, Delete) yang terhubung langsung dengan REST API dari *backend* Django.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---------|---------|
| 🔐 **Role-Based Access** | Simulasi hak akses dinamis melalui Navbar (*Admin Akademik* = Full Access, *Staf Admisi* & *Dosen* = Read-Only). |
| 🛡️ **Data Locking (Kunci Periode)** | Fitur pencegahan modifikasi atau penghapusan pada periode akademik yang sudah berlalu/dikunci. |
| 🔀 **Frontend Sorting** | Pengurutan data (Z-A / A-Z) berdasarkan Kode Periode, Nama, Tanggal, atau Status secara instan. |
| 📅 **Filter Rentang Tanggal** | Pencarian data spesifik berdasarkan batas waktu Awal/Akhir Kuliah, UTS, dan UAS. |
| 📄 **Export & Cetak** | Dukungan untuk mengunduh laporan data ke format **.CSV** dan fitur Cetak langsung dari browser. |
| 🔢 **Smart Pagination** | Sistem pembagian halaman data (5, 10, 25, 50 baris per halaman) yang dihitung secara dinamis. |
| 🔔 **Interactive UI** | Notifikasi proses (Sukses/Error/Loading) dan animasi transisi yang mulus menggunakan Framer Motion. |

---

## 🛠️ Tech Stack

### Frontend (User Interface)
- **React (Vite)** - Library UI utama untuk rendering komponen yang cepat.
- **TypeScript** - Memastikan keamanan tipe data (*type-safe*) selama pengembangan.
- **Tailwind CSS** - Framework styling berbasis utilitas untuk desain responsif.
- **Framer Motion** - Library untuk animasi transisi antar halaman dan komponen.
- **Lucide React** - Koleksi ikon SVG modern (Search, Print, Lock, dll).
- **React Router DOM** - Navigasi *client-side* antar halaman web.

### Backend (Server & API)
- **Python** - Bahasa pemrograman utama *backend*.
- **Django & Django REST Framework** - Framework penyedia arsitektur dan endpoint REST API.
- **SQLite3** - Database relasional bawaan untuk penyimpanan data periode.

---

## 📁 Struktur Proyek

Proyek ini menggunakan arsitektur monorepo sederhana yang memisahkan *backend* dan *frontend* di dalam satu folder root yang sama:

```text
minitestmatfor/
├── backend/                   # Direktori Backend (Django API)
│   ├── api/                   # Logic aplikasi (Views, Serializers, Models)
│   ├── core/                  # Konfigurasi utama Django (Settings, URLs)
│   ├── venv/                  # Virtual Environment Python (di-gitignore)
│   ├── db.sqlite3             # Database lokal (di-gitignore)
│   └── manage.py              # Entry point eksekusi Django
│
├── TEMPLATE-REACT/            # Direktori Frontend (Vite + React)
│   ├── src/
│   │   ├── components/        # Komponen UI (Navbar, Hero-Section, dll)
│   │   ├── lib/               # Konstanta & tipe data TypeScript
│   │   ├── App.tsx            # Root routing komponen
│   │   └── main.tsx           # Entry point React
│   ├── package.json           # Dependensi Node.js
│   └── tailwind.config.js     # Konfigurasi styling
│
└── .gitignore                 # File penyaring git (konfigurasi root)
🚀 Panduan Instalasi & Menjalankan Sistem
Pastikan komputer Anda sudah terinstal Node.js dan Python 3.x.

Langkah 1: Menjalankan Backend (Django)
Buka terminal (sangat disarankan menggunakan Git Bash atau CMD), lalu jalankan perintah berikut secara berurutan:

Bash
# 1. Masuk ke folder backend
cd backend

# 2. Aktifkan Virtual Environment
# Jika menggunakan Git Bash:
source venv/bin/activate
# Jika menggunakan CMD Windows:
venv\Scripts\activate.bat

# 3. Jalankan server database / API
python manage.py runserver
Backend akan berjalan di: http://127.0.0.1:8000/

Langkah 2: Menjalankan Frontend (React)
Buka tab Terminal Baru, biarkan terminal backend tetap berjalan di latar belakang.

Bash
# 1. Masuk ke folder frontend
cd TEMPLATE-REACT

# 2. Instal semua dependensi (jika belum)
npm install
# atau jika menggunakan pnpm: pnpm install

# 3. Jalankan server antarmuka
npm run dev
# atau: pnpm dev
Frontend akan berjalan di: http://localhost:5173/ (atau port lain yang disediakan Vite)

📚 Dokumentasi Komponen & Sistem
1. Sistem Hak Akses (Role-Based)
Akses sistem diatur sementara melalui dropdown di komponen <Navbar /> (src/components/navbar.tsx). Mengubah peran di sini akan langsung berdampak pada tombol aksi di halaman utama:

Admin Akademik: Dapat menambah, mengedit, dan menghapus data periode.

Staf Admisi / Dosen: Hanya dapat melihat jadwal dan melakukan filter data (View Only Mode). Akan muncul banner peringatan khusus.

2. Komponen Pengelolaan Data (hero-section.tsx)
Merupakan inti dari sistem ini. Memiliki 2 mode tampilan (View Mode):

"table": Menampilkan tabel daftar periode, filter pengurutan, pagination, dan tombol export.

"form": Menampilkan formulir input yang divalidasi, dengan dukungan checkbox untuk mengunci data (is_locked) atau mengatur status aktif (status_aktif).

3. Komunikasi API (CORS)
Frontend menembak data ke endpoint http://127.0.0.1:8000/api/periode-akademik/. Pastikan konfigurasi CORS_ALLOWED_ORIGINS di settings.py Django sudah mengizinkan port localhost dari Vite.

🐛 Troubleshooting
1. "Python is not recognized..." saat menyalakan backend
Pastikan Anda sudah menginstal Python dan mencentang opsi "Add Python to PATH" saat instalasi.

2. Error 404 saat membuka URL Backend 127.0.0.1:8000/ di browser
Ini adalah hal normal. Django tidak memiliki halaman depan (Root). API dapat diakses melalui jalur spesifik: http://127.0.0.1:8000/api/periode-akademik/.

3. Frontend gagal mengambil data (Koneksi Terputus)

Pastikan terminal backend (Django) sedang berjalan.

Periksa kembali apakah terminal backend tidak sedang dalam kondisi freeze atau paused (tekan Ctrl+C sekali atau tekan Enter di terminal backend untuk menyegarkan).