import { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { AcademicRole } from "./lib/types";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import Footer from "./components/footer";

type RoleOption = {
  value: AcademicRole;
  label: string;
  hint: string;
};

type RoleSelectionCoverProps = {
  selectedRole: AcademicRole;
  onRoleChange: (role: AcademicRole) => void;
  onContinue: () => void;
};

type AppRoutesProps = {
  currentRole: AcademicRole;
  setCurrentRole: (role: AcademicRole) => void;
};

const roleOptions: RoleOption[] = [
  {
    value: "Admin Akademik",
    label: "Admin Akademik",
    hint: "Akses penuh",
  },
  {
    value: "Staf Admisi",
    label: "Staf Admisi",
    hint: "Referensi",
  },
  {
    value: "Dosen",
    label: "Dosen",
    hint: "Akademik",
  },
];

function RoleSelectionCover({
  selectedRole,
  onRoleChange,
  onContinue,
}: RoleSelectionCoverProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-blue-950 text-white">
      <img
        src="/professional-team-man-woman-business.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/86 to-blue-900/18" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/18 via-transparent to-blue-950/28" />

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="rounded-2xl bg-white/92 px-4 py-2 shadow-lg shadow-blue-950/20 backdrop-blur-sm">
            <img
              src="/matana-logo-removebg-preview.png"
              alt="Matana University"
              className="h-11 w-40 object-contain"
            />
          </div>
          <div className="hidden items-center gap-3 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md md:flex">
            <span>ROLE: {selectedRole}</span>
          </div>
        </header>

        <div className="flex flex-1 items-center py-12">
          <div className="max-w-2xl space-y-7">
            <div className="inline-flex items-center rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-blue-50 shadow-sm backdrop-blur-md">
              Sistem Admin Akademik
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight drop-shadow-md md:text-6xl">
              Data Periode Akademik
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-blue-50/90 md:text-lg">
              Pilih role untuk mengakses pengelolaan jadwal kuliah, periode ujian, dan status aktif akademik Matana University.
            </p>

            <div className="max-w-2xl rounded-3xl border border-white/14 bg-blue-950/32 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.32)] backdrop-blur-md">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-blue-100/80">
                Masuk sebagai
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {roleOptions.map(({ value, label, hint }) => {
                  const isSelected = selectedRole === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => onRoleChange(value)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${
                        isSelected
                          ? "border-white bg-white text-blue-950 shadow-lg shadow-blue-950/20"
                          : "border-white/16 bg-white/10 text-white hover:border-white/35 hover:bg-white/16"
                      }`}
                    >
                      <span className="block text-sm font-bold">{label}</span>
                      <span
                        className={`mt-1 block text-xs font-semibold ${
                          isSelected ? "text-blue-700" : "text-blue-100/75"
                        }`}
                      >
                        {hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-3 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200/40"
            >
              Masuk Sistem
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function AppRoutes({ currentRole, setCurrentRole }: AppRoutesProps) {
  const navigate = useNavigate();
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <Routes>
      <Route
        path="/role"
        element={
          <RoleSelectionCover
            selectedRole={currentRole}
            onRoleChange={setCurrentRole}
            onContinue={() => {
              setHasEntered(true);
              navigate("/");
            }}
          />
        }
      />
      <Route
        path="/"
        element={hasEntered ? (
          <>
            <Navbar
              currentRole={currentRole}
              setCurrentRole={setCurrentRole}
              onBackToRoleSelection={() => {
                setHasEntered(false);
                navigate("/role");
              }}
            />

            <main className="w-full pt-16">
              <HeroSection currentRole={currentRole} />
            </main>

            <Footer />
          </>
        ) : (
          <Navigate to="/role" replace />
        )}
      />
      <Route path="*" element={<Navigate to="/role" replace />} />
    </Routes>
  );
}

function App() {
  const [currentRole, setCurrentRole] = useState<AcademicRole>("Admin Akademik");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Router>
        <AppRoutes currentRole={currentRole} setCurrentRole={setCurrentRole} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
