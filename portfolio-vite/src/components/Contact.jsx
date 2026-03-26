import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8"
        >
          Contact Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center space-x-6"
        >
          <a href="https://www.linkedin.com/in/rohitmunamarthi" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">LinkedIn</a>
          <a href="https://github.com/rohit27m" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">GitHub</a>
          <a href="mailto:rohit27m@hotmail.com" className="text-red-400 hover:text-red-300">Email</a>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
