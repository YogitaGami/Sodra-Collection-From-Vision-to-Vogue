"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import MeasurementForm from "@/components/MeasurementForm";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";

const MadeToOrder = () => {
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
        <div className="w-full flex gap-10 pt-28 px-14 pb-5">
          <div className="w-[54%] overflow-auto">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="inline-block max-w-full max-h-[90vh]">
                <DriveImage
                  imageId={madeToOrder.imageId}
                  alt={madeToOrder.name}
                  className="h-auto w-auto max-w-full max-h-[90vh] object-contain"
                />
              </div>
            </div>
            {/* <div className="flex flex-wrap gap-4 h-screen">
              <DriveImage
                imageId={madeToOrder.imageId}
                alt={madeToOrder.name}
                className="w-full h-full object-contain"
              /> */}
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
          </div>
          <div className="flex flex-col w-[45%]">
            <div className="flex gap-3">
              <h2 className="font-bold text-3xl py-3">{madeToOrder.name}</h2>
            </div>
            <p className="">{madeToOrder.desc}</p>
            <div className="font-semibold text-2xl mt-7">
              Price: Rs. {price}
            </div>
            <div className="flex items-center gap-6 my-7  font-semibold text-lg">
              <div className="font-semibold text-lg">Type</div>
              <button>{madeToOrder.type}</button>
            </div>
            <h3 className="font-semibold text-lg">Size</h3>
            <div className="flex gap-6 my-2">
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
            <div className="mt-5">insta</div>
            <hr className="mt-14" />
            <div className="info mt-14">
              <h3 className="mb-2 text-lg font-semibold">Product Info</h3>
              <p>{madeToOrder.info}</p>
              <ul>
                <li>
                  <span className="text-gray-600">Code:</span>
                  {madeToOrder.code}
                </li>
                <li>
                  <span className="text-gray-600">Category:</span>
                  {madeToOrder.category}
                </li>
                <li>
                  <span className="text-gray-600">Tag:</span>
                  {madeToOrder.tag}
                </li>
                <li>
                  <span className="text-gray-600">Material:</span>
                  {madeToOrder.material}
                </li>
                <li>
                  <span className="text-gray-600">Designed By:</span>
                  {madeToOrder.madeBy}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <MeasurementForm dressId={madeToOrder._id} />
      </div>
    </>
  );
};

export default MadeToOrder;
