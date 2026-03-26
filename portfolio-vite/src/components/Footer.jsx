export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-primary py-8 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <div className="mb-4 md:mb-0">
          <p>
            &copy; {currentYear} Rohit Munamarthi. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Designed & Built with</span>
          <span className="text-red-500 animate-pulse">❤️</span>
          <span>using React & Three.js</span>
        </div>
      </div>
    </footer>
  );
}
