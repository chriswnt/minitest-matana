"use client";

import { motion } from "framer-motion";
import pkg from "../../package.json";
import { CONTACT_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 py-12 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-white text-lg">
                Matana University
              </span>
            </div>
            <p className="text-sm">sistem pengelolaan periode akademik </p>
          </div>

       

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-orange-400 transition-colors"
                >
                  Email: {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="hover:text-orange-400 transition-colors"
                >
                  Phone: (021) 2923-2999
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  WhatsApp: {CONTACT_INFO.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">
            © 2026 Matana University. All rights reserved. <span className="text-gray-500">v({pkg.version})</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
