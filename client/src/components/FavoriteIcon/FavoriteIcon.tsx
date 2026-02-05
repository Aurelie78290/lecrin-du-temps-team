import { Heart } from "lucide-react";
import { useFavorites } from "../../contexts/FavoriteContext";

import FavoritesDrawer from "../FavoritesDrawer/FavoritesDrawer";

import "./FavoriteIcon.css";

interface FavoriteIconProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  apiBaseUrl: string;
}

function FavoriteIcon({ isOpen, setIsOpen, apiBaseUrl }: FavoriteIconProps) {
  //   const [FavoriteOpen, setFavoriteOpen] = useState(false);
  const { favoriteIds } = useFavorites();

  const hasFavorites = favoriteIds.size > 0;

  return (
    <>
      <button
        type="button"
        className="FavoriteIcon-button"
        onClick={() => setIsOpen(true)}
        aria-label="Favoris"
      >
        <Heart
          className={`FavoriteIcon-heart ${hasFavorites ? "active" : ""}`}
        />
      </button>
      <FavoritesDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        apiBaseUrl={apiBaseUrl}
      />
    </>
  );
}

export default FavoriteIcon;
