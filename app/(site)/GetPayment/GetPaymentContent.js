"use client";
import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPriceDetails } from "@/redux/updateCart/updateCartSlice";
import Script from "next/script";
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

  if (loading) return <PageLoader />;

  const pay = async () => {
    setLoading(true);
    try {
      const username = session.user.name;
      const amount = priceDetails.totalAmount;
      const dressDetails = cartItems;
      const id = Address._id
      const name = Address.name;
      const email = session.user.email;
      const mobileNo = Address.mobileNo;

      if (!amount || !username) {
        toast.error("Missing payment details. Please try again.");
        return;
      }

      if (!Array.isArray(dressDetails) || dressDetails.length === 0) {
        throw new Error("Invalid cart items.");
      }

      const res = await axios.post("/api/payment/createOrder", {
        amount,
        username,
        dressDetails,
        userId: session?.user?.id,
        addressId: id,
      });

      if (!res?.data?.id) {
        throw new Error("Failed to create Razorpay order.");
      }

      const orderId = res.data.id;
      console.log("Order created:", orderId);

      if (typeof window !== "undefined" && window.Razorpay) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_URL,
          amount: Math.round(amount * 100),
          currency: "INR",
          name: "Sodra Collection",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: orderId,
          callback_url: `${process.env.NEXT_PUBLIC_URL}/api/payment/verifyPayment`,
          prefill: {
            name: name,
            email: email,
            contact: mobileNo,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#0680d0",
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
    setLoading(false);
  };

  return (
    <div className="py-28">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
        onError={() => {
          toast.error("Failed to load Razorpay SDK.");
        }}
      />
      <div className="getPayment mx-auto w-full sm:w-[70%] md:w-1/2 flex justify-center items-center flex-col">
        <DisplayPriceDetails priceDetails={priceDetails} />
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
          disabled={loading}
          className={`w-fit px-7 sm:px-14 py-1 sm:py-2 rounded-md shadow-md transition-all duration-300 text-white ${
            loading
              ? "bg-[#90ccf4] cursor-not-allowed"
              : "bg-[#0680d0] hover:bg-[#44b1f9]"
          }`}
        >
          {loading ? "Paying..." : "Pay now"}
        </button>
        <div className="secureBadge text-sm text-gray-500 mt-3">
          🔒 100% secure payments powered by Razorpay
        </div>
      </div>
    </div>
  );
};

export default GetPaymentContent;
