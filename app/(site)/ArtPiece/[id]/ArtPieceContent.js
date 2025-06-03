"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AddItemToCart from "@/components/AddItemToCart";
import ToggleItemToFavorite from "@/components/ToggleItemToFavorite";
import PageLoader from "@/components/PageLoader";
import ZoomableImage from "@/components/ZoomAbleImage";
import Image from "next/image";
import { toast } from "react-toastify";

const ArtPieceContent = () => {
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
          toast.error("Failed to fetch artPiece. Please try again.");
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
    <div className="w-full flex flex-col md:flex-row gap-10 pt-24 px-4 md:px-14 pb-10">
      {/* Left Image Section */}
      <div className="w-full md:w-[54%] overflow-auto">
        <div className="flex flex-wrap sm:gap-4 gap-2 items-start justify-start">
          {artPiece.imageId?.slice(0, 3).map((id, index) => (
            <ZoomableImage
              key={index}
              imageId={id}
              alt={`${artPiece.name} ${index + 1}`}
              className=" object-cover"
            />
          ))}
        </div>
      </div>

      {/* Right Details Section */}
      <div className="w-full md:w-[45%] flex flex-col">
        <div className="flex gap-3 flex-wrap items-center">
          <h2 className="font-bold text-2xl md:text-3xl py-3">{artPiece.name}</h2>
          <ToggleItemToFavorite item={artPiece} />
        </div>

        <p className="text-base">{artPiece.desc}</p>

        <div className="font-semibold text-xl md:text-2xl mt-6">
          Price: Rs.{artPiece.price || "N/A"}
        </div>

        <div className="flex items-center gap-4 mt-6">
          <div className="font-semibold text-lg">Available:</div>
          <div>{artPiece.isAvailable}</div>
        </div>

        <div className="flex items-center gap-4 my-6 font-semibold text-lg">
          <div>Type:</div>
          <button>{artPiece.type}</button>
        </div>

        <AddItemToCart item={artPiece} />

        {/* Instagram */}
        <div className="flex items-center gap-3 mt-8">
          <Image
            src="/instagram (1).svg"
            alt="Instagram icon"
            width={25}
            height={25}
          />
          <a
            href="https://www.instagram.com/world_of_arts321?utm_source=qr&igsh=NzZ1NXN2NWx3Z3ox"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0680d0] hover:text-[#44b1f9]"
          >
            Explore more on Instagram
          </a>
        </div>

        <div className="bg-[#54b7fa] h-[1px] w-full mt-8"></div>

        {/* Info */}
        <div className="info mt-8">
          <h3 className="mb-2 text-lg font-semibold">Product Info</h3>
          <p className="mb-2">{artPiece.info}</p>
          <ul className="text-sm space-y-1">
            <li>
              <span className="text-gray-600">Code:</span> {artPiece.code}
            </li>
            <li>
              <span className="text-gray-600">Category:</span> {artPiece.category}
            </li>
            <li>
              <span className="text-gray-600">Tag:</span> {artPiece.tag}
            </li>
            <li>
              <span className="text-gray-600">Material:</span> {artPiece.material}
            </li>
            <li>
              <span className="text-gray-600">Designed By:</span> {artPiece.madeBy}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArtPieceContent;
