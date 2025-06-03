import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/updateCart/updateCartSlice";
import axios from "axios";
import { toast } from "react-toastify";

const AddItemToCart = ({ item, selectedDays, selectedDeliveryDate }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const checkAvailability = async () => {
    try {
      if (item.collectionType === "ArtPieces") {
        // Static availability for artpieces
        return item.isAvailable;
      }

      if (item.collectionType !== "ArtPieces") {
        if (!selectedDeliveryDate || !selectedDays) {
          toast.info("Please select rental days and delivery date!");
          return false;
        }
      }

      const endpoint =
        item.collectionType === "Accessories"
          ? "/api/accessory/check-availability"
          : "/api/dresses/check-availability";

      const res = await axios.post(endpoint, {
        id: item._id,
        startDate: selectedDeliveryDate,
        days: selectedDays,
      });

      return res.data.available;
    } catch (error) {
      toast.info("Error checking item availability. Please try again")
      console.error("Error checking availability:", error);
      return false;
    }
  };

  const handleAddCart = async () => {
    setLoading(true);
    const isAvailable = await checkAvailability();

    if (!isAvailable) {
      setLoading(false);
      toast.info("This item is not available for the selected dates or is sold.");
      return;
    }

    const baseItem = {
      id: item._id,
      imageId: item.imageId?.[0],
      name: item.name,
      desc: item.desc,
      price:
        typeof item.price === "object"
          ? (item.price[selectedDays] ?? 0)
          : item.price || 0,
      priceMap: { ...item.price },
      size: item.size,
      deposit: item.deposit || 0,
      collectionType: item.collectionType,
    };

    // Only add rental info for dresses and accessories
    if (item.collectionType !== "ArtPieces") {
      baseItem.days = selectedDays;
      baseItem.DeliveryDate = selectedDeliveryDate;
    }

    dispatch(addItem(baseItem));
    console.log("Added to cart:", baseItem);
    toast.info("Item added to cart!");
    setLoading(false);
  };

  return (
    <button
      onClick={handleAddCart}
      disabled={loading}
      className={`w-fit px-10 sm:px-14 py-1 sm:py-2 rounded-md shadow-md transition-all duration-300 text-white ${
        loading
          ? "bg-[#90ccf4] cursor-not-allowed"
          : "bg-[#0680d0] hover:bg-[#44b1f9]"
      }`}
    >
      {loading ? "Adding........" : "Add to Cart"}
    </button>
  );
};

export default AddItemToCart;
