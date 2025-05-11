"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AddItemToCart from "@/components/AddItemToCart";
import ToggleItemToFavorite from "@/components/ToggleItemToFavorite";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";

const ArtPiece = () => {
  const { id } = useParams();
  const [artPiece, setartPiece] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtPiece = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/artPiece/${id}`);
          setartPiece(res.data);
        } catch (err) {
          console.error("Error fetching artPiece:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArtPiece();
  }, [id]);

  if (loading) return <PageLoader />;

  return (
    <div className="w-full flex gap-10 pt-28 px-14 pb-5">
      <div className="w-[54%] overflow-auto">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="inline-block max-w-full max-h-[90vh]">
            <DriveImage
              imageId={artPiece.imageId}
              alt={artPiece.name}
              className="h-auto w-auto max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
        {/* <img
            className="w-[45%] object-contain border-2 border-pink-300"
            src="Ravina2.jpg"
            alt=""
          />
          <img
            className="w-[45%] object-contain border-2 border-pink-300"
            src="Ravina2.jpg"
            alt=""
          /> */}
      </div>
      <div className="flex flex-col w-[45%]">
        <div className="flex gap-3">
          <h2 className="font-bold text-3xl py-3">{artPiece.name}</h2>
          <ToggleItemToFavorite item={artPiece} />
        </div>
        <p className="">{artPiece.desc}</p>
        <div className="font-semibold text-2xl mt-7">
          Price: Rs.{artPiece.price || "N/A"}
        </div>
        <div className="flex items-center gap-6 mt-7">
          <div className="font-semibold text-lg">Available</div>
          <div>{artPiece.isAvailable}</div>
        </div>
        <div className="flex items-center gap-6 my-7  font-semibold text-lg">
          <div className="font-semibold text-lg">Type</div>
          <button>{artPiece.type}</button>
        </div>
        <AddItemToCart item={artPiece} />
        <div className="mt-5">insta</div>
        <hr className="mt-14" />
        <div className="info mt-14">
          <h3 className="mb-2 text-lg font-semibold">Product Info</h3>
          <p>{artPiece.info}</p>
          <ul>
            <li>
              <span className="text-gray-600">Code:</span>
              {artPiece.code}
            </li>
            <li>
              <span className="text-gray-600">Category:</span>
              {artPiece.category}
            </li>
            <li>
              <span className="text-gray-600">Tag:</span>
              {artPiece.tag}
            </li>
            <li>
              <span className="text-gray-600">Material:</span>
              {artPiece.material}
            </li>
            <li>
              <span className="text-gray-600">Designed By:</span>
              {artPiece.madeBy}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArtPiece;
