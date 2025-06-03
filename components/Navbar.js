"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLoginClick = () => {
    localStorage.setItem("prevPage", pathname);
  };

  return (
    <nav className="fixed top-0 w-full shadow-md z-50">
      <div className="flex items-center justify-between lg:justify-around px-6 md:px-12 h-20">

        <Link href="/">
          <Image src="/logo.jpg" alt="logo" width={60} height={60} />
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-[#0680d0]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image
            src={isMenuOpen ? "/remove.svg" : "/hamburger.svg"} // Put your image names here
            alt="Menu Icon"
            width={20}
            height={20}
          />
        </button>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-10 text-[#0680d0] text-base lg:text-lg">
          <li>
            <Link href="/Dresses">Dress Collection</Link>
          </li>
          <li>
            <Link href="/Accessories">Accessories</Link>
          </li>
          <li>
            <Link href="/ArtPieces">Art Piece</Link>
          </li>
          <li>
            <Link href="/MadeToOrders">Made-to-Order</Link>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setIsProfileVisible(true)}
            onMouseLeave={() => setIsProfileVisible(false)}
          >
            <span className="cursor-pointer">Profile</span>
            {isProfileVisible && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#71c1f6cf] text-black p-4 w-72 rounded shadow-md z-10">
                <h3 className="font-bold text-lg mb-1">
                  Welcome, {session ? session.user.name : "Guest"}!
                </h3>
                <p className="text-sm mb-3">To access your account</p>
                <Link href="/Login" onClick={handleLoginClick}>
                  <button className="bg-[#0680d0] text-white px-3 py-1 w-full mb-3">
                    Login
                  </button>
                </Link>
                <hr />
                <Link href="/Favorite" target="_blank">
                  <button className="py-1">Favorite</button>
                </Link>
                <hr />
                <Link href="/MyOrders">
                  <button className="py-1">My Orders</button>
                </Link>
                <hr />
                <Link href="/Logout">
                  <button className="py-1">Delete Account</button>
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link href="/Cart" target="_blank">
              Cart
            </Link>
          </li>
          <li>
            <Link href="/About">About</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <ul className="flex flex-col items-start bg-white text-[#0680d0] text-lg px-6 py-4 md:hidden gap-4 shadow-md">
          <li>
            <Link href="/Dresses" onClick={() => setIsMenuOpen(false)}>
              Dress Collection
            </Link>
          </li>
          <li>
            <Link href="/Accessories" onClick={() => setIsMenuOpen(false)}>
              Accessories
            </Link>
          </li>
          <li>
            <Link href="/ArtPieces" onClick={() => setIsMenuOpen(false)}>
              Art Piece
            </Link>
          </li>
          <li>
            <Link href="/MadeToOrders" onClick={() => setIsMenuOpen(false)}>
              Made-to-Order
            </Link>
          </li>
          <li>
            <div>
              <h3 className="font-bold text-lg">
                Welcome, {session ? session.user.name : "Guest"}!
              </h3>
              <p className="text-sm">To access your account</p>
              <Link href="/Login" onClick={handleLoginClick}>
                <button className="bg-[#0680d0] text-white px-3 py-1 w-full my-2">
                  Login
                </button>
              </Link>
              <Link href="/Favorite" target="_blank">
                <button className="py-1">Favorite</button>
              </Link>
              <hr />
              <Link href="/MyOrders">
                <button className="py-1">My Orders</button>
              </Link>
              <hr />
              <Link href="/Logout">
                <button className="py-1">Delete Account</button>
              </Link>
            </div>
          </li>
          <li>
            <Link href="/Cart" target="_blank">
              Cart
            </Link>
          </li>
          <li>
            <Link href="/About">About</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
