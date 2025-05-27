import { toggleFavoriteItem } from "@/redux/updateFavorite/updateFavoriteSlice";
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import Image from "next/image";


const ToggleItemToFavorite = ({ item, selectedDays}) => {
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
        deposit: item.deposit || 0,
        collectionType: item.collectionType,
        isAvailable: item.isAvailable
      };
      dispatch(toggleFavoriteItem(Items));
      toast.info('Item added to favourite!')
    }
  
    return (
      <button onClick={handleToggleFavorite}>
        <Image src="/heart.svg" alt="Favourite Icon" width={32} height={32}></Image>
      </button>
    );
  };
  
export default ToggleItemToFavorite;  
