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
        toast.info("Failed to fetch made-To-Order. Please try again.")
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
    one: "row-span-1",
    two: "row-span-2",
    three: "row-span-3",
    four: "row-span-4",
    five: "row-span-5",
  };
  return (
    <div className="pt-28 px-60 pb-10 px w-full h-full grid grid-cols-custom3 grid-rows-custom3 gap-5">
      {madeToOrders.length > 0 ? (
        madeToOrders.map((madeToOrder) => (
          <Link
            key={madeToOrder._id}
            href={`/MadeToOrder/${madeToOrder._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styleMap[madeToOrder.style]}
          >
            <DriveImage imageId={madeToOrder.imageId} alt={madeToOrder.name} />
          </Link>
        ))
      ) : (
        <p>No Made To Order found.</p>
      )}
    </div>
  );
};

export default MadeToOrdersContent;
// {artPieces.length > 0 ? (
//         artPieces.map((artPiece) => (
//           <Link
//               key={artPiece._id}
//               href={`/ArtPiece/${artPiece._id}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={styleMap[artPiece.name]}
//             >
//                 <img
//                   className="w-full h-full"
//                   src={`https://drive.google.com/thumbnail?id=${artPiece.imageId}&sz=w1000`}
//                   alt={artPiece.name}
//                   referrerPolicy="no-referrer"
//                 />
//           </Link>
//         ))
//       ) : (
//         <p>No artPieces found.</p>
//       )}

{
  /* <div className="image row-span-1"> <img className='w-full h-full object-cover' src="Gradation gown pista.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Cowl pista green.jpg" alt="" /></div>
        <div className="image row-span-2"> <img className='w-full h-full object-cover' src="Repetition coconut skin.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Balance pink-white Chess.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Festival kite white.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Indian Bride.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Layer gown light red silver.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Unity red.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Zodiac tula brownish.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Rhythm Saree light blue.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Paint with jacket blue.jpeg" alt="" /></div>
        <div className="image row-span-5"> <img className='w-full h-full object-cover' src="Peacock Nature.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Texture Effect.jpg" alt="" /></div>
        <div className="image row-span-4"> <img className='w-full h-full object-cover' src="Trousers.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Transparency.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Rediation black red-carpate.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Skirts.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Fabric collace dog.jpg" alt="" /></div>     
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Frills.jpg" alt="" /></div>
        <div className="image row-span-2"> <img className='w-full h-full object-cover' src="Contrast Floral yellow.jpg" alt="" /></div>
        <div className="image row-span-2"> <img className='w-full h-full object-cover' src="Achromatic colour.jpeg" alt="" /></div>
        <div className="image row-span-4"> <img className='w-full h-full object-cover' src="Sleeves.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Harmony Purple.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="circular neck green.jpg" alt="" /></div>
        <div className="image row-span-3"> <img className='w-full h-full object-cover' src="Proportion 2-dress.jpg" alt="" /></div>
        <div className="image row-span-2"> <img className='w-full h-full object-cover' src="Collar neck pink.jpg" alt="" /></div>
        <div className="image row-span-2"> <img className='w-full h-full object-cover' src="Dominance rose pink.jpg" alt="" /></div> */
}
