import { toggleFavoriteItem } from "@/redux/updateFavorite/updateFavoriteSlice";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import Image from "next/image";


const ToggleItemToFavorite = ({ item, selectedDays}) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.updateFavorite);

    const isFavorited = favorites.some((fav) => fav.id === item._id);

    const handleToggleFavorite = () => {
      const Items = {
        id: item._id,
        imageId: item.imageId?.[0],
        name: item.name,
        desc: item.desc,
        price: typeof item.price === "object"
        ? item.price[selectedDays] ?? 0
        : item.price || 0,
        deposit: item.deposit || 0,
        collectionType: item.collectionType,
        isAvailable: item.isAvailable
      };
      dispatch(toggleFavoriteItem(Items));
      toast.info(isFavorited ? 'Item removed from favourite!' : 'Item added to favourite!');
    }
  
    return (
      <button onClick={handleToggleFavorite} className="relative w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8">
        <Image src={isFavorited ? "/heart.svg" : "/heart_blank.png"} alt="Favourite Icon" fill className="object-contain" />
      </button>
    );
  };
  
export default ToggleItemToFavorite;  
