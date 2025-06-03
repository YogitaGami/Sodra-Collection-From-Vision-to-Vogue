"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AddItemToCart from "@/components/AddItemToCart";
import ToggleItemToFavorite from "@/components/ToggleItemToFavorite";
import DeliveryDatePicker from "@/components/DeliveryDatePicker";
import { toast } from "react-toastify";
import PageLoader from "@/components/PageLoader";
import ZoomableImage from "@/components/ZoomAbleImage";
import Image from "next/image";

const DressContent = () => {
  const { id } = useParams();
  const [dress, setDress] = useState([]);
  const [selectedDays, setSelectedDays] = useState("3");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);

  useEffect(() => {
    const fetchDress = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/dresses/${id}`);
          setDress(res.data);
          setPrice(res.data?.price?.["3"] || 0);
        } catch (err) {
          toast.info("Failed to fetch dress. Please try again.");
          console.error("Error fetching dress:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDress();
  }, [id]);

  if (loading) return <PageLoader />;

  const handleDaysChange = (event) => {
    const days = event.target.value;
    setSelectedDays(days);
    setPrice(dress?.price?.[days] || 0);
    toast.info("Selected rental days updated and price adjusted.");
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 pt-16 sm:pt-20 px-4 md:px-14 pb-5">
      {/* Images */}
      <div className="w-full md:w-[54%] overflow-auto">
        <div className="flex flex-wrap sm:gap-4 gap-2 items-start md:justify-start">
          {dress.imageId?.slice(0, 3).map((id, index) => (
            <ZoomableImage
              key={index}
              imageId={id}
              alt={`${dress.name} ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col w-full md:w-[45%]">
        <div className="flex gap-3 flex-wrap items-center">
          <h2 className="font-bold text-2xl sm:text-3xl py-3">{dress.name}</h2>
          <ToggleItemToFavorite
            item={dress}
            selectedDays={selectedDays}
            selectedDeliveryDate={selectedDeliveryDate}
          />
        </div>

        <p className="text-sm sm:text-base">{dress.desc}</p>

        <div className="flex flex-wrap items-center gap-4 mt-7">
          <div className="font-semibold text-lg sm:text-xl">
            Rent: Rs.{price || "N/A"}
          </div>
          <div className="text-sm">Retail: Rs.{dress.retail}</div>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-4 gap-3">
          <div className="text-base">Refundable Deposit: Rs.{dress.deposit}</div>
          <div className="flex items-center gap-2 text-sm">
            <Image
              src="/sewing-needle.svg"
              alt="Fitting icon"
              width={18}
              height={18}
            />
            <p>Custom Fitting {dress.fitting}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <span className="font-semibold text-lg">Size:</span>
          <span>{dress.size}</span>
        </div>

        <h3 className="font-semibold text-lg mt-6">RENT PERIOD</h3>
        <div className="flex flex-wrap gap-6 my-3">
          {dress?.price &&
            Object.entries(dress.price).map(([days, cost]) => (
              <div key={days} className="flex flex-col gap-1 items-center">
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

        <DeliveryDatePicker
          selectedDays={selectedDays}
          onDateChange={setSelectedDeliveryDate}
          selectedDeliveryDate={selectedDeliveryDate}
        />

        <AddItemToCart
          item={dress}
          selectedDays={selectedDays}
          selectedDeliveryDate={selectedDeliveryDate}
        />

        {/* Instagram Link */}
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
        <div className="mt-8 text-sm sm:text-base">
          <h3 className="mb-2 text-lg font-semibold">Product Info</h3>
          <p>{dress.info}</p>
          <ul className="mt-2 space-y-1">
            <li><span className="text-gray-600">Code:</span> {dress.code}</li>
            <li><span className="text-gray-600">Color:</span> {dress.color}</li>
            <li><span className="text-gray-600">Category:</span> {dress.category}</li>
            <li><span className="text-gray-600">Tag:</span> {dress.tag}</li>
            <li><span className="text-gray-600">Material:</span> {dress.material}</li>
            <li><span className="text-gray-600">Designed By:</span> {dress.madeBy}</li>
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Stylist's Notes</h4>
          <p>{dress.stylistNote}</p>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Care</h4>
          <p>{dress.care}</p>
        </div>
      </div>
    </div>
  );
};

export default DressContent;
