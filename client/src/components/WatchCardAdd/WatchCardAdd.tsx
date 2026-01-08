import { useEffect, useRef, useState } from "react";
import "./WatchCardAdd.css";

// ============================================
// TYPES
// ============================================

interface WatchCardAddProps {
  onWatchAdded: () => void; // Callback appelé après ajout d'une montre
  onPopupToggle: (openPopup: boolean) => void; // Callback pour informer le parent de l'état du popup
}

type Brand = {
  id: number;
  name: string;
};

type Model = {
  id: number;
  brand_id: number;
  name: string;
};

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

function WatchCardAdd({ onWatchAdded, onPopupToggle }: WatchCardAddProps) {
  // --------------------------------------------
  // États du formulaire
  // --------------------------------------------
  const [brand, setBrand] = useState("");
  const [brandId, setBrandId] = useState<number | null>(null);
  const [model, setModel] = useState("");
  const [modelId, setModelId] = useState<number | null>(null);
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");

  // --------------------------------------------
  // État du popup (ouvert/fermé)
  // --------------------------------------------
  const [openPopup, setOpenPopup] = useState(false);

  // --------------------------------------------
  // États pour l'autocomplétion
  // --------------------------------------------
  const [brands, setBrands] = useState<Brand[]>([]); // Liste complète des marques depuis l'API
  const [models, setModels] = useState<Model[]>([]);
  const [showSuggestionsBrand, setShowSuggestionsBrand] = useState(false); // Affiche/cache la liste déroulante
  const [showSuggestionsModel, setShowSuggestionsModel] = useState(false); // Affiche/cache la liste déroulante
  const [highlightedIndex, setHighlightedIndex] = useState(0); // Index de l'élément surligné (navigation clavier)

  // Ref pour détecter les clics en dehors de l'autocomplétion
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // --------------------------------------------
  // Configuration API
  // --------------------------------------------
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  // ============================================
  // EFFETS (useEffect)
  // ============================================

  /**
   * Charge la liste des marques depuis l'API au montage du composant.
   * Cette liste est utilisée pour l'autocomplétion.
   */
  useEffect(() => {
    fetch(`${apiBaseUrl}/api/brands`)
      .then((res) => res.json())
      .then(setBrands)
      .catch(console.error);

    fetch(`${apiBaseUrl}/api/models`)
      .then((res) => res.json())
      .then(setModels)
      .catch(console.error);
  }, []);

  /**
   * Bloque le scroll du body quand le popup est ouvert.
   * - Ajoute overflow: hidden au body à l'ouverture
   * - Le retire à la fermeture ou au démontage du composant
   */
  useEffect(() => {
    if (openPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup : remet le scroll si le composant est démonté
    return () => {
      document.body.style.overflow = "";
    };
  }, [openPopup]);

  /**
   * Ferme la liste de suggestions quand on clique en dehors.
   * - Ajoute un event listener sur "mousedown" au montage
   * - Le retire au démontage (cleanup)
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Si le clic est en dehors du wrapper d'autocomplétion, on ferme
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setShowSuggestionsBrand(false);
        setShowSuggestionsModel(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ============================================
  // LOGIQUE DE FILTRAGE
  // ============================================

  /**
   * Filtre les marques selon ce que l'utilisateur tape.
   * - startsWith : ne montre que les marques qui COMMENCENT par la saisie
   * - Comparaison insensible à la casse (toLowerCase)
   */
  const filteredBrands =
    brand.length >= 1
      ? brands.filter((b) =>
          b.name.toLowerCase().startsWith(brand.toLowerCase()),
        )
      : [];

  const filteredModels =
    model.length >= 1 && brandId
      ? models.filter(
          (m) =>
            m.brand_id === brandId && // Filtre par marque sélectionnée
            m.name.toLowerCase().startsWith(model.toLowerCase()),
        )
      : [];

  // ============================================
  // HANDLERS (gestionnaires d'événements)
  // ============================================

  /**
   * Sélectionne une marque dans la liste déroulante.
   * - Remplit l'input avec le nom de la marque
   * - Stocke l'ID pour l'envoi au backend
   * - Ferme la liste de suggestions
   */
  const handleSelectBrand = (selectedBrand: Brand) => {
    setBrand(selectedBrand.name);
    setBrandId(selectedBrand.id);
    setShowSuggestionsBrand(false);

    setModel("");
    setModelId(null);
  };

  const handleSelectModel = (selectedModel: Model) => {
    setModel(selectedModel.name);
    setModelId(selectedModel.id);
    setShowSuggestionsModel(false);
  };

  /**
   * Gère la navigation au clavier dans la liste de suggestions.
   * - ArrowDown : élément suivant
   * - ArrowUp : élément précédent
   * - Enter : sélectionne l'élément surligné
   * - Escape : ferme la liste
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Si pas de suggestions affichées, on ne fait rien
    if (!showSuggestionsBrand || filteredBrands.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(); // Empêche le scroll de la page
        setHighlightedIndex(
          (prev) => (prev < filteredBrands.length - 1 ? prev + 1 : 0), // Retour au début si on dépasse
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev > 0 ? prev - 1 : filteredBrands.length - 1), // Va à la fin si on remonte trop
        );
        break;

      case "Enter":
        e.preventDefault(); // IMPORTANT : empêche la soumission du formulaire
        handleSelectBrand(filteredBrands[highlightedIndex]);
        break;

      case "Escape":
        setShowSuggestionsBrand(false);
        break;
    }
  };

  /**
   * Ouvre le popup et informe le parent.
   */
  const openingPopup = () => {
    setOpenPopup(true);
    onPopupToggle(true);
  };

  /**
   * Ferme le popup, reset tous les champs, et informe le parent.
   */
  const closingPopup = () => {
    // Ferme le popup
    setOpenPopup(false);
    onPopupToggle(false);

    // Reset tous les champs du formulaire
    setBrand("");
    setBrandId(null);
    setModel("");
    setPrice("");
    setCondition("");

    // Ferme les suggestions
    setShowSuggestionsBrand(false);
    setShowSuggestionsModel(false);
  };

  /**
   * Soumission du formulaire.
   * - Envoie les données au backend via POST
   * - Reset le formulaire en cas de succès
   * - Ferme le popup
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const newWatch = {
      brand_id: brandId, // On envoie l'ID de la marque, pas le nom
      model,
      watch_price: price ? Number(price) : null,
      watch_condition: condition || null,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/watches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWatch),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création");
      }

      const data = await response.json();
      console.log("Montre créée avec l'id:", data.insertId);
    } catch (error) {
      console.error(error);
    }

    // Informe le parent qu'une montre a été ajoutée (pour rafraîchir la liste)
    onWatchAdded();
    closingPopup();
  };

  // ============================================
  // RENDU JSX
  // ============================================

  return (
    <div className="watch-card-add">
      {/* ----------------------------------------
          BOUTON D'OUVERTURE DU POPUP
          Visible uniquement quand le popup est fermé
      ---------------------------------------- */}
      <div className="watch-card-add__trigger">
        {!openPopup && (
          <button type="button" onClick={openingPopup}>
            Ajouter une montre
          </button>
        )}
      </div>

      {/* ----------------------------------------
          POPUP / MODAL
          Visible uniquement quand openPopup = true
      ---------------------------------------- */}
      {openPopup && (
        <div className="watch-card-add__modal">
          {/* Bouton de fermeture (X) */}
          <button
            type="button"
            className="watch-card-add__close-btn"
            onClick={closingPopup}
          >
            X
          </button>

          <div className="watch-card-add__content">
            <h2>Ajouter votre montre</h2>

            {/* ----------------------------------------
                FORMULAIRE
            ---------------------------------------- */}
            <form onSubmit={handleSubmit} id="watch-adder">
              {/* --- Champ Marque avec autocomplétion --- */}
              <div className="autocomplete" ref={autocompleteRef}>
                <input
                  type="text"
                  placeholder="Marque"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setBrandId(null); // Reset l'ID si l'utilisateur modifie le texte
                    setShowSuggestionsBrand(true);
                    setHighlightedIndex(0); // Remet la sélection au premier élément
                  }}
                  onFocus={() =>
                    brand.length >= 1 && setShowSuggestionsBrand(true)
                  }
                  onKeyDown={handleKeyDown}
                  required
                />

                {/* Liste des suggestions (visible si showSuggestions = true ET il y a des résultats) */}
                {showSuggestionsBrand && filteredBrands.length > 0 && (
                  <ul className="autocomplete__list">
                    {filteredBrands.map((b, index) => (
                      <li key={b.id} className="autocomplete__item">
                        <button
                          type="button"
                          onClick={() => handleSelectBrand(b)}
                          className={`autocomplete__option ${
                            index === highlightedIndex
                              ? "autocomplete__option--highlighted"
                              : ""
                          }`}
                        >
                          {b.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Message "Aucune marque trouvée" */}
                {showSuggestionsBrand &&
                  brand.length >= 1 &&
                  filteredBrands.length === 0 && (
                    <div className="autocomplete__no-results">
                      Aucune marque trouvée
                    </div>
                  )}
              </div>

              {/* --- Autres champs --- */}
              <div className="autocomplete">
                <input
                  type="text"
                  placeholder="Modèle"
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    setModelId(null); // Reset l'ID si l'utilisateur modifie le texte
                    setShowSuggestionsModel(true);
                    setHighlightedIndex(0);
                  }} // Remet la sélection au premier élément
                  disabled={!brandId}
                  required
                />

                {/* Liste des suggestions (visible si showSuggestions = true ET il y a des résultats) */}
                {showSuggestionsModel && filteredModels.length > 0 && (
                  <ul className="autocomplete__list">
                    {filteredModels.map((m, index) => (
                      <li key={m.id} className="autocomplete__item">
                        <button
                          type="button"
                          onClick={() => handleSelectModel(m)}
                          className={`autocomplete__option ${
                            index === highlightedIndex
                              ? "autocomplete__option--highlighted"
                              : ""
                          }`}
                        >
                          {m.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Message "Aucune marque trouvée" */}
                {showSuggestionsModel &&
                  model.length >= 1 &&
                  filteredModels.length === 0 && (
                    <div className="autocomplete__no-results">
                      Aucun modèle trouvée
                    </div>
                  )}
              </div>

              <input
                type="number"
                placeholder="Prix d'achat"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="État"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </form>

            {/* Bouton de soumission (lié au form via l'attribut "form") */}
            <button
              type="submit"
              form="watch-adder"
              className="watch-card-add__submit-btn"
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchCardAdd;
