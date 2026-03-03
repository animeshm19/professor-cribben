import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Research from "./components/Research";
import GlobalImpact from "./components/GlobalImpact"; // The new Globe section
import Lab from "./components/Lab";
import Publications from "./components/Publications";

function App() {
  return (
    <main className="relative min-h-screen selection:bg-blue-500/30 selection:text-white">
      {/* 1. Navigation */}
      <Navbar />

      {/* 2. Hero Section: 3D Neural Constellation */}
      <Hero />
      
      {/* 3. Research Section: Spatial Latent Gallery */}
      <Research />

      {/* 4. Global Impact: Interactive 3D Globe of Talks & Seminars */}
      <GlobalImpact />

      {/* 5. Lab & Students: Fibre Optic Storytelling */}
      <Lab />
      
      {/* 6. Publications: The Dark Matter Codex (3D Book) */}
      <Publications />
    
    </main>
  );
}

export default App;