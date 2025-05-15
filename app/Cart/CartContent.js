"use client"; // Make this a Client Component

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  toggleItemChecked,
  toggleAllItemsChecked,
  clearCart,
} from "@/redux/updateCart/updateCartSlice";
import { selectPriceDetails } from "@/redux/updateCart/updateCartSlice"
import { toggleFavoriteItem } from "@/redux/updateFavorite/updateFavoriteSlice";
import PlaceOrder from "@/components/PlaceOrder";
import CartItems from "@/components/CartItems";
import DisplayPriceDetails from "@/components/DisplayPriceDetails";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";

const CartContent = () => {
  const cartItems = useSelector((state) => state.updateCart);
  const favItems = useSelector((state) => state.updateFavorite);
  const priceDetails = useSelector(selectPriceDetails);
  const dispatch = useDispatch();
  // const [cart, setCart] = useState(cartItems);
  const [loading, setLoading] = useState(true);

  // Sync price details whenever cart changes
  // useEffect(() => {
  //   dispatch(updatePriceDetails(priceDetails));
  //   console.log("priceDetailsp", priceDetails);
  // }, [cartItems, dispatch]);

  useEffect(() => {
    console.log("Updated Favorite State:", favItems);
  }, [favItems]);

  useEffect(() => {
    console.log("Updated Cart State:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    // simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  // const [AllSelectedCartItems, setAllSelectedCartItems] = useState(
  //   cartItems.map((item) => ({ ...item, checked: true }))
  // );

  // const updateRentalDays = (itemId, newDays) => {
  //   // Update local cart state
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === itemId ? { ...item, selectedDays: newDays } : item
  //     )
  //   );
  //   // Update Redux state
  //   dispatch(
  //     addItem({
  //       ...cart.find((item) => item.id === itemId),
  //       selectedDays: newDays,
  //     })
  //   );
  // };

  // // Sync Redux cart updates with local state
  // useEffect(() => {
  //   setCart(
  //     cartItems.map((item) => ({ ...item, checked: true }))
  //   );
  // }, [cartItems]);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const checkedItems = cartItems.filter((item) => item.checked);
  const selectedItemQuantity = checkedItems.reduce((total, item) => total + item.quantity, 0);
  const allChecked = selectedItemQuantity === totalQuantity;


  // const handleItemSelect = (id) => {
  //   setCart(
  //     cart.map((item) =>
  //       item.id === id ? { ...item, checked: !item.checked } : item
  //     )
  //   );
  // };

  const handleItemSelect = (id) => {
    dispatch(toggleItemChecked(id));
  };

  // const handleToggleSelectedItems = (event) => {
  //   const isChecked = event.target.checked;
  //   setCart(cart.map((item) => ({ ...item, checked: isChecked })));
  // };

  const handleToggleSelectedItems = (event) => {
    dispatch(toggleAllItemsChecked(event.target.checked));
  };

  const handleRemoveCheckedItems = () => {
    const checkedItemIds = cartItems
      .filter((item) => item.checked)
      .map((item) => item.id); //checkedItemIds now contains an array of IDs of all checked items.
    dispatch(removeItem(checkedItemIds)); // Remove from Redux
    // setCart(cart.filter(item => !item.checked));
    console.log("Updated Cart State:", cart);
  };

  const handleMoveToFavorites = () => {
    const checkedItems = cartItems.filter((item) => item.checked);
    if (checkedItems.length === 0) return;
    checkedItems.forEach((item) => {
      if (!favItems.some((favItem) => favItem.id === item.id)) {
        dispatch(toggleFavoriteItem(item)); // Only add if not already in favorites
      }
    });
    const checkedItemIds = checkedItems.map((item) => item.id);
    dispatch(removeItem(checkedItemIds));
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <p className="h-[62vh] w-full flex items-center justify-center">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="py-28 mx-auto flex justify-center gap-3">
            <div className="cartitems w-[40%]">
              {/* <div className="my-5 delivery flex items-center justify-between bg-[#54b7fa] px-3 py-2 border-0 text-[14px]">
          <h4>Check Delivery time and Services</h4>
          <button className="text-[#0680d0] border-[2px] border-[#0680d0] px-2 py-1 bg-[#71c1f6] text-[14px]">
            Enter Pin Code
          </button>
        </div> */}

              <div className="flex justify-between items-center mt-12">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="mr-3 size-4 accent-[#54b7fa]"
                    checked={
                      allChecked
                    }
                    onChange={handleToggleSelectedItems}
                  />
                  <div className="font-bold text-lg">
                    {selectedItemQuantity}/{totalQuantity}
                  </div>
                </div>
                <div className="flex ">
                  <button
                    onClick={handleRemoveCheckedItems}
                    className="px-6 py-2"
                  >
                    Remove
                  </button>
                  <div className="border-l-0 bg-[#54b7fa] w-[1px]"></div>
                  <button onClick={handleMoveToFavorites} className="px-6 py-2">
                    Move to Favorite
                  </button>
                </div>
              </div>
              {/* {cart.map((item) => {
                const isChecked =
                  cart.find((selectedItem) => selectedItem.id === item.id)
                    ?.checked ?? true; */}
              {cartItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 my-2 px-3 py-4 border-[1px] border-[#54b7fa]"
                  >
                    <div className="!relative">
                      <DriveImage
                        imageId={item.imageId}
                        alt={item.name}
                        height={176}
                        width={128}
                        className="border-[1px] border-[#54b7fa]"
                      />
                      <input
                        type="checkbox"
                        className="absolute top-2 left-1 size-4 accent-[#54b7fa]"
                        checked={item.checked} //isChecked
                        onChange={() => handleItemSelect(item.id)}
                      />
                    </div>
                    {/* ✅ Directly render CartItems instead of extra map */}
                    <CartItems item={item} />

                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="ml-auto text-black px-3"
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="border-l-0 bg-[#54b7fa] w-[1px]"></div>
            <div className="amount w-[30%]">
              {checkedItems.length !== 0 && (
                <>
                  <DisplayPriceDetails priceDetails={priceDetails} />
                  <PlaceOrder />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartContent;
