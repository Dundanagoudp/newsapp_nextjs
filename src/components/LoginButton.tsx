"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LoginModal } from './LoginModal';

export const LoginButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.button
        onClick={toggleModal}
        className="relative px-5 py-2.5 font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        initial={false} // Important for avoiding hydration mismatch
      >
        <span className="flex items-center justify-center">
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            />
          </svg>
          Login
        </span>
      </motion.button>
      
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};