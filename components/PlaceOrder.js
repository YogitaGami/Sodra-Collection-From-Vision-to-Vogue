import Link from "next/link";
import React from "react";

const PlaceOrder = () => {
  return (
    <Link href={"/GetAddress"} className="sm:flex sm:items-center sm:justify-center">
      <button className="w-fit bg-[#0680d0] text-white px-7 sm:px-14 py-1 sm:py-2 rounded-md shadow-md hover:bg-[#44b1f9] transition-all duration-300">Place Order</button>
    </Link>
  );
};

export default PlaceOrder;
