"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import MeasurementForm from "@/components/MeasurementForm";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";
import Image from "next/image";

const MadeToOrderContent = () => {
  const { id } = useParams();
  const [madeToOrder, setMadeToOrder] = useState();
  const [selectedSize, setSelectedSize] = useState("S");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMadeToOrder = async () => {
      try {
        const res = await axios.get(`/api/madeToOrder/${id}`);
        setMadeToOrder(res.data);
        setPrice(res.data?.size?.["S"] || 0);
      } catch (err) {
        toast.info("Failed to fetch made-To-order. Please try again.");
        console.error("Error fetching madeToOrder:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMadeToOrder();
  }, [id]);
  console.log(madeToOrder);

  if (loading) return <PageLoader />;

  const handleSizeChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
    setPrice(madeToOrder?.size?.[size] || 0); //Use optional chaining;
  };

  return (
    <>
      <div className="px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-10 pt-24 sm:pt-20 px-4 sm:px-6 lg:px-14 pb-5">
          {/* Left Section: Image */}
          <div className="w-full lg:w-1/2 overflow-auto">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="inline-block max-w-full max-h-[90vh]">
                <DriveImage
                  imageId={madeToOrder.imageId}
                  alt={madeToOrder.name}
                  className="h-auto w-auto max-w-full max-h-[90vh] object-contain transition-transform duration-300 ease-in-out hover:scale-150"
                />
              </div>
            </div>
          </div>

          {/* Right Section: Details */}
          <div className="flex flex-col w-full lg:w-1/2">
            <div className="flex gap-3">
              <h2 className="font-bold text-xl sm:text-3xl py-3">
                {madeToOrder.name}
              </h2>
            </div>
            <p className="text-sm sm:text-base">{madeToOrder.desc}</p>

            <div className="font-semibold text-xl sm:text-2xl mt-7">
              Price: Rs. {price}
            </div>

            <div className="flex items-center gap-6 my-7 font-semibold text-base sm:text-lg">
              <div className="font-semibold">Type</div>
              <button>{madeToOrder.type}</button>
            </div>

            <h3 className="font-semibold text-lg">Size</h3>
            <div className="flex gap-6 my-2 flex-wrap">
              {madeToOrder?.size &&
                Object.entries(madeToOrder.size).map(([size, cost]) => (
                  <div key={size} className="flex gap-1 flex-col">
                    <h4>{size}</h4>
                    <input
                      type="radio"
                      name="rentalDays"
                      value={size}
                      checked={selectedSize === size}
                      onChange={handleSizeChange}
                    />
                  </div>
                ))}
            </div>

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

            <div className="border-l-0 bg-[#54b7fa] h-[1px] w-full mt-8"></div>

            <div className="info mt-8">
              <h3 className="mb-2 text-lg font-semibold">Product Info</h3>
              <p>{madeToOrder.info}</p>
              <ul className="text-sm sm:text-base space-y-1 mt-2">
                <li>
                  <span className="text-gray-600">Code:</span>{" "}
                  {madeToOrder.code}
                </li>
                <li>
                  <span className="text-gray-600">Category:</span>{" "}
                  {madeToOrder.category}
                </li>
                <li>
                  <span className="text-gray-600">Tag:</span> {madeToOrder.tag}
                </li>
                <li>
                  <span className="text-gray-600">Material:</span>{" "}
                  {madeToOrder.material}
                </li>
                <li>
                  <span className="text-gray-600">Designed By:</span>{" "}
                  {madeToOrder.madeBy}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
        <MeasurementForm dressId={madeToOrder._id} />
      </div>
    </>
  );
};

export default MadeToOrderContent;
