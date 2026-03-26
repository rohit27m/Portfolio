import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading sequence for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center isolate"
          >
            {/* Grid background for loading screen */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">
                R<span className="text-accent underline decoration-accent/50 underline-offset-8">.</span>M
              </h1>
              <motion.div 
                className="h-1 bg-accent/20 rounded-full w-48 overflow-hidden mx-auto mt-6"
              >
                <motion.div
                  className="h-full bg-accent glow-text"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen font-sans selection:bg-accent/30 selection:text-white">
          <CursorGlow />
          <Navbar />
          <Hero3D />
          <div className="relative z-10 bg-primary/90 backdrop-blur-3xl border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
