import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-square rounded-2xl bg-secondary/80 border border-white/10 overflow-hidden glass-panel flex items-center justify-center">
              <img 
                src="/profile.jpg" 
                alt="Rohit Munamarthi" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-accent">Me</span>
            </h2>
            <div className="space-y-4 text-gray-400 text-lg font-light leading-relaxed">
              <p>
                I am a Computer Science Engineering student passionate about software development, 
                building high-quality web applications, and designing scalable systems.
              </p>
              <p>
                My journey in tech is driven by an insatiable curiosity to understand how things work under the hood. 
                Whether it's crafting an intuitive user interface, optimizing a backend API, or exploring 
                3D web rendering, I thrive in the space where logic meets creativity.
              </p>
              <p>
                I believe in clean code, continuous learning, and creating elegant solutions to complex problems.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-accent pl-4">
                <p className="text-3xl font-bold text-white">5+</p>
                <p className="text-sm text-gray-500 font-medium">Projects Completed</p>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <p className="text-3xl font-bold text-white">3rd</p>
                <p className="text-sm text-gray-500 font-medium">Year CSE Student</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
