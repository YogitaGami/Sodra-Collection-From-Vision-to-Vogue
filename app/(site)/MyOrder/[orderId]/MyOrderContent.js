"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import moment from "moment";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";
import { toast } from "react-toastify";

export default function OrderDetailsContent() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log(orderId);
        const res = await axios.get(`/api/order/getUserOrders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        toast.info("Failed to fetch Order. Please try again.");
        console.error("Error fetching Order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <PageLoader />;
  if (!order) return <PageLoader />;
  

  return (
    <div className="py-28 max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Order Details</h1>

      <div className="bg-[#71c1f6] flex flex-col sm:flex-row gap-5 sm:gap-32 shadow rounded p-4 mb-6">
        <div>
          <p>
            <span className="font-semibold">Order ID:</span> {order.orderId}
          </p>
          <p>
            <span className="font-semibold">Username:</span> {order.username}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {order.status}
          </p>
          <p>
            <span className="font-semibold">Total Amount:</span> ₹{order.amount}
          </p>
          <p>
            <span className="font-semibold">Ordered On:</span>{" "}
            {moment(order.createdAt).format("MMMM Do YYYY, h:mm A")}
          </p>
        </div>
        <div>
          {order.address && (
            <div className="text-sm text-gray-700">
              <div>
                <strong>{order.address.addressType}</strong>
              </div>
              <div>
                <strong>{order.address.name}</strong> ({order.address.mobileNo})
              </div>
              <div>
                {order.address.addressLine1}, {order.address.addressLine2}
              </div>
              <div>
                {order.address.city},{order.address.state} - {order.address.pinCode}
              </div>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-lg sm:text-xl font-semibold mb-3">Ordered Items</h2>
      <div className="flex flex-wrap gap-6 border border-[#54b7fa] p-4 my-2 rounded shadow">
        {Array.isArray(order?.dressDetails) ? (
          order.dressDetails.map((item, index) => (
            <div key={index}>
              <DriveImage
                imageId={item.imageId}
                alt={item.name}
                height={128}
                width={128}
                className="object-cover"
              />
              <h3 className="text-xl font-bold ">{item.name}</h3>
              <p className="truncate overflow-hidden whitespace-nowrap w-52 sm:w-72">
                {item.desc}
              </p>
              <p>Price: ₹{item.price}</p>
              <p>Size: {item.size}</p>
              <p>Days: {item.days}</p>
              <p>Deposit: ₹{item.deposit}</p>
              <p>
                Delivery Date:{" "}
                {new Date(item.DeliveryDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No items in this order.</p>
        )}
      </div>
    </div>
  );
}
