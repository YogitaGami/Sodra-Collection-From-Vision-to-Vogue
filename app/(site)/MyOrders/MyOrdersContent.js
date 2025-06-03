"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import PageLoader from "@/components/PageLoader";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "@/redux/updateCart/updateCartSlice";
import { toast } from "react-toastify";

const MyOrdersContent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.updateCart);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const isPaymentDone = searchParams.get("paymentdone") === "true";
    if (isPaymentDone) {
      toast.info("Payment successful! Your order has been placed.");

      cartItems
      .filter((item) => item.checked)
      .forEach((item) => {
        dispatch(removeItemFromCart(item.id));
      });

      // Optional: remove query param from URL
      const url = new URL(window.location);
      url.searchParams.delete("paymentdone");
      window.history.replaceState({}, "", url);
    }
  }, [searchParams, cartItems, dispatch]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/order/getUserOrders");
        setOrders(res.data);
      } catch (err) {
        toast.info("Failed to fetch orders. Please try again.")
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <PageLoader />;

  const confirmReceived = async (orderId) => {
    await axios.post("/api/order/markReceived", { orderId });
  };
  const now = new Date();
  const filteredOrders = orders.filter((order) => {
    if (order.status !== "completed") return true;
    // const receivedAt = new Date(order.receivedAt);
    // const diffMinutes = (now - receivedAt) / (1000 * 60);

    // return diffMinutes < 60; // show only for 60 minutes
  });

  return (
    <>
      {filteredOrders.length === 0 ? (
        <p className="min-h-[85vh] w-full flex items-center justify-center">
          Your order is empty.
        </p>
      ) : (
        <>
          <div className="py-28 flex flex-col justify-center items-center mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold">My Orders</h2>
            {filteredOrders.map((order, index) => (
              <div
                key={index}
                className="py-5 sm:py-10 px-8 sm:px-20 m-2 sm:m-5 border border-[#54b7fa] rounded shadow"
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
                      onClick={() => confirmReceived(order.orderId)}
                    >
                      Confirm Received
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
