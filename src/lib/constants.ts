// src/lib/constants.ts

type NavLink = {
  name: string;
  path: string;
  internal: boolean;
};

type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
  whatsappLink: string;
};

export const NAV_LINKS: NavLink[] = [
  { name: "Home", path: "/", internal: true },
];

export const CONTACT_INFO: ContactInfo = {
  email: "info@matanauniversity.ac.id",
  phone: "+62 21 12345678",
  address: "Gading Serpong, Tangerang",
  whatsapp: "+62 812-8777-5999",
  whatsappLink: "https://wa.me/6281287775999",
};

// Tambahkan baris ini untuk fix error hero-section.tsx:
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const WHATSAPP_MAX_DIGITS = 15;
// Tambahkan ini di bawah WHATSAPP_MAX_DIGITS
export const WHATSAPP_MIN_DIGITS = 10;
