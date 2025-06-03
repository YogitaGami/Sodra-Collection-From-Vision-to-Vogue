"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";

const MadeToOrdersContent = () => {
  const [madeToOrders, setMadeToOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMadeToOrders = async () => {
      try {
        const res = await axios.get("/api/madeToOrder");
        setMadeToOrders(res.data);
      } catch (err) {
        toast.info("Failed to fetch made-To-Order. Please try again.");
        console.error("Error fetching madeToOrders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMadeToOrders();
  }, []);
  console.log(madeToOrders);

  if (loading) return <PageLoader />;

  const styleMap = {
    one: "lg:row-span-1",
    two: "lg:row-span-2",
    three: "lg:row-span-3",
    four: "lg:row-span-4",
    five: "lg:row-span-5",
  };
  return (
    <div className="pt-28 pb-10 px-4 sm:px-6 md:px-10 lg:px-60 xl:px-60 w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-custom3 auto-rows-[391px] md:auto-rows-[350px] lg:grid-rows-custom3 gap-5">
      {madeToOrders.length > 0 ? (
        madeToOrders
          .sort((a, b) => a.position - b.position) // sort by position
          .map((madeToOrder) =>{
            const xlClasses = styleMap[madeToOrder.style]
            return (
            <div key={madeToOrder._id} className={`${xlClasses}`}>
              <Link
                href={`/MadeToOrder/${madeToOrder._id}`}
                target="_blank"
                rel="noopener noreferrer"
                 // styleMap defines row-span-X
              >
                <DriveImage
                  imageId={madeToOrder.imageId}
                  alt={madeToOrder.name}
                  width="100%"
                  height="100%"
                />
              </Link>
            </div>
          )
          })
      ) : (
        <p>No Made To Order found.</p>
      )}
    </div>
  );
};

export default MadeToOrdersContent;
