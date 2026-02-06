import api from "../../services/api";
import "./AdminWatchList.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Watch {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number;
  photo_url: string;
  watch_sell_status: string;
}

const AdminWatchList = () => {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [searchBrand, setSearchBrand] = useState("");
  const navigate = useNavigate();

  const fetchwatches = useCallback(async () => {
    try {
      const res = await api.get("/api/admin/watches");
      setWatches(res.data);
    } catch (err) {
      console.error("Erreur de chargement des annonces", err);
    }
  }, []);

  useEffect(() => {
    fetchwatches();
  }, [fetchwatches]);

  const filteredWatches = watches.filter((w) =>
    `${w.brand} ${w.model}`
      .toLocaleLowerCase()
      .includes(searchBrand.toLocaleLowerCase()),
  );

  const handleDeleteWatch = async (id: number) => {
    if (window.confirm("Etes-vous sûr de vouloir supprimer cette annonce ?")) {
      try {
        await api.delete(`/api/admin/watches/${id}`);
        fetchwatches();
      } catch (err) {
        alert("Erreur lors de la suppressions.");
      }
    }
  };

  return (
    <div className="manage-watches">
      <div className="search-container">
        <label htmlFor="search-watch" className="search-label">
          Rechercher une montre :
        </label>
        <input
          id="search-watch"
          type="text"
          placeholder="Marque ou modèle"
          value={searchBrand}
          onChange={(e) => setSearchBrand(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="watches-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Montre</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWatches.length > 0 ? (
              filteredWatches.map((w) => (
                <tr key={w.idwatch}>
                  <td>
                    <img
                      src={`http://localhost:3310${w.photo_url}`}
                      alt={w.model}
                      className="table-img"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/assets/images/default-watch.webp";
                      }}
                    />
                  </td>
                  <td>
                    {w.brand}
                    <br />
                    {w.model}
                  </td>
                  <td>
                    {w.watch_price
                      ? `${w.watch_price.toLocaleString()}€`
                      : "N/A"}
                  </td>
                  <td className="actions">
                    <button
                      type="button"
                      className="infos-btn"
                      onClick={() =>
                        navigate(`/shop/${w.idwatch}`, {
                          state: { fromAdmin: true },
                        })
                      }
                    >
                      Voir les informations
                    </button>
                    <button
                      type="button"
                      className="watchlist-delete-btn"
                      onClick={() => handleDeleteWatch(w.idwatch)}
                    >
                      Supprimer l'annonce
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-match">
                  Aucune annonce trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWatchList;
