import Link from "next/link";
import React from "react";

const PlaceOrder = () => {
  return (
    <Link href={"/GetAddress"}>
      <button className="w-fit bg-[#0680d0] text-white px-14 py-2 my-4 mx-16 rounded-md shadow-md hover:bg-[#44b1f9] transition-all duration-300">Place Order</button>
    </Link>
  );
};

export default PlaceOrder;
