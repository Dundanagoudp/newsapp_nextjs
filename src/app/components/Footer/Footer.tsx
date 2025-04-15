// components/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
// Example icons from react-icons (substitute or add whichever icons you need).
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-800 py-6 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top row: Logo on left, Social icons on right */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left: Logo + Text */}
          <div className="flex items-center space-x-3">
            {/* Replace src below with your actual logo path */}
            <img
              src="/images/vijay-karnataka-logo.png"
              alt="Vijay Karnataka Logo"
              className="h-8 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-base font-bold">ವಿಜಯ ಕರ್ನಾಟಕ</span>
              <span className="text-xs text-gray-500">
                Powered by Times Internet
              </span>
            </div>
          </div>

          {/* Right: Social media icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" aria-label="Facebook">
              <FaFacebookF className="w-5 h-5 hover:text-blue-600 transition-colors" />
            </Link>
            {/* Rename FaTwitter to 'X' if you prefer, as there's no official FaX icon yet */}
            <Link href="#" aria-label="X (Twitter)">
              <FaTwitter className="w-5 h-5 hover:text-blue-500 transition-colors" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <FaYoutube className="w-5 h-5 hover:text-red-600 transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <FaInstagram className="w-5 h-5 hover:text-pink-600 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Middle row: Links grouped by columns */}
        <div>
          <h2 className="text-xl font-bold mb-4">Languages Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1 */}
            <div className="space-y-2">
              <Link href="#" className="block hover:text-blue-600 transition-colors">
                Hindi News
              </Link>
              <Link href="#" className="block hover:text-blue-600 transition-colors">
                Tamil News
              </Link>
              <Link href="#" className="block hover:text-blue-600 transition-colors">
                Malayalam News
              </Link>
              <Link href="#" className="block hover:text-blue-600 transition-colors">
                IndiaTimes Bangla
              </Link>
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              <Link href="#" className="block hover:text-blue-600 transition-colors">
                Telugu News
              </Link>
              <Link href="#" className="block hover:text-blue-600 transition-colors">
                Marathi News
              </Link>
              <Link href="#" className="block hover:text-blue-600 transition-colors">
                Gujarati News
              </Link>
              <Link href="#" className="block hover:text-blue-600 transition-colors">
                English News
              </Link>
            </div>

            {/* Column 3 */}
            <div className="space-y-2">
              <Link href="/about" className="block hover:text-blue-600 transition-colors">
                About Us
              </Link>
              <Link href="#" className="block hover:text-blue-600 transition-colors">
                Colombia Ads and Publishing
              </Link>
              <Link href="/terms" className="block hover:text-blue-600 transition-colors">
                Terms and Conditions
              </Link>
              <Link href="/privacy" className="block hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/careers" className="block hover:text-blue-600 transition-colors">
                Work With Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row: DNPA & Copyright */}
        <div className="text-sm text-gray-600 space-y-2">
          <p>This website follows the DNPA&apos;s code of Conduct</p>
          <p>
            Copyright - {currentYear} Bennett, Coleman &amp; Co. Ltd.
            All rights reserved. For reprint rights: Times Syndication Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
