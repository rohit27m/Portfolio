import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-secondary/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-10 md:p-16 border-t border-accent/20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's <span className="text-accent underline decoration-accent/30 underline-offset-8">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <a 
            href="mailto:contact@example.com"
            className="inline-block mb-12 px-8 py-4 bg-accent text-primary font-bold rounded-full text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300 transform hover:-translate-y-1"
          >
            Say Hello
          </a>

          <div className="flex justify-center items-center gap-6">
            <SocialLink href="https://github.com" icon={FaGithub} label="GitHub" />
            <SocialLink href="https://linkedin.com" icon={FaLinkedin} label="LinkedIn" />
            <SocialLink href="mailto:contact@example.com" icon={FaEnvelope} label="Email" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{ y: -5, scale: 1.1 }}
      className="p-4 bg-primary rounded-full text-gray-400 hover:text-accent hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] border border-white/5 hover:border-accent/50 transition-all duration-300"
    >
      <Icon size={24} />
    </motion.a>
  );
}
