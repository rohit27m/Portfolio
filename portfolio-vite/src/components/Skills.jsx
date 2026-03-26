import { motion } from 'framer-motion';
import { FaJava, FaPython, FaReact, FaNodeJs, FaGitAlt, FaCube } from 'react-icons/fa';
import { SiJavascript, SiTypescript } from 'react-icons/si';
import { MdApi, MdSecurity, MdCode, MdStorage } from 'react-icons/md';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', icon: FaJava, color: 'text-orange-500' },
      { name: 'Python', icon: FaPython, color: 'text-blue-500' },
      { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
    ]
  },
  {
    title: 'Technologies',
    skills: [
      { name: 'React', icon: FaReact, color: 'text-cyan-400' },
      { name: 'Three.js', icon: FaCube, color: 'text-white' },
      { name: 'Git', icon: FaGitAlt, color: 'text-red-500' },
      { name: 'REST APIs', icon: MdApi, color: 'text-green-400' },
    ]
  },
  {
    title: 'Concepts',
    skills: [
      { name: 'Object-Oriented Programming', icon: MdCode, color: 'text-purple-400' },
      { name: 'Data Structures', icon: MdStorage, color: 'text-indigo-400' },
      { name: 'Full Stack Development', icon: FaNodeJs, color: 'text-green-500' },
      { name: 'Authentication Systems', icon: MdSecurity, color: 'text-red-400' },
    ]
  }
];

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-accent">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, tools, and the core concepts I utilize to build robust applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={category.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="glass-panel p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
                {category.title}
              </h3>
              <div className="flex flex-col gap-4">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div 
                      key={skill.name}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-default"
                    >
                      <div className={`p-2 rounded-lg bg-black/30 ${skill.color}`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
