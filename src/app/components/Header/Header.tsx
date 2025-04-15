'use client';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Center Logo */}
        <Image
          src="/next.svg" 
          alt="VK Logo"
          width={180} // adjust as needed
          height={60}
          priority
        />

      </div>
    </header>
  );
};

export default Header;
