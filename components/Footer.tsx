"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const socialLinks = [
    {
      icon: Github,
      url: 'https://github.com/Nikuunj',
      color: '#333',
      name: 'GitHub'
    },
    {
      icon: Twitter,
      url: 'https://x.com/IsNikunj',
      color: '#1DA1F2',
      name: 'Twitter'
    },
    {
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/makwana-nikunj/',
      color: '#0077B5',
      name: 'LinkedIn'
    }
  ];

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.3; // Hovered item
    if (distance === 1) return 1.2; // Adjacent items
    if (distance === 2) return 1.0; // Second adjacent
    return 1; // Rest
  };

  const getTranslateY = (index: number) => {
    if (hoveredIndex === null) return 0;
    
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return -15; // Hovered item
    if (distance === 1) return -9; // Adjacent items
    if (distance === 2) return -4; // Second adjacent
    return 0; // Rest
  };

  return (
     <div className=' flex justify-center mt-5'>
     <motion.div 
        className="bg-black/20 backdrop-blur-md rounded-2xl  p-3 border border-white/10 shadow-2xl z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      >
        <div className="flex items-end space-x-2">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.div
                key={index}
                className="relative"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 10,
                    scale: hoveredIndex === index ? 1 : 0.8
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ pointerEvents: 'none' }}
                >
                  {social.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/80"></div>
                </motion.div>

                {/* Icon Container */}
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg cursor-pointer overflow-hidden relative"
                  animate={{
                    scale: getScale(index),
                    y: getTranslateY(index)
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: social.color }}
                    animate={{
                      opacity: hoveredIndex === index ? 0.2 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent 
                      size={24} 
                      className="text-white drop-shadow-lg"
                      style={{ color: hoveredIndex === index ? social.color : 'white' }}
                    />
                  </div>

                  {/* Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 rounded-xl"></div>
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* Dock Indicator */}
        <div className="flex justify-center mt-2 space-x-1">
          {socialLinks.map((_, index) => (
            <motion.div
              key={index}
              className="w-1 h-1 bg-white/40 rounded-full"
              animate={{
                scale: hoveredIndex === index ? 1.5 : 1,
                backgroundColor: hoveredIndex === index ? '#ffffff' : 'rgba(255,255,255,0.4)'
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
     </motion.div>
     </div>
  );
};

export default Footer;