import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'LiteThink LinkedIn Authentication System',
    description: 'A secure authentication system integrating LinkedIn OAuth. Implements JWT tokens, session management, and role-based access control to ensure secure enterprise login flows.',
    techStack: ['Java', 'Spring Boot', 'React', 'OAuth 2.0', 'PostgreSQL'],
    github: '#',
    demo: '#'
  },
  {
    id: 2,
    title: 'Online Course Registration System',
    description: 'A comprehensive academic platform allowing students to browse, register, and manage their course schedules. Features conflict-resolution logic and a responsive administrative dashboard.',
    techStack: ['Java', 'MySQL', 'React', 'Tailwind CSS', 'REST API'],
    github: '#',
    demo: '#'
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work demonstrating architectural design, full-stack capabilities, and problem-solving skills.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-accent opacity-0 group-hover:opacity-30 rounded-2xl blur-lg transition-all duration-500"></div>
              <div className="relative h-full glass-panel rounded-2xl p-8 flex flex-col transition-transform duration-500 group-hover:-translate-y-2">
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 text-xs font-medium text-accent bg-accent/10 border border-accent/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-secondary rounded-full hover:bg-white hover:text-black text-gray-300 transition-all duration-300"
                    aria-label="GitHub Repository"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent/10 text-accent font-medium rounded-full hover:bg-accent hover:text-primary transition-all duration-300 border border-accent/30 hover:border-accent"
                  >
                    <span>Live Demo</span>
                    <FaExternalLinkAlt size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
