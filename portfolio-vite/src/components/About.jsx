import React from 'react';

const About = () => {
  return (
    <section className="py-20 px-4 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-lg max-w-3xl mx-auto">
          I am a passionate and creative developer with a love for building beautiful and functional web applications. I have experience with various technologies and I am always eager to learn new things.
        </p>
      </div>
    </section>
  );
};

export default About;
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-center"
        >
          <p className="mb-4">
            Hi, I'm Rohit Munamarthi, a Computer Science Engineering student with a strong passion for building scalable software and modern web applications.
          </p>
          <p className="mb-4">
            I specialize in Java development and full-stack engineering, with experience in designing secure systems, implementing authentication workflows, and developing dynamic user interfaces. I enjoy solving complex technical problems and turning ideas into clean, efficient, and user-focused applications.
          </p>
          <p className="mb-4">
            My interests include backend architecture, system design, and modern frontend technologies such as React and Three.js to create interactive and visually engaging web experiences. I continuously improve my skills through coding practice, project development, and exploring emerging technologies in software engineering.
          </p>
          <p className="mb-4">
            I aim to build reliable, high-quality software that is both technically strong and visually refined.
          </p>
          <p>
            Outside of programming, I enjoy playing badminton and exploring innovative ideas in web development and technology.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
