'use client'

import { FiSearch, FiMenu } from 'react-icons/fi'
import { GoDotFill } from 'react-icons/go'
import { FaLocationDot } from 'react-icons/fa6'
import { NavigationMenuDemo } from '@/components/navigation'

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-screen-xl mx-auto px-1 py-1 flex items-center justify-between">
        {/* Left side menu items */}
        <NavigationMenuDemo/>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center font-semibold text-sm md:text-base">
            <span className="mr-1">MORE</span>
            <GoDotFill className="text-sm" />
          </div>

          <button className="flex items-center border px-3 py-1 rounded-full text-sm">
            <FaLocationDot className="mr-1 text-lg text-gray-700" />
            <span>ನಗರ</span>
          </button>

          <FiSearch className="text-xl cursor-pointer" />
          <FiMenu className="text-xl cursor-pointer" />
        </div>
      </div>
    </header>
  )
}
