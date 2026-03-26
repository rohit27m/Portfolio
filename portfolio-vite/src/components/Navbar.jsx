import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold">MyPortfolio</a>
        <div className="hidden md:flex space-x-4">
          <a href="#about" className="hover:text-gray-300">About</a>
          <a href="#skills" className="hover:text-gray-300">Skills</a>
          <a href="#projects" className="hover:text-gray-300">Projects</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
