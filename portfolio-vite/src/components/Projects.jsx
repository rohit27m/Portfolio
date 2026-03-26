import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Project One',
    description: 'A brief description of the first project.',
  },
  {
    title: 'Project Two',
    description: 'A brief description of the second project.',
  },
  {
    title: 'Project Three',
    description: 'A brief description of the third project.',
  },
];

const Projects = () => {
  return (
    <div id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              style={{ backdropFilter: 'blur(10px)', background: 'rgba(31, 41, 55, 0.3)' }}
            >
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p>{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
