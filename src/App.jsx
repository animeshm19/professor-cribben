import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// --- THE NEW ENGINE ---
import InferenceLens from "./components/InferenceLens"; 

import Research from "./components/Research";
import GlobalImpact from "./components/GlobalImpact";
import Broadcast from "./components/Broadcast";
import Lab from "./components/Lab";
import Publications from "./components/Publications";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import CognitiveFootprint from "./components/CognitiveFootprint"; 

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <SmoothScroll>
        <main className="relative min-h-screen selection:bg-blue-500/30 selection:text-white bg-transparent">
          

          <CustomCursor />
          <ScrollProgress />
          <CognitiveFootprint />

          <div className="relative z-10">
            <Navbar />
            <Hero />
            
            {/* INJECTED HERE */}
            <InferenceLens />
            
            <Research />
            <GlobalImpact />
            <Broadcast />
            <Lab />
            <Publications />
            <Footer />
          </div>
          
        </main>
      </SmoothScroll>
    </>
  );
}

export default App;