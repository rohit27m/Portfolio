import React from 'react';

const Contact = () => {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Contact Me</h2>
        <form className="max-w-xl mx-auto">
          <div className="mb-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Your Email" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <textarea placeholder="Your Message" rows="4" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
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
