import React from 'react';

const skills = [
  'JavaScript', 'React', 'Node.js', 'Three.js', 'Tailwind CSS', 'HTML', 'CSS', 'Git'
];

const Skills = () => {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-700 text-white py-2 px-4 rounded-lg">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
];

const Skills = () => {
  return (
    <div id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Technical Skills
        </motion.h2>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-800 rounded-full">
              <motion.div
                className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-2 leading-none rounded-full"
                style={{ width: skill.level }}
                initial={{ width: 0 }}
                animate={{ width: skill.level }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                {skill.name}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
