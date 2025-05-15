import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/updateCart/updateCartSlice";

const CartItems = ({ item}) => {
  // Ensure priceMap exists before accessing its keys
  const dispatch = useDispatch();

  const hasPriceMap = item.priceMap && Object.keys(item.priceMap).length > 0;
  const initialDays = hasPriceMap ? item.days || Object.keys(item.priceMap)[0] : null;

  const [selectedDays, setSelectedDays] = useState(item.days);
  const [price, setPrice] = useState(hasPriceMap ? item.priceMap[initialDays] : item.price || 0);

  // useEffect(() => {
  //   const updatedDays =
  //     item.days || (item.priceMap ? Object.keys(item.priceMap)[0] : null);
  //   setSelectedDays(updatedDays);
  //   setPrice(item.priceMap?.[updatedDays] || 0);

  //   console.log("Updated priceMap:", item.priceMap);
  // }, [item.days, item.priceMap]);


  const handleDaysChange = (event) => {
  const newDays = event.target.value;
  setSelectedDays(newDays);
  setPrice(item.priceMap?.[newDays] || 0);

  dispatch(
    addItem({
      ...item,
      selectedDays: newDays,
      price: item.priceMap?.[newDays] || 0,
    })
  );
};

  console.log("Current priceMap:", item.priceMap);

  return (
    <div className="cart-item border-b py-4">
      <h2 className="text-lg font-semibold">{item.name}</h2>
      <p>{item.desc}</p>
      <p>{item.size}</p>
      <p>{item.quantity}</p>

      {hasPriceMap ? (
      <div className="flex gap-2 items-center">
        {/* Rental period selection (Dropdown) */}
        <select
          value={selectedDays}
          onChange={handleDaysChange}
          className="border border-[#0680d0] p-1 rounded text-sm bg-white text-[#0680d0] focus:ring-[#54b7fa]  appearance-none"
        >
          {item.priceMap &&
            Object.keys(item.priceMap).map((days) => (
              <option className="text-[#0680d0]" key={days} value={days}>
                {days} Days
              </option>
            ))}
        </select>

        <p>Price: <span className="font-semibold">{price}</span></p>
      </div>
      ): (
        <div>Price: <span className="font-semibold">{item.price}</span></div>
      )}
    </div>
  );
};

export default CartItems;
