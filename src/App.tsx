import { useState } from "react"; // Tambahkan import ini
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import Footer from "./components/footer";

function App() {
  // useState HARUS berada di dalam fungsi komponen
  const [currentRole, setCurrentRole] = useState("Admin Akademik"); 

  return (
    <Router>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {/* Kirim currentRole dan setCurrentRole ke Navbar */}
        <Navbar currentRole={currentRole} setCurrentRole={setCurrentRole} />
        
        <main className="w-full pt-16">
          <Routes>
            {/* Kirim currentRole ke HeroSection */}
            <Route path="/" element={<HeroSection currentRole={currentRole} />} />
          </Routes>
        </main>
        
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
