---

```markdown
# 🎓 Sistem Manajemen Periode Akademik - Matana University

Halo! Ini adalah repositori untuk *mini-project Full-Stack* yang saya kembangkan khusus untuk mengelola data periode akademik.

Proyek ini dibangun menggunakan **React (Vite) + TypeScript** untuk sisi *Frontend* dan **Django REST Framework** untuk sisi *Backend*.

---

## 🚀 Panduan Instalasi (Local Development)

Untuk menjalankan aplikasi ini di komputer Anda, pastikan **Python** dan **Node.js** sudah terinstal. Aplikasi ini membutuhkan dua terminal yang berjalan secara bersamaan (satu untuk *Backend*, satu untuk *Frontend*).

### Langkah 1: Persiapan Awal
Buka terminal Anda, lalu lakukan *clone* repositori ini:
```bash
git clone [https://github.com/chriswnt/minitest-matana.git](https://github.com/chriswnt/minitest-matana.git)
cd minitest-matana

```

---

### Langkah 2: Menjalankan Backend (Database & API)

Tetap di terminal yang sama, ikuti urutan berikut secara ketat untuk menyalakan mesin *backend*:

1. Masuk ke direktori *backend*:
```bash
cd backend

```


2. Buat *virtual environment* baru agar instalasi pustaka tetap terisolasi:
```bash
python -m venv venv

```


3. Aktifkan *virtual environment* tersebut:
* **Windows (PowerShell):** `.\venv\Scripts\Activate.ps1`
* **Windows (CMD):** `venv\Scripts\activate`
* **Mac/Linux:** `source venv/bin/activate`


4. Instal semua dependensi yang dibutuhkan:
```bash
pip install -r requirements.txt

```


5. Lakukan migrasi untuk membangun struktur tabel *database* baru:
```bash
python manage.py migrate

```


6. **(Direkomendasikan)** Jalankan *script* ini untuk mengisi *database* dengan puluhan data *dummy* agar tabel tidak kosong saat dievaluasi:
```bash
python seed_data.py

```


7. Nyalakan server *backend*:
```bash
python manage.py runserver

```



> **PENTING:** Biarkan terminal ini tetap menyala. API sekarang sudah berjalan di `http://127.0.0.1:8000/`.

---

### Langkah 3: Menjalankan Frontend (User Interface)

Buka **Tab Terminal Baru**, pastikan posisi Anda berada di folder utama proyek (`minitest-matana`), lalu jalankan perintah ini:

1. Instal modul dependensi Node.js.
*(Catatan: Gunakan parameter `--legacy-peer-deps` untuk memastikan tidak ada konflik versi library internal dari React).*
```bash
npm install --legacy-peer-deps

```


2. Nyalakan server aplikasi *frontend*:
```bash
npm run dev

```



Aplikasi sekarang sudah siap digunakan! Silakan buka *browser* Anda dan akses tautan yang tertera di terminal (biasanya `http://localhost:5173/`).

```

```