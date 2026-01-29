import { useEffect, useState } from "react";
import "./SearchBar.css";

interface Brand {
  id: number;
  name: string;
}

interface MovementType {
  id: number;
  movement_type: string;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  search: string;
  watch_gender: string;
  brand_id: string;
  movement_type_id: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    watch_gender: "",
    brand_id: "",
    movement_type_id: "",
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [movementTypes, setMovementTypes] = useState<MovementType[]>([]);

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [brandsRes, movementTypesRes] = await Promise.all([
          fetch("http://localhost:3310/api/brands"),
          fetch("http://localhost:3310/api/movement-types"),
        ]);

        const brandsData = await brandsRes.json();
        const movementTypesData = await movementTypesRes.json();

        console.log("BRANDS DATA", brandsData);
        console.log("MOVEMENTS DATA", movementTypesData);

        setBrands(brandsData);
        setMovementTypes(movementTypesData);
      } catch (error) {
        console.error("Erreur lors du chargement des filtres:", error);
      }
    };

    fetchFiltersData();
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      watch_gender: "",
      brand_id: "",
      movement_type_id: "",
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  return (
    <div className="search-bar">
      <div className="search-bar-container">
        <div className="search-input-group">
          <label htmlFor="search">Rechercher</label>
          <div className="search-input-wrapper">
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Modèle, référence..."
            />
          </div>
        </div>
        <div className="filter-group">
          <label htmlFor="watch_gender">Genre</label>
          <select
            id="watch_gender"
            name="watch_gender"
            value={filters.watch_gender}
            onChange={handleFilterChange}
          >
            <option value="">Tous</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Unisexe">Unisexe</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="brand_id">Marque</label>
          <select
            id="brand_id"
            name="brand_id"
            value={filters.brand_id}
            onChange={handleFilterChange}
          >
            <option value="">Toutes les marques</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="movement_type_id">Mouvement</label>
          <select
            id="movement_type_id"
            name="movement_type_id"
            value={filters.movement_type_id}
            onChange={handleFilterChange}
          >
            <option value="">Tous les mouvements</option>
            {movementTypes.map((movement) => (
              <option key={movement.id} value={movement.id}>
                {movement.movement_type}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="reset-btn" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
