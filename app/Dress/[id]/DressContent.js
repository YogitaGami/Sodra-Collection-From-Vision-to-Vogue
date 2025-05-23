"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
// import { useCartItem } from "@/context/Context";
import AddItemToCart from "@/components/AddItemToCart";
import ToggleItemToFavorite from "@/components/ToggleItemToFavorite";
import DeliveryDatePicker from "@/components/DeliveryDatePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoader from "@/components/PageLoader";
import ZoomableImage from "@/components/ZoomAbleImage";
import Image from "next/image";

const DressContent = () => {
  const { id } = useParams(); //Extract 'id' from query params
  const [dress, setDress] = useState([]);
  const [selectedDays, setSelectedDays] = useState("3");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  // const {dispatch} = useCartItem()
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);

  useEffect(() => {
    const fetchDress = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/dresses/${id}`);
          setDress(res.data);
          setPrice(res.data?.price?.["3"] || 0);
        } catch (err) {
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
    setPrice(dress?.price?.[days] || 0); //Use optional chaining;
  };

  return (
    <div className="w-full flex pt-20 px-14 pb-5">
      <ToastContainer />
      <div className="w-[54%] overflow-auto">
        <div className="flex flex-wrap gap-4 items-start justify-start">
          {/* Show up to first 3 images */}
          {dress.imageId?.slice(0, 3).map((id, index) => (
            <ZoomableImage
              key={index}
              imageId={id}
              alt={`${dress.name} ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col w-[45%]">
        <div className="flex gap-3">
          <h2 className="font-bold text-3xl py-3">{dress.name}</h2>
          <ToggleItemToFavorite
            item={dress}
            selectedDays={selectedDays}
            selectedDeliveryDate={selectedDeliveryDate}
          />
        </div>
        <p className="">{dress.desc}</p>
        <div className="flex items-center gap-10 mt-7">
          <div className="font-semibold text-2xl">
            Rent: Rs.{dress?.price?.[selectedDays] || "N/A"}
          </div>
          <div className="text-sm">Retail: Rs.{dress.retail}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg">Refundable Deposit: Rs.{dress.deposit} </div>
          <div className="flex items-center gap-1">
            <span>
              <Image src="/sewing-needle.svg" alt="Fitting icon" width={18} height={18} />
            </span>
            <p className="text-sm">Custom Fitting {dress.fitting}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-7">
          <div className="font-semibold text-lg">Size</div>
          <div>{dress.size}</div>
        </div>
        <h3 className="font-semibold text-lg mt-4">RENT PERIOD</h3>
        <div className="flex gap-6 my-2">
          {dress?.price &&
            Object.entries(dress.price).map(([days, cost]) => (
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
          item={dress}
          selectedDays={selectedDays}
          selectedDeliveryDate={selectedDeliveryDate}
        />
        <div className="flex items-center gap-3 mt-8">
          <Image
            href={" "}
            src="/instagram (1).svg"
            alt="Instagram icon"
            width={25}
            height={25}
          ></Image>
          <p className="text-[12px]">Explore more on Instagram</p>
        </div>
        <div className="border-l-0 bg-[#54b7fa] h-[1px] w-full mt-8"></div>
        <div className="info mt-8">
          <h3 className="mb-2 text-lg font-semibold">Product Info</h3>
          <p>{dress.info}</p>
          <ul>
            <li>
              <span className="text-gray-600">Code:</span>
              {dress.code}
            </li>
            <li>
              <span className="text-gray-600">Color:</span>
              {dress.color}
            </li>
            <li>
              <span className="text-gray-600">Category:</span>
              {dress.category}
            </li>
            <li>
              <span className="text-gray-600">Tag:</span>
              {dress.tag}
            </li>
            <li>
              <span className="text-gray-600">Material:</span>
              {dress.material}
            </li>
            <li>
              <span className="text-gray-600">Designed By:</span>
              {dress.madeBy}
            </li>
          </ul>
        </div>
        <div className="font-semibold mt-6 mb-2">Stylist's Notes</div>
        <p>{dress.stylistNote}</p>
        <div className="font-semibold mt-6 mb-2">Care</div>
        <p>{dress.care}</p>
      </div>
    </div>
  );
};

export default DressContent;
