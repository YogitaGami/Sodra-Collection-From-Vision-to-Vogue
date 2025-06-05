"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AddItemToCart from "@/components/AddItemToCart";
import ToggleItemToFavorite from "@/components/ToggleItemToFavorite";
import DeliveryDatePicker from "@/components/DeliveryDatePicker";
import PageLoader from "@/components/PageLoader";
import ZoomableImage from "@/components/ZoomAbleImage";
import Image from "next/image";

const AccessoryContent = () => {
  const { id } = useParams();
  const [accessory, setaccessory] = useState();
  const [selectedDays, setSelectedDays] = useState("3");
  const [price, setPrice] = useState(0);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessory = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/accessory/${id}`);
          setaccessory(res.data);
        } catch (err) {
          toast.info("Failed to fetch accessory. Please try again.");
          console.error("Error fetching accessory:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAccessory();
  }, [id]);

  if (loading) return <PageLoader />;

  const handleDaysChange = (event) => {
    const days = event.target.value;
    setSelectedDays(days);
    setPrice(accessory?.price?.[days] || 0);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-10 pt-24 sm:pt-20 px-4 sm:px-6 md:px-14 pb-5">
      {/* Image Section */}
      <div className="w-full md:w-[54%] overflow-auto">
        <div className="flex flex-wrap sm:gap-4 gap-2 items-start justify-start">
          {accessory.imageId?.slice(0, 3).map((id, index) => (
            <ZoomableImage
              key={index}
              imageId={id}
              alt={`${accessory.name} ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="flex flex-col w-full md:w-[45%]">
        <div className="flex gap-3 flex-wrap items-center">
          <h2 className="font-bold text-xl sm:text-3xl py-3">{accessory.name}</h2>
          <ToggleItemToFavorite
            item={accessory}
            selectedDays={selectedDays}
            selectedDeliveryDate={selectedDeliveryDate}
          />
        </div>
        <p className="mt-2 text-sm sm:text-base">{accessory.desc}</p>

        <div className="flex flex-wrap items-center gap-4 mt-6">
          <div className="font-semibold text-lg sm:text-xl">
            Rent: Rs.{accessory?.price?.[selectedDays] || "N/A"}
          </div>
          <div className="text-sm">Retail: Rs.{accessory.retail}</div>
        </div>

        <div className="my-4">
          <div className="text-sm sm:text-lg">
            Refundable Deposit: Rs.{accessory.deposit}
          </div>
        </div>

        <div className="flex items-center gap-4 font-semibold text-base sm:text-lg">
          <span>Type:</span>
          <button>{accessory.type}</button>
        </div>

        <h3 className="font-semibold text-base sm:text-lg mt-6">RENT PERIOD</h3>
        <div className="flex flex-wrap gap-6 my-2">
          {accessory?.price &&
            Object.entries(accessory.price).map(([days, cost]) => (
              <div key={days} className="flex flex-col gap-1">
                <h4>{days} Days</h4>
                <input
                  type="radio"
                  name="rentalDays"
                  value={days}
                  checked={selectedDays === days}
                  onChange={handleDaysChange}
                />
              </div>
            ))}
        </div>

        <div className="mt-4">
          <DeliveryDatePicker
            selectedDays={selectedDays}
            onDateChange={(date) => setSelectedDeliveryDate(date)}
            selectedDeliveryDate={selectedDeliveryDate}
          />
        </div>

        <AddItemToCart
          item={accessory}
          selectedDays={selectedDays}
          selectedDeliveryDate={selectedDeliveryDate}
        />

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

        {/* Info Section */}
        <div className="info mt-8">
          <h3 className="mb-2 text-base sm:text-lg font-semibold">Product Info</h3>
          <p className="text-sm sm:text-base">{accessory.info}</p>
          <ul className="mt-2 text-sm sm:text-base space-y-1">
            <li><span className="text-gray-600">Code:</span> {accessory.code}</li>
            <li><span className="text-gray-600">Category:</span> {accessory.category}</li>
            <li><span className="text-gray-600">Tag:</span> {accessory.tag}</li>
            <li><span className="text-gray-600">Material:</span> {accessory.material}</li>
            <li><span className="text-gray-600">Designed By:</span> {accessory.madeBy}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccessoryContent;
