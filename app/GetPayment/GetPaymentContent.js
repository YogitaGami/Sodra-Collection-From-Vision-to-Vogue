"use client";
import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPriceDetails } from "@/redux/priceDetails/priceDetailsSlice";
import { updateOrder } from "@/redux/orders/ordersSlice";
import Script from "next/script";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import DisplayPriceDetails from "@/components/DisplayPriceDetails";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

const GetPaymentContent = () => {
  const { data: session, status } = useSession();
  const priceDetails = useSelector(selectPriceDetails);
  const cartItems = useSelector((state) => state.updateCart);
  const [Address, setAddress] = useState();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const userEmail = session?.user?.email;
        const res = await axios.get(`/api/address?email=${userEmail}`);
        setAddress(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchAddress();
    }
  }, [session]);
  console.log(Address);

  useEffect(() => {
      if(searchParams.get("paymentdone") == "true"){
      toast.info('Payment has been made', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
    }, [])

  if (loading) return <PageLoader />;
  
  const pay = async () => {
    try {
      const username = session.user.name;
      const amount = priceDetails.totalAmount;
      const dressDetails = cartItems;

      if (!Array.isArray(dressDetails) || dressDetails.length === 0) {
        throw new Error("Invalid cart items.");
      }

      const res = await axios.post("/api/payment/createOrder", {
        amount,
        username,
        dressDetails,
      });

      if (!res?.data?.id) {
        throw new Error("Failed to create Razorpay order.");
      }

      const orderId = res.data.id;
      console.log("Order created:", orderId);

      if (typeof window !== "undefined" && window.Razorpay) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_URL,
          amount:  Math.round(amount * 100),
          currency: "INR",
          name: "Sodra Collection",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: orderId,
          callback_url: `${process.env.NEXT_PUBLIC_URL}/api/payment/verifyPayment`,
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        toast.error("Razorpay SDK not loaded. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.message || "Payment failed!");
    }
  };

  return (
    <div className="py-28">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
      <div className="getPayment mx-auto w-1/2 flex justify-center items-center flex-col">
        <DisplayPriceDetails />
        <div className="addressSummary my-4">
          <h3 className="text-lg font-semibold my-2">Deliver To</h3>
          {Address ? (
            <p>
              {Address.name}, {Address.addressLine1}, {Address.city} -{" "}
              {Address.pinCode}
            </p>
          ) : (
            <p>Loading address...</p> // Optional loading state if address is not yet available
          )}
        </div>
        <button
          onClick={pay}
          type="button"
          className="bg-[#0680d0] text-white px-14 py-2 mx-16 my-8 rounded-md shadow-md hover:bg-[#44b1f9] transition-all duration-300"
        >
          Pay Now
        </button>
        <div className="secureBadge text-sm text-gray-500 mt-3">
          🔒 100% secure payments powered by Razorpay
        </div>
      </div>
    </div>
  );
};

export default GetPaymentContent;
