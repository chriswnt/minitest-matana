"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "@/lib/constants";

// Menambahkan interface untuk TypeScript (Props)
interface NavbarProps {
  currentRole: string;
  setCurrentRole: (role: string) => void;
}

export default function Navbar({ currentRole, setCurrentRole }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/">
            <img
              src="/matana-logo-removebg-preview.png"
              alt="Matana University"
              className="w-36 h-14 object-contain cursor-pointer"
            />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            // PERBAIKAN: Menggunakan link.path sesuai struktur data asli Anda
            const isActive = location.pathname === link.path;
            return link.internal ? (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors text-sm font-medium ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <motion.div whileHover={{ y: -2 }}>
                  {/* PERBAIKAN: Menggunakan link.name */}
                  {link.name}
                </motion.div>
              </Link>
            ) : (
              <motion.a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                whileHover={{ y: -2 }}
              >
                {/* PERBAIKAN: Menggunakan link.name */}
                {link.name}
              </motion.a>
            );
          })}

          {/* TAMBAHAN: Dropdown Simulasi Role (Desktop) */}
          <div className="flex items-center gap-2 border-l border-gray-200 pl-6 ml-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Role:
            </span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1.5 cursor-pointer outline-none transition-colors hover:bg-gray-100"
            >
              <option value="Admin Academic">Admin Akademik</option>
              <option value="Staf Admisi">Staf Admisi</option>
              <option value="Dosen">Dosen</option>
            </select>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            onClick={() => setIsOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-200 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                // PERBAIKAN: Menggunakan link.path dan link.name untuk versi mobile
                const isActive = location.pathname === link.path;
                return link.internal ? (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 font-bold"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-blue-600 text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                );
              })}

              {/* TAMBAHAN: Dropdown Simulasi Role (Mobile) */}
              <div className="mt-2 pt-4 border-t border-gray-200">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Simulasi Role
                </label>
                <select
                  value={currentRole}
                  onChange={(e) => {
                    setCurrentRole(e.target.value);
                    setIsOpen(false);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer outline-none"
                >
                  <option value="Admin Academic">Admin Akademik</option>
                  <option value="Staf Admisi">Staf Admisi</option>
                  <option value="Dosen">Dosen</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}