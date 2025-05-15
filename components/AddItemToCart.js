import { useDispatch } from "react-redux";
import { addItem } from "@/redux/updateCart/updateCartSlice";
import axios from "axios";
import { toast } from "react-toastify";

const AddItemToCart = ({ item, selectedDays, selectedDeliveryDate }) => {
  const dispatch = useDispatch();

  const checkAvailability = async () => {
    try {
      if (item.collectionType === "ArtPieces") {
        // Static availability for artpieces
        return item.isAvailable;
      }

      if (item.collectionType !== "ArtPieces") {
        if (!selectedDeliveryDate || !selectedDays) {
          alert("Please select rental days and delivery date!");
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
      console.error("Error checking availability:", error);
      return false;
    }
  };

  const handleAddCart = async () => {
    const isAvailable = await checkAvailability();

    if (!isAvailable) {
      alert("This item is not available for the selected dates or is sold.");
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
    toast.info("Item added to cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <button
      onClick={handleAddCart}
      className="w-fit bg-[#0680d0] text-white px-14 py-2 rounded-md shadow-md hover:bg-[#44b1f9] transition-all duration-300"
    >
      Add to Cart
    </button>
  );
};

export default AddItemToCart;
