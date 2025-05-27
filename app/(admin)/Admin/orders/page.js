"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetch("/api/order/allOrders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status === statusFilter)
      );
    }
  }, [statusFilter, orders]);

  if (loading) return <PageLoader />;

  const markAsDelivered = async (orderId) => {
    try {
      const res = await axios.post("/api/order/markDelivered", { orderId });

      if (res.data?.success) {
        toast.info("Order marked as delivered!");
        // Optionally update local UI state if needed
      } else {
        toast.info("Failed to mark as delivered.");
      }
    } catch (error) {
      console.error("Error marking as delivered:", error);
      toast.info("Unauthorized or server error.");
    }
  };

  const deleteOrder = async (id) => {
    setLoading(true);
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`/api/order/allOrders/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.info("Deleted successfully");
        setOrders((prev) => prev.filter((order) => order._id !== id));
      } else {
        toast.info("Delete failed");
      }
    } catch {
      toast.info("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="received">Received</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Created At</th>
                <th className="p-2 border">Items</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-2 border">{order.orderId}</td>
                  <td className="p-2 border">{order.username}</td>
                  <td className="p-2 border">₹{order.amount}</td>
                  <td className="p-2 border capitalize">{order.status}</td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 border text-sm">
                    {order.dressDetails?.map((item, i) => (
                      <div key={i} className="mb-2">
                        <div className="font-semibold">{item.name}</div>
                        <div>Type: {item.collectionType}</div>

                        {item.collectionType !== "ArtPieces" ? (
                          <>
                            <div>Days: {item.days}</div>
                            <div>
                              Delivery:{" "}
                              {new Date(item.DeliveryDate).toLocaleDateString()}
                            </div>
                            <div>
                              Return:{" "}
                              {item.returnDate
                                ? new Date(item.returnDate).toLocaleDateString()
                                : "N/A"}
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              Start:{" "}
                              {item.startDate
                                ? new Date(item.startDate).toLocaleDateString()
                                : "N/A"}
                            </div>
                            <div>
                              Delivery:{" "}
                              {new Date(item.DeliveryDate).toLocaleDateString()}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </td>

                  <td className="p-2 border text-sm">
                    {order.address ? (
                      <div>
                        <div>
                          <strong>{order.address.addressType}</strong>
                        </div>
                        <div>
                          <strong>{order.address.name}</strong> (
                          {order.address.mobileNo})
                        </div>
                        <div>
                          {order.address.addressLine1}, {order.address.addressLine2}
                        </div>
                        <div>
                          {order.address.city} - {order.address.pinCode}
                        </div>
                      </div>
                    ) : (
                      <div className="text-red-500">No address</div>
                    )}
                  </td>
                  <td className="p-2 border space-y-2">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded block w-full"
                    >
                      Delete
                    </button>

                    {/* Show Mark as Delivered only for 'paid' status */}
                    {order.status === "received" && (
                      <button
                        onClick={() => markAsDelivered(order.orderId)}
                        className="bg-green-600 text-white px-3 py-1 rounded block w-full"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
