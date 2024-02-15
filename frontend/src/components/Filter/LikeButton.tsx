import { useCommerceStore } from "../../store";
import { BsHeartFill } from 'react-icons/bs';

const LikeButton = () => {
  const { favoritesToggled, toggleFavoritesFilter } = useCommerceStore();

  return (
    <BsHeartFill onClick={toggleFavoritesFilter} size={40} className={`BsHeart-main m-0 p-0 ${favoritesToggled && 'active'}`} />
  )
};

export default LikeButton;
