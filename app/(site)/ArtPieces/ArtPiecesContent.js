"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";
import { toast } from "react-toastify";

const ArtPiecesContent = () => {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const res = await axios.get("/api/artPiece");
        setArtPieces(res.data);
      } catch (err) {
        toast.info("Failed to fetch artpieces. Please try again.");
        console.error("Error fetching artpieces:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, []);

  if (loading) return <PageLoader />;

  const styleMap = {
  "Ganesh Ji WallFrame": "xl:col-start-1 xl:row-start-1 xl:col-span-4 xl:row-span-3",
  "Maa child Sketch": "xl:col-start-6 xl:row-start-1 xl:col-span-2",
  "Bro Sketch": "xl:col-start-9 xl:row-start-1 xl:col-span-5 xl:row-span-3",
  "Skeleton on backcover": "xl:col-start-15 xl:row-start-1 xl:col-span-3 xl:row-span-2",
  "Radha Krishn embroidery": "xl:col-start-5 xl:row-start-2 xl:col-span-4 xl:row-span-4",
  "Ganesh ji murti": "xl:col-start-14 xl:row-start-3 xl:col-span-4 xl:row-span-4",
  "Di Mobile Backcover": "xl:col-start-2 xl:row-start-4 xl:col-span-3 xl:row-span-4",
  "Rainbow on Trolley": "xl:col-start-10 xl:row-start-4 xl:col-span-4 xl:row-span-4",
  "Marriage Gift embroidery": "xl:col-start-5 xl:row-start-6 xl:col-span-5 xl:row-span-3",
  "India Paper Quilling": "xl:col-start-1 xl:row-start-8 xl:col-span-4 xl:row-span-4",
  "Butterfly fabric Painting": "xl:col-start-16 xl:row-start-7 xl:col-span-2 xl:row-span-3",
  "Diary": "xl:col-start-10 xl:row-start-8 xl:col-span-6 xl:row-span-3",
  "Marmaid Paper Quilling": "xl:col-start-5 xl:row-start-9 xl:col-span-5 xl:row-span-4",
  "Flower embroidery": "xl:col-start-15 xl:row-start-10 xl:col-span-2 xl:row-span-3",
  "Peral tree": "xl:col-start-2 xl:row-start-12 xl:col-span-2 xl:row-span-3",
  "Kurta neck Painting": "xl:col-start-10 xl:row-start-11 xl:col-span-5 xl:row-span-2",
  "Greenery Painting": "xl:col-start-5 xl:row-start-14 xl:col-span-7 xl:row-span-3",
  "Cendralla Paper Quilling": "xl:col-start-13 xl:row-start-13 xl:col-span-4 xl:row-span-4",
  "Rose embroidery": "xl:col-start-1 xl:row-start-15 xl:col-span-4 xl:row-span-4",
  "Women Warli art": "xl:col-start-5 xl:row-start-16 xl:col-span-6 xl:row-span-4",
  "Nature in bottle": "xl:col-start-11 xl:row-start-17 xl:col-span-4 xl:row-span-4",
  "Girl Bride Printing": "xl:col-start-16 xl:row-start-17 xl:col-span-3 xl:row-span-3",
  "girl boy sketch": "xl:col-start-1 xl:row-start-19 xl:col-span-4 xl:row-span-3",
  "Bird Painting": "xl:col-start-5 xl:row-start-20 xl:col-span-6 xl:row-span-3",
  "Peacock Fur painting": "xl:col-start-16 xl:row-start-20 xl:col-span-3 xl:row-span-2",
  "Di hancky Display": "xl:col-start-11 xl:row-start-21 xl:col-span-4 xl:row-span-3",
  "Sandel Printing": "xl:col-start-2 xl:row-start-22 xl:col-span-3 xl:row-span-2",
  "Thread Basket": "xl:col-start-16 xl:row-start-22 xl:col-span-3 xl:row-span-2",
  "Friend's sketch": "xl:col-start-6 xl:row-start-23 xl:col-span-4 xl:row-span-2",
  "Friend hancky Display": "xl:col-start-1 xl:row-start-24 xl:col-span-5 xl:row-span-3",
  "Screen Printing Board": "xl:col-start-10 xl:row-start-24 xl:col-span-6 xl:row-span-2",
  "Girl Braids Sketch": "xl:col-start-15 xl:row-start-24 xl:col-span-2 xl:row-span-2",
  "Purse Painting": "xl:col-start-6 xl:row-start-25 xl:col-span-3 xl:row-span-2",
};

  return (
    <>
      <div
      className="
        grid grid-cols-custom2sm sm:grid-cols-custom2sm md:grid-cols-custom2md lg:grid-cols-custom2lg xl:grid-cols-custom2 2xl:grid-cols-custom22xl grid-rows-custom2sm sm:grid-rows-custom2sm md:grid-rows-custom2md 
        lg:grid-rows-custom2lg xl:grid-rows-custom2 mx-4 sm:mx-8 md:mx-20 lg:mx-44 xl:mx-44 pt-28 lg:pt-28 sm:pt-20 md:pt-28 gap-4 sm:gap-5 2xl:max-w-[2390px]
      "
    >
      {artPieces.length > 0 ? (
        artPieces
          .sort((a, b) => a.position - b.position)
          .map((artPiece) => {
            const xlClasses = styleMap[artPiece.name] || "xl:col-span-4 xl:row-span-2";
            return (
              <div
                key={artPiece._id}
                className={`
                  col-span-1 row-span-1
                  sm:col-span-2 sm:row-span-1
                  md:col-span-2 md:row-span-1
                  ${xlClasses}
                `}
              >
                <Link
                  href={`/ArtPiece/${artPiece._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DriveImage
                    imageId={artPiece.imageId?.[0]}
                    alt={artPiece.name}
                    width="100%"
                    height="100%"
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <p>No artPieces found.</p>
        )}
      </div>
    </>
  );
};

export default ArtPiecesContent;
