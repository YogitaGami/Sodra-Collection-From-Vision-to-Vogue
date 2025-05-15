import { toggleFavoriteItem } from "@/redux/updateFavorite/updateFavoriteSlice";
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import Image from "next/image";


const ToggleItemToFavorite = ({ item, selectedDays,selectedDeliveryDate}) => {
    const dispatch = useDispatch();
  
    const handleToggleFavorite = () => {
      const Items = {
        id: item._id,
        imageId: item.imageId?.[0],
        name: item.name,
        desc: item.desc,
        price: typeof item.price === "object"
        ? item.price[selectedDays] ?? 0
        : item.price || 0,
        priceMap: {...item.price},
        size: item.size,
        days: selectedDays,
        deposit: item.deposit || 0,
        DeliveryDate: selectedDeliveryDate
      };
      dispatch(toggleFavoriteItem(Items));
      toast.info('Item added to cart!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      }) 
    };
  
    return (
      <button onClick={handleToggleFavorite}>
        <Image src="/heart.svg" alt="Favourite Icon" width={32} height={32}></Image>
      </button>
    );
  };
  
export default ToggleItemToFavorite;  
