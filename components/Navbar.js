"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // if (!session) return <div>Please sign in</div>;

  const handleLoginClick = () => {
    localStorage.setItem("prevPage", pathname); // Store the current page
  };

  return (
    <nav className="flex justify-around items-center fixed pl-12 h-24 w-full inset-1 z-10">
      <div className="flex justify-center ">
      <Link href={"/"}><Image src="/logo.jpg" alt="logo" width={65} height={60}></Image></Link>
      </div>
      <ul className="flex justify-center gap-12 py-6">
        <li className="text-[#0680d0] text-lg">
          <Link href={"/Dresses"}>Dress Collection</Link>
        </li>
        <li className="text-[#0680d0] text-lg">
          <Link href={"/Accessories"}>Accessories</Link>
        </li>
        <li className="text-[#0680d0] text-lg">
          <Link href={"/ArtPieces"}>Art Piece</Link>
        </li>
        <li className="text-[#0680d0] text-lg">
          <Link href={"/MadeToOrders"}>Made-to-Order</Link>
        </li>
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <li className="text-[#0680d0] text-lg relative cursor-pointer group hover-container">
            Profile
          </li>
          {isVisible && (
            <div className="absolute top-7 left-1/2 w-72 h-60 py-3 px-4 bg-[#71c1f6cf] text-black -translate-x-1/2">
              <h3 className="font-bold text-lg">Welcome, {session ? session.user.name : "Guest"}!</h3>
              <p className="text-sm">To access your Account</p>
              <Link href={"/Login"} onClick={handleLoginClick}>
                <button className="bg-[#0680d0] px-3 py-1 text-[#48b5fd] w-full mt-5 mb-5" >
                  Login
                </button>
              </Link>
              <hr className="bg-[#0680d0] text-[#0680d0] border-0 h-[1px]" />
              <Link href={"/Favorite"} target="_blank" rel="noopener noreferrer">
                <button className="my-1" >Favorite</button>
              </Link>
              <hr className="bg-[#0680d0] text-[#0680d0] border-0 h-[1px]" />
              <Link href={"/MyOrders"}>
                <button className="my-1" >My Orders</button>
              </Link>
              <hr className="bg-[#0680d0] text-[#0680d0] border-0 h-[1px]" />
              <Link href={"/Logout"}>
              <button className="my-1">Delete Account</button>
              </Link>
            </div>
          )}
        </div>
        <li className="text-[#0680d0] text-lg">
          <Link href={"/Cart"} target="_blank" rel="noopener noreferrer">Cart</Link>
        </li>
        <li className="text-[#0680d0] text-lg">
          <Link href={"/About"}>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
