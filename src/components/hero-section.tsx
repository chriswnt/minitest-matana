"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Printer,
  FileDown,
  CheckCircle,
  AlertCircle,
  Loader,
  Plus,
  ArrowLeft,
  Save,
  Trash2,
  Info,
  Lock,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AcademicRole } from "@/lib/types";

type Notification = {
  type: "success" | "error" | "loading" | null;
  message: string;
};

type SortKey =
  | "kode_periode"
  | "nama_periode"
  | "tanggal_awal_kuliah"
  | "status_aktif";

type SortDirection = "asc" | "desc";

type SortConfig = {
  key: SortKey;
  direction: SortDirection;
};

type AcademicPeriod = {
  id?: number;
  kode_periode?: string;
  tahun_ajaran?: string;
  semester?: string;
  nama_periode?: string;
  nama_singkat?: string;
  tanggal_awal_kuliah?: string;
  tanggal_akhir_kuliah?: string;
  tanggal_awal_uts?: string;
  tanggal_akhir_uts?: string;
  tanggal_awal_uas?: string;
  tanggal_akhir_uas?: string;
  total_prodi_terisi?: number;
  status_aktif?: boolean;
  is_locked?: boolean;
  [key: string]: string | number | boolean | null | undefined;
};

type AcademicPeriodResponse = AcademicPeriod[] | { results?: AcademicPeriod[] };

type PageHeroProps = {
  title: string;
  description: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const sortOptions: ReadonlyArray<{ value: SortKey; label: string }> = [
  { value: "kode_periode", label: "Nomor Kode Periode" },
  { value: "nama_periode", label: "Nama Periode" },
  { value: "tanggal_awal_kuliah", label: "Tanggal Awal Kuliah" },
  { value: "status_aktif", label: "Status Aktif" },
];

const sortDirections: ReadonlyArray<{ value: SortDirection; label: string }> = [
  { value: "desc", label: "Menurun (Terbaru ke Terlama / Z-A)" },
  { value: "asc", label: "Menaik (Terlama ke Terbaru / A-Z)" },
];

const formControlClassName =
  "native-light-control w-full border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500 disabled:opacity-70";

const filterControlClassName = `${formControlClassName} rounded-xl bg-white`;
const formInputClassName = `${formControlClassName} rounded-xl bg-slate-50`;
const compactSelectClassName =
  "native-light-control rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const isSortKey = (value: string): value is SortKey =>
  sortOptions.some((option) => option.value === value);

const isSortDirection = (value: string): value is SortDirection =>
  sortDirections.some((option) => option.value === value);

const normalizeSortValue = (
  value: AcademicPeriod[SortKey],
): string | number => {
  if (typeof value === "boolean") return Number(value);
  if (typeof value === "number") return value;
  return value ?? "";
};

function PageHero({ title, description }: PageHeroProps) {
  return (
    <>
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-slate-950 shadow-[0_28px_80px_rgba(15,23,42,0.28)] ring-1 ring-slate-900/10 print:hidden"
      >
        <img
          src="/professional-team-man-woman-business.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-800/80 to-emerald-700/55" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/70 to-transparent" />

        <div className="relative grid gap-8 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-10 lg:px-12">
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
                <img src="/icon-light-32x32.png" alt="" className="h-5 w-5" />
                Sistem Admin Akademik
              </div>

              <div className="max-w-3xl space-y-4">
                <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
                  {title}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-blue-50/90 md:text-lg">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-emerald-200" />
                Periode, ujian, dan status aktif
              </div>
            </div>
          </div>

          <div className="flex min-h-[280px] items-end justify-center overflow-visible md:justify-end">
            <img
              src="/asset2-removebg-preview.png"
              alt="Aset ilustrasi Matana"
              className="h-auto w-full max-w-[460px] object-contain drop-shadow-2xl md:max-w-[520px] lg:translate-x-4"
            />
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="hidden text-center print:block">
        <h1 className="text-3xl font-bold text-black">{title}</h1>
        <p className="mt-2 text-sm text-black">{description}</p>
      </motion.div>
    </>
  );
}

export default function PeriodeAkademikSection({ currentRole = "Admin Akademik" }: { currentRole?: AcademicRole }) {
  const [viewMode, setViewMode] = useState<"table" | "form">("table");
  const [editId, setEditId] = useState<number | null>(null);
  const [data, setData] = useState<AcademicPeriod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<Notification>({ type: null, message: "" });

  // === STATE UNTUK PAGINATION & SORTING ===
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [fetchTime, setFetchTime] = useState("0.0000");

  // State untuk Sorting
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "kode_periode", direction: "desc" });

  // === FILTER TANGGAL (Pencarian teks dihapus) ===
  const [filters, setFilters] = useState({
    tanggal_awal_kuliah: "", tanggal_akhir_kuliah: "", tanggal_awal_uts: "", tanggal_awal_uas: ""
  });

  const [formData, setFormData] = useState({
    kode_periode: "", tahun_ajaran: "", semester: "Ganjil", nama_periode: "", nama_singkat: "",
    tanggal_awal_kuliah: "", tanggal_akhir_kuliah: "", tanggal_awal_uts: "", tanggal_akhir_uts: "",
    tanggal_awal_uas: "", tanggal_akhir_uas: "", total_prodi_terisi: 0, status_aktif: true, is_locked: false,
  });

  const pageTitle = viewMode === "table" ? "Data Periode Akademik" : editId ? "Edit Periode Akademik" : "Tambah Periode Akademik";
  const pageDescription = viewMode === "table"
    ? "Kelola informasi jadwal perkuliahan, ujian, dan status aktif periode akademik Matana University."
    : "Silakan lengkapi formulir di bawah ini untuk menyimpan data ke dalam sistem.";

  const fetchData = async () => {
    setIsLoading(true);
    setNotification({ type: "loading", message: "Memuat data..." });
    const startTime = performance.now();

    const activeFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ""));
    const queryParams = new URLSearchParams(activeFilters).toString();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/periode-akademik/?${queryParams}`);
      if (response.ok) {
        const result = (await response.json()) as AcademicPeriodResponse;
        setData(Array.isArray(result) ? result : result.results || []);
        setNotification({ type: null, message: "" });
        setCurrentPage(1);
      } else {
        setNotification({ type: "error", message: "Gagal mengambil data dari server." });
      }
    } catch (error) {
      setNotification({ type: "error", message: "Koneksi ke server terputus." });
    } finally {
      const endTime = performance.now();
      setFetchTime(((endTime - startTime) / 1000).toFixed(4));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (viewMode === "table") fetchData();
  }, [viewMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // === LOGIKA SORTING (Diurutkan sebelum pagination) ===
  const sortedData = useMemo(() => {
    const sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // Handle null values
        const valA = normalizeSortValue(a[sortConfig.key]);
        const valB = normalizeSortValue(b[sortConfig.key]);

        if (valA < valB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // === LOGIKA PAGINATION (Menggunakan data yang sudah diurutkan) ===
  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  const currentData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus periode akademik ini?")) return;

    setNotification({ type: "loading", message: "Menghapus data..." });
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/periode-akademik/${id}/`, { method: "DELETE" });
      if (response.ok) {
        setNotification({ type: "success", message: "Data berhasil dihapus!" });
        setTimeout(() => { setEditId(null); setViewMode("table"); }, 1500);
      } else {
        setNotification({ type: "error", message: "Gagal menghapus data." });
      }
    } catch (error) {
      setNotification({ type: "error", message: "Koneksi ke server terputus." });
    }
  };

  const handleEdit = (item: AcademicPeriod) => {
    setFormData({
      kode_periode: item.kode_periode || "", tahun_ajaran: item.tahun_ajaran || "", semester: item.semester || "Ganjil",
      nama_periode: item.nama_periode || "", nama_singkat: item.nama_singkat || "", tanggal_awal_kuliah: item.tanggal_awal_kuliah || "",
      tanggal_akhir_kuliah: item.tanggal_akhir_kuliah || "", tanggal_awal_uts: item.tanggal_awal_uts || "", tanggal_akhir_uts: item.tanggal_akhir_uts || "",
      tanggal_awal_uas: item.tanggal_awal_uas || "", tanggal_akhir_uas: item.tanggal_akhir_uas || "", total_prodi_terisi: item.total_prodi_terisi || 0,
      status_aktif: item.status_aktif ?? true, is_locked: item.is_locked ?? false,
    });
    setEditId(item.id ?? null);
    setViewMode("form");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleSearch = () => fetchData();
  const handlePrint = () => window.print();

  const handleExport = () => {
    if (data.length === 0) {
      setNotification({ type: "error", message: "Tidak ada data untuk di-export." });
      return;
    }
    const headers = ["Kode Periode", "Nama Periode", "Tgl Awal Kuliah", "Tgl Akhir Kuliah", "Tgl Awal UTS", "Tgl Awal UAS", "Status Aktif", "Terkunci"];
    const csvRows = sortedData.map((item) => [
      item.kode_periode, `"${item.nama_periode}"`, item.tanggal_awal_kuliah || "-", item.tanggal_akhir_kuliah || "-", item.tanggal_awal_uts || "-", item.tanggal_awal_uas || "-", item.status_aktif ? "Aktif" : "Tidak Aktif", item.is_locked ? "Ya" : "Tidak"
    ].join(","));
    const blob = new Blob([[headers.join(","), ...csvRows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Laporan_Periode_Akademik.csv";
    link.click();
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification({ type: "loading", message: "Menyimpan data..." });
    const url = editId ? `http://127.0.0.1:8000/api/periode-akademik/${editId}/` : "http://127.0.0.1:8000/api/periode-akademik/";

    try {
      const response = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({ type: "success", message: editId ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!" });
        setEditId(null);
        setTimeout(() => setViewMode("table"), 1500);
      } else {
        setNotification({ type: "error", message: "Gagal menyimpan. Cek kembali isian Anda." });
      }
    } catch (error) {
      setNotification({ type: "error", message: "Gagal terhubung ke server." });
    }
  };

  const handleCancel = () => {
      setFormData({
        kode_periode: "", tahun_ajaran: "", semester: "Ganjil", nama_periode: "", nama_singkat: "",
        tanggal_awal_kuliah: "", tanggal_akhir_kuliah: "", tanggal_awal_uts: "", tanggal_akhir_uts: "",
        tanggal_awal_uas: "", tanggal_akhir_uas: "", total_prodi_terisi: 0, status_aktif: true, is_locked: false
      });
      setEditId(null);
      setViewMode("table");
  }

  return (
    <section className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_42%,#f6f8fb_100%)] px-4 pb-16 pt-28 text-slate-900 sm:px-6 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <PageHero title={pageTitle} description={pageDescription} />

          <AnimatePresence>
            {notification.type && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className={`mx-auto flex w-fit items-center justify-center gap-3 rounded-2xl px-5 py-4 shadow-sm print:hidden ${
                  notification.type === "success" ? "border border-emerald-200 bg-emerald-50 text-emerald-900" : notification.type === "error" ? "border border-rose-200 bg-rose-50 text-rose-900" : "border border-blue-200 bg-blue-50 text-blue-900"
                }`}
              >
                {notification.type === "success" && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                {notification.type === "error" && <AlertCircle className="h-5 w-5 text-rose-600" />}
                {notification.type === "loading" && <Loader className="h-5 w-5 animate-spin text-blue-600" />}
                <p className="text-sm font-semibold">{notification.message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ======================= MODE TABEL ======================= */}
          {viewMode === "table" && (
            <motion.div variants={itemVariants} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

              {currentRole === "Admin Akademik" && (
                <div className="flex justify-end print:hidden">
                   <button onClick={() => { setEditId(null); setViewMode("form"); }} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200">
                      <Plus size={18} /> Tambah Data
                   </button>
                </div>
              )}

              {/* === KOTAK FILTER & SORTING BARU === */}
              <div className="print:hidden rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.08)] ring-1 ring-white md:p-7">
                <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                      <Search className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Filter Periode Akademik</h2>
                      <p className="text-sm text-slate-500">Urutkan data dan saring berdasarkan rentang tanggal.</p>
                    </div>
                  </div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <GraduationCap className="h-4 w-4 text-blue-700" />
                    {data.length} Data
                  </div>
                </div>

                {/* Baris 1: Pengurutan (Sorting) */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Urutkan Berdasarkan</label>
                    <select
                      value={sortConfig.key}
                      onChange={(e) => {
                        if (isSortKey(e.target.value)) {
                          setSortConfig({ ...sortConfig, key: e.target.value });
                        }
                      }}
                      className={`${filterControlClassName} cursor-pointer`}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Arah Urutan</label>
                    <select
                      value={sortConfig.direction}
                      onChange={(e) => {
                        if (isSortDirection(e.target.value)) {
                          setSortConfig({ ...sortConfig, direction: e.target.value });
                        }
                      }}
                      className={`${filterControlClassName} cursor-pointer`}
                    >
                      {sortDirections.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Baris 2: Filter Rentang Tanggal (Tetap dipertahankan) */}
                <div className="mt-5 grid grid-cols-1 gap-4 border-t border-slate-100 pt-5 md:grid-cols-2 lg:grid-cols-4">
                  <div><label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Awal Kuliah</label><input type="date" name="tanggal_awal_kuliah" value={filters.tanggal_awal_kuliah} onChange={handleFilterChange} className={filterControlClassName} /></div>
                  <div><label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Akhir Kuliah</label><input type="date" name="tanggal_akhir_kuliah" value={filters.tanggal_akhir_kuliah} onChange={handleFilterChange} className={filterControlClassName} /></div>
                  <div><label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Awal UTS</label><input type="date" name="tanggal_awal_uts" value={filters.tanggal_awal_uts} onChange={handleFilterChange} className={filterControlClassName} /></div>
                  <div><label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Awal UAS</label><input type="date" name="tanggal_awal_uas" value={filters.tanggal_awal_uas} onChange={handleFilterChange} className={filterControlClassName} /></div>
                </div>

                {/* Tombol Aksi */}
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <button onClick={handleSearch} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"><Search className="h-4 w-4" /> Filter Tanggal</button>
                  <button onClick={handlePrint} className="inline-flex items-center gap-2 rounded-xl bg-slate-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-700/15 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"><Printer className="h-4 w-4" /> Cetak</button>
                  {currentRole !== "Staf Admisi" && (
                     <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"><FileDown className="h-4 w-4" /> Export CSV</button>
                  )}
                </div>
              </div>

              {/* === BANNER INFORMASI ROLE === */}
              {currentRole === "Staf Admisi" && (
                <div className="flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 text-sm text-blue-900 shadow-sm print:hidden">
                  <Info className="h-5 w-5 flex-shrink-0 text-blue-600" />
                  <p><strong>Mode Staf Admisi:</strong> Anda dalam mode <em>Read-Only</em>. Gunakan jadwal ini sebagai referensi layanan pendaftaran mahasiswa baru.</p>
                </div>
              )}

              {currentRole === "Dosen" && (
                <div className="flex items-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/80 p-4 text-sm text-indigo-900 shadow-sm print:hidden">
                  <Info className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                  <p><strong>Mode Dosen:</strong> Anda dalam mode <em>Read-Only</em>. Gunakan jadwal ini sebagai referensi batas waktu perkuliahan dan input nilai.</p>
                </div>
              )}

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-800 text-xs uppercase tracking-wider text-white">
                      <tr>
                        <th className="px-5 py-4 font-bold">Kode</th>
                        <th className="px-5 py-4 font-bold">Nama Periode</th>
                        <th className="px-5 py-4 font-bold">Awal Kuliah</th>
                        <th className="px-5 py-4 font-bold">Akhir Kuliah</th>
                        <th className="px-5 py-4 font-bold">Awal UTS</th>
                        <th className="px-5 py-4 font-bold">Awal UAS</th>
                        <th className="px-5 py-4 text-center font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {isLoading ? (
                        <tr><td colSpan={7} className="p-12 text-center text-slate-600"><Loader className="mx-auto mb-3 h-8 w-8 animate-spin text-blue-600" /> Memuat data...</td></tr>
                      ) : currentData.length > 0 ? (
                        currentData.map((item, index) => (
                          <tr key={item.id || index} className="bg-white transition-colors hover:bg-blue-50/70">
                            <td className="flex items-center gap-2 px-5 py-4 font-medium">
                                {item.is_locked && (
                                  <span title="Data Terkunci" className="inline-flex">
                                    <Lock className="h-4 w-4 animate-pulse text-rose-500" />
                                  </span>
                                )}

                                {currentRole === "Admin Akademik" ? (
                                  <button onClick={() => handleEdit(item)} className={`${item.is_locked ? "text-slate-600" : "text-blue-700"} font-extrabold hover:text-blue-900 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded`}>
                                      {item.kode_periode}
                                  </button>
                                ) : (
                                  <span className="font-extrabold text-slate-700">{item.kode_periode}</span>
                                )}
                            </td>
                            <td className="px-5 py-4 text-sm font-medium text-slate-800">{item.nama_periode}</td>
                            <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{item.tanggal_awal_kuliah || "-"}</td>
                            <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{item.tanggal_akhir_kuliah || "-"}</td>
                            <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{item.tanggal_awal_uts || "-"}</td>
                            <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{item.tanggal_awal_uas || "-"}</td>
                            <td className="px-5 py-4 text-center">
                              {item.status_aktif ? (
                                 <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                                   <CheckCircle className="h-4 w-4" /> Aktif
                                 </span>
                              ) : (
                                 <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600 ring-1 ring-rose-200">Nonaktif</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan={7} className="p-12 text-center text-slate-500">Tidak ada data ditemukan.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* === PAGINATION === */}
                {!isLoading && data.length > 0 && (
                  <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50/90 p-4 text-sm text-slate-600 print:hidden md:flex-row">
                    <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 font-semibold text-blue-900">
                      Hal {currentPage}/{totalPages} ({data.length} data, {fetchTime} detik)
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={itemsPerPage}
                        onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        className={`${compactSelectClassName} cursor-pointer`}
                      >
                        <option value={5}>5 baris</option>
                        <option value={10}>10 baris</option>
                        <option value={25}>25 baris</option>
                        <option value={50}>50 baris</option>
                      </select>
                    </div>

                    <div className="flex items-center rounded-xl shadow-sm">
                      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="rounded-l-xl border border-slate-200 bg-white px-3 py-2 font-bold text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">&laquo;</button>
                      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="border-y border-r border-slate-200 bg-white px-3 py-2 font-bold text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">&lsaquo;</button>

                      {getPageNumbers().map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`border-y border-r border-slate-200 px-4 py-2 font-bold transition ${currentPage === page ? 'bg-blue-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                          {page}
                        </button>
                      ))}

                      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="border-y border-slate-200 bg-white px-3 py-2 font-bold text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">&rsaquo;</button>
                      <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="rounded-r-xl border-y border-r border-slate-200 bg-white px-3 py-2 font-bold text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">&raquo;</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ======================= MODE FORM ======================= */}
          {viewMode === "form" && (
            <motion.div variants={itemVariants} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] md:p-8">

               {formData.is_locked && (
                 <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
                   <Lock className="h-5 w-5 text-rose-600" />
                   <p><strong>Periode Terkunci!</strong> Lepas centang pada "Kunci Periode" di bagian bawah form jika Anda perlu mengubah tanggal atau menghapus data ini.</p>
                 </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-6">

                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div><label className="mb-1 block text-sm font-bold text-slate-700">Kode Periode *</label><input required type="text" name="kode_periode" value={formData.kode_periode} onChange={handleFormChange} disabled={formData.is_locked} className={formInputClassName} /></div>
                        <div><label className="mb-1 block text-sm font-bold text-slate-700">Tahun Ajaran *</label><input required type="text" name="tahun_ajaran" value={formData.tahun_ajaran} onChange={handleFormChange} disabled={formData.is_locked} placeholder="e.g. 2025/2026" className={formInputClassName} /></div>
                        <div><label className="mb-1 block text-sm font-bold text-slate-700">Semester *</label><select name="semester" value={formData.semester} onChange={handleFormChange} disabled={formData.is_locked} className={`${formInputClassName} cursor-pointer`}><option value="Ganjil">Ganjil</option><option value="Genap">Genap</option><option value="Pendek">Pendek</option></select></div>
                        <div><label className="mb-1 block text-sm font-bold text-slate-700">Nama Periode *</label><input required type="text" name="nama_periode" value={formData.nama_periode} onChange={handleFormChange} disabled={formData.is_locked} className={formInputClassName} /></div>
                        <div><label className="mb-1 block text-sm font-bold text-slate-700">Nama Singkat</label><input type="text" name="nama_singkat" value={formData.nama_singkat} onChange={handleFormChange} disabled={formData.is_locked} className={formInputClassName} /></div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div><label className="mb-1 block text-sm font-bold text-slate-700">Tgl Awal Kuliah</label><input type="date" name="tanggal_awal_kuliah" value={formData.tanggal_awal_kuliah} onChange={handleFormChange} disabled={formData.is_locked} className={formInputClassName} /></div>
                            <div><label className="mb-1 block text-sm font-bold text-slate-700">Tgl Akhir Kuliah</label><input type="date" name="tanggal_akhir_kuliah" value={formData.tanggal_akhir_kuliah} onChange={handleFormChange} disabled={formData.is_locked} className={formInputClassName} /></div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div><label className="mb-1 block text-sm font-bold text-slate-700">Tgl Awal UTS</label><input type="date" name="tanggal_awal_uts" value={formData.tanggal_awal_uts} onChange={handleFormChange} disabled={formData.is_locked} className={formInputClassName} /></div>
                            <div><label className="mb-1 block text-sm font-bold text-slate-700">Tgl Akhir UTS</label><input type="date" name="tanggal_akhir_uts" value={formData.tanggal_akhir_uts} onChange={handleFormChange} disabled={formData.is_locked} className={formInputClassName} /></div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div><label className="mb-1 block text-sm font-bold text-slate-700">Tgl Awal UAS</label><input type="date" name="tanggal_awal_uas" value={formData.tanggal_awal_uas} onChange={handleFormChange} disabled={formData.is_locked} className={formInputClassName} /></div>
                            <div><label className="mb-1 block text-sm font-bold text-slate-700">Tgl Akhir UAS</label><input type="date" name="tanggal_akhir_uas" value={formData.tanggal_akhir_uas} onChange={handleFormChange} disabled={formData.is_locked} className={formInputClassName} /></div>
                        </div>

                        <div className="mt-2 flex flex-col gap-3 border-t border-slate-100 pt-4">
                           <div className="flex items-center gap-3">
                             <input type="checkbox" name="status_aktif" id="status_aktif" checked={formData.status_aktif} onChange={handleFormChange} disabled={formData.is_locked} className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-60" />
                             <label htmlFor="status_aktif" className="cursor-pointer text-sm font-bold text-slate-700">Set sebagai Periode Aktif</label>
                           </div>
                           <div className="flex items-center gap-3">
                             <input type="checkbox" name="is_locked" id="is_locked" checked={formData.is_locked} onChange={handleFormChange} className="h-5 w-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                             <label htmlFor="is_locked" className="flex cursor-pointer items-center gap-1 text-sm font-bold text-rose-600"><Lock className="h-4 w-4"/> Kunci Periode (Cegah modifikasi data di masa depan)</label>
                           </div>
                        </div>
                    </div>
                 </div>

                 <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
                    <div>
                       {editId && (
                           <button type="button" onClick={() => handleDelete(editId)} disabled={formData.is_locked} className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-5 py-3 font-bold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50">
                              <Trash2 className="h-4 w-4" /> Hapus Data
                           </button>
                       )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={handleCancel} className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-slate-600 transition hover:bg-slate-100">
                           <ArrowLeft className="h-4 w-4" /> Batal
                        </button>
                        <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-8 py-3 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800">
                           <Save className="h-4 w-4" /> {editId ? "Update Data" : "Simpan Data"}
                        </button>
                    </div>
                 </div>
               </form>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}
