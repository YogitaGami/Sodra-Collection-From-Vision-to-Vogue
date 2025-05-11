import { toggleFavoriteItem } from "@/redux/updateFavorite/updateFavoriteSlice";
import { useDispatch } from 'react-redux'

const ToggleItemToFavorite = ({ item, selectedDays,selectedDeliveryDate}) => {
    const dispatch = useDispatch();
  
    const handleToggleFavorite = () => {
      const Items = {
        id: item._id,
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
      
    };
  
    return (
      <button onClick={handleToggleFavorite}>
        <img className="size-4" src="window.svg" alt="" />
      </button>
    );
  };
  
export default ToggleItemToFavorite;  
