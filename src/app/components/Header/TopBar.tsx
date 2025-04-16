"use client"

import { LoginButton } from '@/components/LoginButton';
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
  FaBell,
} from 'react-icons/fa6';

export const TopBar = () => {
  return (
    <div className="w-full border-b border-gray-200 px-4 py-2 text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Social Media Icons */}
        <div className="flex space-x-3 items-center">
          <a href="#"><FaFacebookF className="text-blue-600 h-5 w-5" /></a>
          <a href="#"><FaXTwitter className="bg-black text-white rounded-full h-5 w-5 p-1" /></a>
          <a href="#"><FaYoutube className="text-red-600 h-5 w-5" /></a>
          <a href="#"><FaInstagram className="text-pink-500 h-5 w-5" /></a>
        </div>

        {/* Center: Language Selection */}
        <div className="hidden sm:flex flex-wrap justify-center gap-4 text-gray-700 text-xs md:text-sm">
          <span className="cursor-pointer hover:underline">हिन्दी</span>
          <span className="cursor-pointer hover:underline">ಕನ್ನಡ</span>
          <span className="cursor-pointer hover:underline">বাংলা</span>
          <span className="cursor-pointer hover:underline">తెలుగు</span>
          <span className="cursor-pointer hover:underline">मराठी</span>
          <span className="cursor-pointer hover:underline">ગુજરાતી</span>
          <span className="cursor-pointer hover:underline">English</span>
        </div>

        {/* Right: Notification + Profile */}
        <div className="flex items-center space-x-4">
          {/* Bell icon with dot */}
          <div className="relative">
            <FaBell className="h-5 w-5 text-gray-800" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-600 rounded-full"></span>
          </div>
          {/* Login button */}
          <LoginButton />
        </div>
      </div>
    </div>
  );
};