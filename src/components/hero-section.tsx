"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Search, Printer, FileDown, CheckCircle, AlertCircle, Loader, Plus, ArrowLeft, Save, Trash2, Info, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Notification = {
  type: "success" | "error" | "loading" | null;
  message: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PeriodeAkademikSection({ currentRole = "Admin Akademik" }: { currentRole?: string }) {
  const [viewMode, setViewMode] = useState<"table" | "form">("table");
  const [editId, setEditId] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<Notification>({ type: null, message: "" });
  
  // === STATE UNTUK PAGINATION & SORTING ===
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [fetchTime, setFetchTime] = useState("0.0000");
  
  // State untuk Sorting
  const [sortConfig, setSortConfig] = useState({ key: "kode_periode", direction: "desc" });

  // === FILTER TANGGAL (Pencarian teks dihapus) ===
  const [filters, setFilters] = useState({
    tanggal_awal_kuliah: "", tanggal_akhir_kuliah: "", tanggal_awal_uts: "", tanggal_awal_uas: ""
  });

  const [formData, setFormData] = useState({
    kode_periode: "", tahun_ajaran: "", semester: "Ganjil", nama_periode: "", nama_singkat: "",
    tanggal_awal_kuliah: "", tanggal_akhir_kuliah: "", tanggal_awal_uts: "", tanggal_akhir_uts: "",
    tanggal_awal_uas: "", tanggal_akhir_uas: "", total_prodi_terisi: 0, status_aktif: true, is_locked: false,
  });

  const fetchData = async () => {
    setIsLoading(true);
    setNotification({ type: "loading", message: "Memuat data..." });
    const startTime = performance.now();

    const activeFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ""));
    const queryParams = new URLSearchParams(activeFilters).toString();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/periode-akademik/?${queryParams}`);
      if (response.ok) {
        const result = await response.json();
        setData(result.results || result);
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
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // Handle null values
        const valA = a[sortConfig.key] || "";
        const valB = b[sortConfig.key] || "";
        
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
    let end = Math.min(totalPages, start + 4);
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

  const handleEdit = (item: any) => {
    setFormData({
      kode_periode: item.kode_periode || "", tahun_ajaran: item.tahun_ajaran || "", semester: item.semester || "Ganjil",
      nama_periode: item.nama_periode || "", nama_singkat: item.nama_singkat || "", tanggal_awal_kuliah: item.tanggal_awal_kuliah || "",
      tanggal_akhir_kuliah: item.tanggal_akhir_kuliah || "", tanggal_awal_uts: item.tanggal_awal_uts || "", tanggal_akhir_uts: item.tanggal_akhir_uts || "",
      tanggal_awal_uas: item.tanggal_awal_uas || "", tanggal_akhir_uas: item.tanggal_akhir_uas || "", total_prodi_terisi: item.total_prodi_terisi || 0,
      status_aktif: item.status_aktif ?? true, is_locked: item.is_locked ?? false,
    });
    setEditId(item.id);
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
    const csvRows = sortedData.map((item: any) => [
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
    <section className="min-h-screen bg-white pt-32 pb-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-blue-600 leading-tight mb-4 print:text-black print:text-3xl">
              {viewMode === "table" ? "Data Periode Akademik" : editId ? "Edit Periode Akademik" : "Tambah Periode Akademik"}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed print:hidden">
              {viewMode === "table" ? "Kelola informasi jadwal perkuliahan, ujian, dan status aktif periode akademik Matana University." : "Silakan lengkapi formulir di bawah ini untuk menyimpan data ke dalam sistem."}
            </p>
          </motion.div>

          <AnimatePresence>
            {notification.type && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className={`print:hidden p-4 rounded-2xl flex items-center justify-center gap-3 w-fit mx-auto ${
                  notification.type === "success" ? "bg-green-50 border border-green-200" : notification.type === "error" ? "bg-red-50 border border-red-200" : "bg-blue-50 border border-blue-200"
                }`}
              >
                {notification.type === "success" && <CheckCircle className="w-5 h-5 text-green-600" />}
                {notification.type === "error" && <AlertCircle className="w-5 h-5 text-red-600" />}
                {notification.type === "loading" && <Loader className="w-5 h-5 text-blue-600 animate-spin" />}
                <p className="text-sm font-medium text-gray-800">{notification.message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ======================= MODE TABEL ======================= */}
          {viewMode === "table" && (
            <motion.div variants={itemVariants} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              
              {currentRole === "Admin Akademik" && (
                <div className="flex justify-end mb-4 print:hidden">
                   <button onClick={() => { setEditId(null); setViewMode("form"); }} className="bg-blue-800 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-900 transition-colors shadow-md font-semibold">
                      <Plus size={18} /> Tambah Data
                   </button>
                </div>
              )}

              {/* === KOTAK FILTER & SORTING BARU === */}
              <div className="print:hidden bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm mb-8 space-y-4">
                
                {/* Baris 1: Pengurutan (Sorting) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200 pb-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">Urutkan Berdasarkan</label>
                    <select 
                      value={sortConfig.key} 
                      onChange={(e) => setSortConfig({ ...sortConfig, key: e.target.value })} 
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                    >
                      <option value="kode_periode">Nomor Kode Periode</option>
                      <option value="nama_periode">Nama Periode</option>
                      <option value="tanggal_awal_kuliah">Tanggal Awal Kuliah</option>
                      <option value="status_aktif">Status Aktif</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">Arah Urutan</label>
                    <select 
                      value={sortConfig.direction} 
                      onChange={(e) => setSortConfig({ ...sortConfig, direction: e.target.value })} 
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                    >
                      <option value="desc">Menurun (Terbaru ke Terlama / Z-A)</option>
                      <option value="asc">Menaik (Terlama ke Terbaru / A-Z)</option>
                    </select>
                  </div>
                </div>

                {/* Baris 2: Filter Rentang Tanggal (Tetap dipertahankan) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">Awal Kuliah</label><input type="date" name="tanggal_awal_kuliah" value={filters.tanggal_awal_kuliah} onChange={handleFilterChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">Akhir Kuliah</label><input type="date" name="tanggal_akhir_kuliah" value={filters.tanggal_akhir_kuliah} onChange={handleFilterChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">Awal UTS</label><input type="date" name="tanggal_awal_uts" value={filters.tanggal_awal_uts} onChange={handleFilterChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">Awal UAS</label><input type="date" name="tanggal_awal_uas" value={filters.tanggal_awal_uas} onChange={handleFilterChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
                </div>
                
                {/* Tombol Aksi */}
                <div className="mt-4 flex flex-wrap gap-3 justify-end pt-2">
                  <button onClick={handleSearch} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 flex items-center gap-2 shadow-sm"><Search className="w-4 h-4" /> Filter Tanggal</button>
                  <button onClick={handlePrint} className="px-6 py-3 bg-gray-700 text-white font-medium rounded-xl hover:bg-gray-800 flex items-center gap-2 shadow-sm"><Printer className="w-4 h-4" /> Cetak</button>
                  {currentRole !== "Staf Admisi" && (
                     <button onClick={handleExport} className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 flex items-center gap-2 shadow-sm"><FileDown className="w-4 h-4" /> Export CSV</button>
                  )}
                </div>
              </div>

              {/* === BANNER INFORMASI ROLE === */}
              {currentRole === "Staf Admisi" && (
                <div className="mb-6 p-4 bg-blue-50/50 border border-blue-200 rounded-2xl flex items-center gap-3 text-blue-800 text-sm print:hidden shadow-sm">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p><strong>Mode Staf Admisi:</strong> Anda dalam mode <em>Read-Only</em>. Gunakan jadwal ini sebagai referensi layanan pendaftaran mahasiswa baru.</p>
                </div>
              )}

              {currentRole === "Dosen" && (
                <div className="mb-6 p-4 bg-purple-50/50 border border-purple-200 rounded-2xl flex items-center gap-3 text-purple-800 text-sm print:hidden shadow-sm">
                  <Info className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <p><strong>Mode Dosen:</strong> Anda dalam mode <em>Read-Only</em>. Gunakan jadwal ini sebagai referensi batas waktu perkuliahan dan input nilai.</p>
                </div>
              )}

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-blue-900 text-white text-sm uppercase tracking-wider">
                      <tr>
                        <th className="p-4 font-semibold">Kode</th>
                        <th className="p-4 font-semibold">Nama Periode</th>
                        <th className="p-4 font-semibold">Awal Kuliah</th>
                        <th className="p-4 font-semibold">Akhir Kuliah</th>
                        <th className="p-4 font-semibold">Awal UTS</th>
                        <th className="p-4 font-semibold">Awal UAS</th>
                        <th className="p-4 font-semibold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {isLoading ? (
                        <tr><td colSpan={7} className="p-12 text-center"><Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" /> Memuat data...</td></tr>
                      ) : currentData.length > 0 ? (
                        currentData.map((item: any, index: number) => (
                          <tr key={item.id || index} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                            <td className="p-4 font-medium flex items-center gap-2">
                                {item.is_locked && (
                                  <span title="Data Terkunci" className="inline-flex">
                                    <Lock className="w-4 h-4 text-red-500 animate-pulse" />
                                  </span>
                                )}
                                
                                {currentRole === "Admin Akademik" ? (
                                  <button onClick={() => handleEdit(item)} className={`${item.is_locked ? "text-gray-600" : "text-blue-600"} font-bold hover:text-blue-800 hover:underline focus:outline-none`}>
                                      {item.kode_periode}
                                  </button>
                                ) : (
                                  <span className="text-gray-700 font-bold">{item.kode_periode}</span>
                                )}
                            </td>
                            <td className="p-4 text-sm">{item.nama_periode}</td>
                            <td className="p-4 text-sm whitespace-nowrap">{item.tanggal_awal_kuliah || "-"}</td>
                            <td className="p-4 text-sm whitespace-nowrap">{item.tanggal_akhir_kuliah || "-"}</td>
                            <td className="p-4 text-sm whitespace-nowrap">{item.tanggal_awal_uts || "-"}</td>
                            <td className="p-4 text-sm whitespace-nowrap">{item.tanggal_awal_uas || "-"}</td>
                            <td className="p-4 text-center">
                              {item.status_aktif ? (
                                 <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                 <span className="text-red-400 font-bold">X</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan={7} className="p-12 text-center text-gray-500">Tidak ada data ditemukan.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* === PAGINATION === */}
                {!isLoading && data.length > 0 && (
                  <div className="bg-gray-50 border-t border-gray-200 p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 print:hidden">
                    <div className="bg-blue-50/50 px-4 py-2 rounded-lg border border-blue-100 text-blue-800">
                      Hal {currentPage}/{totalPages} ({data.length} data, {fetchTime} detik)
                    </div>

                    <div className="flex items-center gap-2">
                      <select 
                        value={itemsPerPage} 
                        onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        className="border border-gray-300 rounded-md px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
                      >
                        <option value={5}>5 baris</option>
                        <option value={10}>10 baris</option>
                        <option value={25}>25 baris</option>
                        <option value={50}>50 baris</option>
                      </select>
                    </div>

                    <div className="flex items-center shadow-sm rounded-md">
                      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="px-3 py-1.5 border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-md text-gray-500 font-bold">&laquo;</button>
                      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1.5 border-y border-r border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-500 font-bold">&lsaquo;</button>
                      
                      {getPageNumbers().map(page => (
                        <button 
                          key={page} 
                          onClick={() => handlePageChange(page)} 
                          className={`px-4 py-1.5 border-y border-r border-gray-200 font-medium ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        >
                          {page}
                        </button>
                      ))}

                      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1.5 border-y border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-500 font-bold">&rsaquo;</button>
                      <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="px-3 py-1.5 border-y border-r border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-md text-gray-500 font-bold">&raquo;</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ======================= MODE FORM ======================= */}
          {viewMode === "form" && (
            <motion.div variants={itemVariants} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
               
               {formData.is_locked && (
                 <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800 text-sm">
                   <Lock className="w-5 h-5 text-red-600" />
                   <p><strong>Periode Terkunci!</strong> Lepas centang pada "Kunci Periode" di bagian bawah form jika Anda perlu mengubah tanggal atau menghapus data ini.</p>
                 </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-6">
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Kode Periode *</label><input required type="text" name="kode_periode" value={formData.kode_periode} onChange={handleFormChange} disabled={formData.is_locked} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60" /></div>
                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tahun Ajaran *</label><input required type="text" name="tahun_ajaran" value={formData.tahun_ajaran} onChange={handleFormChange} disabled={formData.is_locked} placeholder="e.g. 2025/2026" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60" /></div>
                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Semester *</label><select name="semester" value={formData.semester} onChange={handleFormChange} disabled={formData.is_locked} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60"><option value="Ganjil">Ganjil</option><option value="Genap">Genap</option><option value="Pendek">Pendek</option></select></div>
                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Nama Periode *</label><input required type="text" name="nama_periode" value={formData.nama_periode} onChange={handleFormChange} disabled={formData.is_locked} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60" /></div>
                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Nama Singkat</label><input type="text" name="nama_singkat" value={formData.nama_singkat} onChange={handleFormChange} disabled={formData.is_locked} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60" /></div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tgl Awal Kuliah</label><input type="date" name="tanggal_awal_kuliah" value={formData.tanggal_awal_kuliah} onChange={handleFormChange} disabled={formData.is_locked} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tgl Akhir Kuliah</label><input type="date" name="tanggal_akhir_kuliah" value={formData.tanggal_akhir_kuliah} onChange={handleFormChange} disabled={formData.is_locked} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tgl Awal UTS</label><input type="date" name="tanggal_awal_uts" value={formData.tanggal_awal_uts} onChange={handleFormChange} disabled={formData.is_locked} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tgl Akhir UTS</label><input type="date" name="tanggal_akhir_uts" value={formData.tanggal_akhir_uts} onChange={handleFormChange} disabled={formData.is_locked} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tgl Awal UAS</label><input type="date" name="tanggal_awal_uas" value={formData.tanggal_awal_uas} onChange={handleFormChange} disabled={formData.is_locked} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tgl Akhir UAS</label><input type="date" name="tanggal_akhir_uas" value={formData.tanggal_akhir_uas} onChange={handleFormChange} disabled={formData.is_locked} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-60" /></div>
                        </div>
                        
                        <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
                           <div className="flex items-center gap-3">
                             <input type="checkbox" name="status_aktif" id="status_aktif" checked={formData.status_aktif} onChange={handleFormChange} disabled={formData.is_locked} className="w-5 h-5 text-blue-600 rounded disabled:opacity-60" />
                             <label htmlFor="status_aktif" className="text-sm font-semibold text-gray-700 cursor-pointer">Set sebagai Periode Aktif</label>
                           </div>
                           <div className="flex items-center gap-3">
                             <input type="checkbox" name="is_locked" id="is_locked" checked={formData.is_locked} onChange={handleFormChange} className="w-5 h-5 text-red-600 rounded focus:ring-red-500" />
                             <label htmlFor="is_locked" className="text-sm font-bold text-red-600 cursor-pointer flex items-center gap-1"><Lock className="w-4 h-4"/> Kunci Periode (Cegah modifikasi data di masa depan)</label>
                           </div>
                        </div>
                    </div>
                 </div>

                 <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                    <div>
                       {editId && (
                           <button type="button" onClick={() => handleDelete(editId)} disabled={formData.is_locked} className="px-5 py-3 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                              <Trash2 className="w-4 h-4" /> Hapus Data
                           </button>
                       )}
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={handleCancel} className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl flex items-center gap-2 transition-colors">
                           <ArrowLeft className="w-4 h-4" /> Batal
                        </button>
                        <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-colors">
                           <Save className="w-4 h-4" /> {editId ? "Update Data" : "Simpan Data"}
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
