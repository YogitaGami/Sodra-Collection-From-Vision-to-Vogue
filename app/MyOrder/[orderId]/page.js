"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import moment from "moment";
import PageLoader from "@/components/PageLoader";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!orderId) return;
  //   const fetchOrder = async () => {
  //     try {
  //       const res = await axios.get(`/api/order/getUserOrders/${orderId}`)
  //       setOrder(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchOrder();
  // }, [orderId]);

  useEffect(() => {
      const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/order/getUserOrders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching Order:",err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    }, [orderId]);
  
  if (loading) return <PageLoader />;
  
  return (
    <div className="py-28 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="bg-[#71c1f6] shadow rounded p-4 mb-6">
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

      <h2 className="text-xl font-semibold mb-3">Ordered Items</h2>
      <div className="space-y-4">
        {Array.isArray(order?.dressDetails) ? (
          order.dressDetails.map((item, index) => (
            <div key={index} className="border border-[#54b7fa] p-4 my-2 rounded shadow">
              {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
                No Image
              </div>
            )}
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p>{item.desc}</p>
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
