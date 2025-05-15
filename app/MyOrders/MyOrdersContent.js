"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import PageLoader from "@/components/PageLoader";

const MyOrdersContent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/order/getUserOrders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <PageLoader />;

  const markAsReceived = async (orderId) => {
    try {
      await axios.post("/api/order/markReceived", { orderId });
      // Update UI immediately after marking
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                status: "received",
                receivedAt: new Date().toISOString(),
              }
            : order
        )
      );
    } catch (error) {
      console.error("Failed to mark as received", error);
    }
  };
  const now = new Date();
  const filteredOrders = orders.filter((order) => {
    if (order.status !== "received") return true;

    const receivedAt = new Date(order.receivedAt);
    const diffMinutes = (now - receivedAt) / (1000 * 60);

    return diffMinutes < 60; // show only for 60 minutes
  });

  return (
    <>
      {filteredOrders.length === 0 ? (
        <p className="h-[85vh] w-full flex items-center justify-center">
          Your order is empty.
        </p>
      ) : (
        <>
          <div className="py-28 flex flex-col justify-center items-center mx-auto">
            <h2 className="text-xl font-semibold">My Orders</h2>
            {filteredOrders.map((order, index) => (
              <div
                key={index}
                className="py-10 px-20 m-5 border border-[#54b7fa] rounded shadow"
              >
                <p className="p-1">
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p className="p-1">
                  <strong>Amount:</strong> ₹{order.amount}
                </p>
                <p className="p-1">
                  <strong>Status:</strong> {order.status}
                </p>
                <div className="flex flex-col items-center justify-center">
                  <Link
                    href={`/MyOrder/${order.orderId}`}
                    className="text-[#54b7fa]"
                  >
                    view
                  </Link>

                  {order.status === "paid" && (
                    <button
                      className="bg-[#0680d0] text-white px-4 py-1 my-2 rounded"
                      onClick={() => markAsReceived(order.orderId)}
                    >
                      Mark as Received
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MyOrdersContent;
