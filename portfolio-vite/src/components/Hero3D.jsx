import { motion } from 'framer-motion';
import { RobotScene } from '../three/RobotScene';

export function Hero3D() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* 3D Background */}
      <RobotScene />

      {/* Overlay Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-center mt-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
            Rohit <span className="text-accent glow-text">Munamarthi</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        >
          <p className="text-xl md:text-2xl text-gray-300 font-medium mb-6">
            Software Developer | Java Specialist | Full-Stack Engineer
          </p>
          <p className="text-md md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            I build scalable software systems and modern web applications with clean architecture and elegant user experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-accent text-primary font-semibold hover:bg-white hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="w-full sm:w-auto px-8 py-3 rounded-full border border-gray-600 text-white font-semibold hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 rounded-full border border-transparent text-gray-300 font-semibold hover:text-white transition-all duration-300"
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 text-sm flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </motion.div>
    </section>
  );
}
