'use client';

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Image
                src="/next.svg"
                alt="Vijay Karnataka"
                width={120}
                height={40}
                className="h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="mb-2 font-semibold">Languages Sites</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">Hindi News</a></li>
                <li><a href="#" className="hover:underline">Tamil News</a></li>
                <li><a href="#" className="hover:underline">Malayalam News</a></li>
                <li><a href="#" className="hover:underline">IndiaTimes Bangla</a></li>
              </ul>
              <ul className="mt-2 space-y-1">
                <li><a href="#" className="hover:underline">English News</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">About</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Colombia Ads Publishing</a></li>
                <li><a href="#" className="hover:underline">Terms and Conditions</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Work With Us</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="mb-2 font-semibold">Follow Us On</h3>
            <div className="flex items-center space-x-3">
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="h-5 w-5 text-gray-700 hover:text-blue-600" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="h-5 w-5 text-gray-700 hover:text-blue-400" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="h-5 w-5 text-gray-700 hover:text-pink-500" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
          <p className="mb-2">
            This website follows the DNPA&apos;s code of Conduct
          </p>
          <p>
            Copyright - 2025 Karnataka, Coleman &amp; Co. Ltd.
            All rights reserved. For reprint rights:
            <span className="ml-1">
              Times Syndication Service
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;