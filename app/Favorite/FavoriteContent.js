"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleFavoriteItem,
  removeItem,
  clearFavorite,
} from "@/redux/updateFavorite/updateFavoriteSlice";
import { addItem } from "@/redux/updateCart/updateCartSlice";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";

const FavoriteContent = () => {
  const favoriteItems = useSelector((state) => state.updateFavorite);
  const cartItems = useSelector((state) => state.updateCart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Debugging: Log state updates
  useEffect(() => {
    console.log("Updated Favorite State:", favoriteItems);
  }, [favoriteItems]);

  useEffect(() => {
    console.log("Updated Cart State:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    // simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  const handleMoveToCart = (item) => {
    dispatch(removeItem(item.id)); // Remove from favorites
    if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
      dispatch(addItem({ ...item, quantity: 1 })); // Only add if not already in cart , Ensure a fresh copy with reset quantity
    }
  };

  return (
    <div className="py-20 mx-20">
      <h2 className="text-2xl font-bold my-8">Favorite List</h2>
      {favoriteItems.length === 0 ? (
        <p className="text-[#0680d0]">Your favorite list is empty.</p>
      ) : (
        <div className="flex flex-wrap gap-7">
          {favoriteItems.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-[#54b7fa] rounded-lg shadow-md"
            >
              <div className="!relative">
                <DriveImage
                  imageId={item.imageId}
                  alt={item.name}
                  height={240}
                  width={208}
                  className="border-[1px] border-[#54b7fa]"
                />
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="absolute top-0 right-0 m-1 size-6 bg-[#71c1f6] text-black rounded-full hover:bg-[#54b7fa]"
                >
                  X
                </button>
              </div>
              <div>
                <p className="font-semibold truncate overflow-hidden whitespace-nowrap w-52">
                  {item.name}
                </p>
                <p className="text-gray-600">Rs.{item.price}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="px-3 py-1 bg-[#0680d0] text-white rounded-md hover:bg-[#44b1f9]"
                >
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {favoriteItems.length > 0 && (
        <button
          onClick={() => dispatch(clearFavorite())}
          className="mt-4 px-6 py-2 bg-[#0680d0] text-white rounded-md hover:bg-[#44b1f9]"
        >
          Clear Favorite
        </button>
      )}
    </div>
  );
};

export default FavoriteContent;
