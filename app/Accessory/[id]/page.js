"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AddItemToCart from "@/components/AddItemToCart";
import ToggleItemToFavorite from "@/components/ToggleItemToFavorite";
import DeliveryDatePicker from "@/components/DeliveryDatePicker";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";

const Accessory = () => {
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
    setPrice(accessory?.price?.[days] || 0); //Use optional chaining;
  };

  return (
    <div className="w-full flex gap-10 pt-28 px-14 pb-5">
      <div className="w-[54%] overflow-auto">
        <div className="flex flex-wrap gap-6 items-start justify-start">
          {/* Show up to first 3 images */}
          {accessory.imageId?.slice(0, 3).map((id, index) => (
            <div key={index} className="inline-block max-w-full max-h-[90vh]">
              <DriveImage
                imageId={id}
                alt={`${accessory.name} ${index + 1}`}
                className="h-auto w-auto max-w-full max-h-[80vh] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="flex flex-wrap gap-4 h-screen">
          <div className="w-full max-h-full flex items-center justify-center">
            <div className="w-full h-auto">
              <DriveImage imageId={accessory.imageId} alt={accessory.name} />
            </div>
          </div> */}
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
      {/* </div> */}

      <div className="flex flex-col w-[45%]">
        <div className="flex gap-3">
          <h2 className="font-bold text-3xl py-3">{accessory.name}</h2>
          <ToggleItemToFavorite
            item={accessory}
            selectedDays={selectedDays}
            selectedDeliveryDate={selectedDeliveryDate}
          />
        </div>
        <p className="">{accessory.desc}</p>
        <div className="flex items-center gap-10 mt-7">
          <div className="font-semibold text-2xl">
            Rent: Rs.{accessory?.price?.[selectedDays] || "N/A"}
          </div>
          <div className="text-sm">Retail: Rs.{accessory.retail}</div>
        </div>
        <div className="flex items-center my-7 ">
          <div className="text-lg">
            Refundable Deposit: Rs.{accessory.deposit}{" "}
          </div>
        </div>
        <div className="flex items-center gap-6 font-semibold text-lg">
          <div className="font-semibold text-lg">Type</div>
          <button>{accessory.type}</button>
        </div>
        <h3 className="font-semibold text-lg mt-6">RENT PERIOD</h3>
        <div className="flex gap-6 my-2">
          {accessory?.price &&
            Object.entries(accessory.price).map(([days, cost]) => (
              <div key={days} className="flex gap-1 flex-col">
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

        <div>
          {/* Pass state setter to child component */}
          <DeliveryDatePicker
            selectedDays={selectedDays}
            onDateChange={(date) => setSelectedDeliveryDate(date)}
            selectedDeliveryDate={selectedDeliveryDate} // Pass selected date to child
          />
        </div>
        <AddItemToCart
          item={accessory}
          selectedDays={selectedDays}
          selectedDeliveryDate={selectedDeliveryDate}
        />
        <div className="mt-5">insta</div>
        <hr className="mt-14" />
        <div className="info mt-14">
          <h3 className="mb-2 text-lg font-semibold">Product Info</h3>
          <p>{accessory.info}</p>
          <ul>
            <li>
              <span className="text-gray-600">Code:</span>
              {accessory.code}
            </li>
            <li>
              <span className="text-gray-600">Category:</span>
              {accessory.category}
            </li>
            <li>
              <span className="text-gray-600">Tag:</span>
              {accessory.tag}
            </li>
            <li>
              <span className="text-gray-600">Material:</span>
              {accessory.material}
            </li>
            <li>
              <span className="text-gray-600">Designed By:</span>
              {accessory.madeBy}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Accessory;
