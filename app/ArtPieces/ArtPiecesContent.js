"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";

const ArtPiecesContent = () => {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const res = await axios.get("/api/artPiece");
        setArtPieces(res.data);
      } catch (err) {
        console.error("Error fetching artpieces:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, []);

  if (loading) return <PageLoader />;

  const styleMap = {
    "Ganesh Ji WallFrame": "col-start-1 row-start-1 col-span-4 row-span-3",
    "Maa child Sketch": "col-start-6 row-start-1 col-span-2",
    "Bro Sketch": "col-start-9 row-start-1 col-span-5 row-span-3",
    "Skeleton on backcover": "col-start-15 row-start-1 col-span-3 row-span-2",
    "Radha Krishn embroidery": "col-start-5 row-start-2 col-span-4 row-span-4",
    "Ganesh ji murti": "col-start-14 row-start-3 col-span-4 row-span-4",
    "Di Mobile Backcover": "col-start-2 row-start-4 col-span-3 row-span-4",
    "Rainbow on Trolley": "col-start-10 row-start-4 col-span-4 row-span-4",
    "Marriage Gift embroidery": "col-start-5 row-start-6 col-span-5 row-span-3",
    "India Paper Quilling": "col-start-1 row-start-8 col-span-4 row-span-4",
    "Butterfly fabric Painting":
      "col-start-16 row-start-7 col-span-2 row-span-3",
    "Diary": "col-start-10 row-start-8 col-span-6 row-span-3",
    "Marmaid Paper Quilling": "col-start-5 row-start-9 col-span-5 row-span-4",
    "Flower embroidery": "col-start-15 row-start-10 col-span-2 row-span-3",
    "Peral tree": "col-start-2 row-start-12 col-span-2 row-span-3",
    "Kurta neck Painting": "col-start-10 row-start-11 col-span-5 row-span-2",
    "Greenery Painting": "col-start-5 row-start-14 col-span-7 row-span-3",
    "Cendralla Paper Quilling":
      "col-start-13 row-start-13 col-span-4 row-span-4",
    "Rose embroidery": "col-start-1 row-start-15 col-span-4 row-span-4",
    "Women Warli art": "col-start-5 row-start-16 col-span-6 row-span-4",
    "Nature in bottle": "col-start-11 row-start-17 col-span-4 row-span-4",
    "Girl Bride Printing": "col-start-16 row-start-17 col-span-3 row-span-3",
    "girl boy sketch": "col-start-1 row-start-19 col-span-4 row-span-3",
    "Bird Painting": "col-start-5 row-start-20 col-span-6 row-span-3",
    "Peacock Fur painting": "col-start-16 row-start-20 col-span-3 row-span-2",
    "Di hancky Display": "col-start-11 row-start-21 col-span-4 row-span-3",
    "Sandel Printing": "col-start-2 row-start-22 col-span-3 row-span-2",
    "Thread Basket": "col-start-16 row-start-22 col-span-3 row-span-2",
    "Friend's sketch": "col-start-6 row-start-23 col-span-4 row-span-2",
    "Friend hancky Display": "col-start-1 row-start-24 col-span-5 row-span-3",
    "Screen Printing Board": "col-start-10 row-start-24 col-span-6 row-span-2",
    "Girl Braids Sketch": "col-start-15 row-start-24 col-span-2 row-span-2",
    "Purse Painting": "col-start-6 row-start-25 col-span-3 row-span-2",
  };
  return (
    <>
      <div className="grid grid-cols-custom2 grid-rows-custom2 mx-44 pt-28 gap-5">
        {artPieces.length > 0 ? (
          artPieces.map((artPiece) => (
            <Link
              key={artPiece._id}
              href={`/ArtPiece/${artPiece._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styleMap[artPiece.name]}
            >
              <DriveImage imageId={artPiece.imageId?.[0]} alt={artPiece.name} />
            </Link>
          ))
        ) : (
          <p>No artPieces found.</p>
        )}
        {/* <div className="col-start-1 row-start-1 col-span-4 row-span-3">
        <img className='w-full h-full' src="Ganesh Ji WallFrame.jpg" alt=""/>
      </div>
      <div className="col-start-6 row-start-1 col-span-2">
        <img className='w-full h-full' src="Maa child Sketch.jpg" alt=""/>
      </div>
      <div className="col-start-9 row-start-1 col-span-5 row-span-3">
        <img className='w-full h-full' src="Bro Sketch.jpg" alt=""/>
      </div>
      <div className="col-start-15 row-start-1 col-span-3 row-span-2">
        <img className='w-full h-full' src="Skeleton on backcover.jpg" alt=""/>
      </div>
      <div className="col-start-5 row-start-2 col-span-4 row-span-4">
        <img className='w-full h-full' src="Radha Krishn embroidery.jpg" alt=""/>
      </div>
      <div className="col-start-14 row-start-3 col-span-4 row-span-4">
        <img className='w-full h-full' src="Ganesh ji murti.jpg" alt=""/>
      </div>
      <div className="col-start-2 row-start-4 col-span-3 row-span-4">
        <img className='w-full h-full' src="Di Mobile Backcover.jpg" alt=""/>
      </div>
      <div className="col-start-10 row-start-4 col-span-4 row-span-4">
        <img className='w-full h-full' src="Rainbow on Trolley.jpg" alt=""/>
      </div>
      <div className="col-start-5 row-start-6 col-span-5 row-span-3">
        <img className='w-full h-full' src="Marriage Gift embroidery.jpg" alt=""/>
      </div>
      <div className="col-start-1 row-start-8 col-span-4 row-span-4">
        <img className='w-full h-full' src="India Paper Quilling.jpg" alt=""/>
      </div>
      <div className="col-start-16 row-start-7 col-span-2 row-span-3">
        <img className='w-full h-full' src="Butterfly fabric Painting.jpg" alt=""/>
      </div>
      <div className="col-start-10 row-start-8 col-span-6 row-span-3">
        <img className='w-full h-full' src="Diary.jpg" alt=""/>
      </div>
      <div className="col-start-5 row-start-9 col-span-5 row-span-4">
        <img className='w-full h-full' src="Marmaid Paper Quilling.jpg" alt=""/>
      </div>
      <div className="col-start-15 row-start-10 col-span-2 row-span-3">
        <img className='w-full h-full' src="Flower embroidery.jpg" alt=""/>
      </div>
      <div className="col-start-2 row-start-12 col-span-2 row-span-3">
        <img className='w-full h-full' src="Peral tree.jpg" alt=""/>
      </div>
      <div className="col-start-10 row-start-11 col-span-5 row-span-2">
        <img className='w-full h-full' src="Kurta neck Painting.jpg" alt=""/>
      </div>
      <div className="col-start-5 row-start-14 col-span-7 row-span-3">
        <img className='w-full h-full' src="Greenery Painting.jpg" alt=""/>
      </div>
      <div className="col-start-13 row-start-13 col-span-4 row-span-4">
        <img className='w-full h-full' src="Cendralla Paper Quilling.jpg" alt=""/>
      </div>
      <div className="col-start-1 row-start-15 col-span-4 row-span-4">
        <img className='w-full h-full' src="Rose embroidery.jpg" alt=""/>
      </div>
      <div className="col-start-5 row-start-16 col-span-6 row-span-4">
        <img className='w-full h-full' src="Women Warli art.jpg" alt=""/>
      </div>
      <div className="col-start-11 row-start-17 col-span-4 row-span-4">
        <img className='w-full h-full' src="Nature in bottle.jpg" alt=""/>
      </div>
      <div className="col-start-16 row-start-17 col-span-3 row-span-3">
        <img className='w-full h-full' src="Girl Bride Printing.jpg" alt=""/>
      </div>
      <div className="col-start-1 row-start-19 col-span-4 row-span-3">
        <img className='w-full h-full' src="girl boy sketch.jpg" alt=""/>
      </div>
      <div className="col-start-5 row-start-20 col-span-6 row-span-3">
        <img className='w-full h-full' src="Bird Painting.jpg" alt=""/>
      </div>
      <div className="col-start-16 row-start-20 col-span-3 row-span-2">
        <img className='w-full h-full' src="Peacock Fur painting.jpg" alt=""/>
      </div>
      <div className="col-start-11 row-start-21 col-span-4 row-span-3">
        <img className='w-full h-full' src="Di hancky Display.jpg" alt=""/>
      </div>
      <div className="col-start-2 row-start-22 col-span-3 row-span-2">
        <img className='w-full h-full' src="Sandel Printing.jpg" alt=""/>
      </div>
      <div className="col-start-16 row-start-22 col-span-3 row-span-2">
        <img className='w-full h-full' src="Thread Basket.jpg" alt=""/>
      </div>
      <div className="col-start-6 row-start-23 col-span-4 row-span-2">
        <img className='w-full h-full' src="Friend's sketch.jpg" alt=""/>
      </div>
      <div className="col-start-1 row-start-24 col-span-5 row-span-3">
        <img className='w-full h-full' src="Friend hancky Display.jpg" alt=""/>
      </div>
      <div className="col-start-10 row-start-24 col-span-6 row-span-2">
        <img className='w-full h-full' src="Screen Printing Board.jpg" alt=""/>
      </div>
      <div className="col-start-15 row-start-24 col-span-2 row-span-2">
        <img className='w-full h-full' src="Girl Braids Sketch.jpg" alt=""/>
      </div>
      <div className="col-start-6 row-start-25 col-span-3 row-span-2">
        <img className='w-full h-full' src="Purse Painting.jpg" alt=""/>
      </div>
       */}
      </div>
    </>
  );
};

export default ArtPiecesContent;
