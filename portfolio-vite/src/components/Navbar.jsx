import { motion } from 'framer-motion';

export function Navbar() {
  const links = ['About', 'Skills', 'Projects', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-primary/60 backdrop-blur-lg border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
        <a href="#" className="text-2xl font-bold tracking-tighter text-text-main group">
          R<span className="text-accent group-hover:glow-text transition-all duration-300">.</span>M
        </a>
        
        <div className="hidden md:flex space-x-8 items-center">
          {links.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-gray-400 hover:text-accent transition-colors duration-300"
            >
              {link}
            </a>
          ))}
          <a
            href="/resume.pdf" 
            target="_blank"
            className="px-5 py-2 rounded-full border border-accent/50 text-accent text-sm font-medium hover:bg-accent/10 hover:glow-text hover:border-accent transition-all duration-300"
          >
            Resume
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
