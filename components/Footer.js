import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col sm:flex-row justify-center items-center bg-[#71c1f6] text-black px-4 py-6 gap-4 sm:gap-2 sm:h-28">
      {/* Brand Section */}
      <div className="text-center sm:text-left">
        <p className="text-xl font-bold">Sodra Collection</p>
        <p className="text-sm font-semibold">From Vision to Vogue</p>
      </div>

      {/* Copyright */}
      <div className="text-center sm:text-right text-sm font-medium">
        <p>
          &copy; {currentYear} | All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
