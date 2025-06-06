"use client";
import React, {useEffect} from "react";
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";
import Link from "next/link";

const LogoutContent = () => {
        useEffect(() => {
          document.title = "Logout - Sodra Collection"
        }, [])
        
        const router = useRouter();
      
        const handleLogout = async () => {
          await signOut({ redirect: false }); // Prevent automatic redirect
          router.push('/'); // Redirect to home or desired route
        };

  return (
    <>
        <div className="p-4 sm:p-10 h-screen flex justify-center flex-col items-center gap-5 rounded-md overflow-y-auto">
          <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
            </svg>
          </span>

          <h3 className="mb-2 text-2xl font-bold text-gray-800">Log out</h3>
          <p className="text-gray-500">
            Are you sure you would like to log out of your account?
          </p>

          <div className="mt-6 flex justify-center gap-x-4">
            <Link href={"/"}>
              <button
                className=" py-2.5 px-4 inline-flex justify-center items-center font-medium bg-white text-gray-700 shadow-sm transition-all text-sm w-full hover:bg-[#71c1f6] border-[1px] border-[#54b7fa] focus:ring-2 focus:ring-[#0680d0] outline-none rounded-md"
                onClick={handleLogout}
              >
                Log out
              </button>
            </Link>
            <Link href={"/DressCollection"}>
              <button
                type="button"
                className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border-transparent text-sm w-full bg-[#0680d0] hover:bg-[#44b1f9] text-white border-[1px] border-[#54b7fa] focus:ring-2 focus:ring-[#0680d0] outline-none"
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
    </>
  );
};

export default LogoutContent;

