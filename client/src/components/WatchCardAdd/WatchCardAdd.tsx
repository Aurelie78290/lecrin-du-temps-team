import { useEffect, useRef, useState } from "react";
import "./WatchCardAdd.css";

// ============================================
// TYPES
// ============================================

interface WatchCardAddProps {
  onWatchAdded: () => void;
  onPopupToggle: (openPopup: boolean) => void;
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
// CONSTANTES
// ============================================

const WATCH_CONDITIONS = [
  "Neuf",
  "Excellent état",
  "Très bon état",
  "Bon état",
  "État correct",
  "À réviser",
] as const;

// ============================================
// COMPOSANT
// ============================================

function WatchCardAdd({ onWatchAdded, onPopupToggle }: WatchCardAddProps) {
  // --------------------------------------------
  // États formulaire
  // --------------------------------------------
  const [brand, setBrand] = useState("");
  const [brandId, setBrandId] = useState<number | null>(null);

  const [model, setModel] = useState("");
  const [modelId, setModelId] = useState<number | null>(null);

  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");

  // --------------------------------------------
  // Popup
  // --------------------------------------------
  const [openPopup, setOpenPopup] = useState(false);

  // --------------------------------------------
  // Images
  // --------------------------------------------
  const [watchImage, setWatchImage] = useState<File | null>(null);
  const [watchImagePreview, setWatchImagePreview] = useState<string | null>(
    null,
  );

  const [certificateImage, setCertificateImage] = useState<File | null>(null);
  const [certificateImagePreview, setCertificateImagePreview] = useState<
    string | null
  >(null);

  // --------------------------------------------
  // Autocomplétion marques
  // --------------------------------------------
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [showSuggestionsBrand, setShowSuggestionsBrand] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const autocompleteBrandRef = useRef<HTMLDivElement>(null);

  // --------------------------------------------
  // API
  // --------------------------------------------
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  // ============================================
  // EFFECTS
  // ============================================

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

  useEffect(() => {
    document.body.style.overflow = openPopup ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openPopup]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        autocompleteBrandRef.current &&
        !autocompleteBrandRef.current.contains(event.target as Node)
      ) {
        setShowSuggestionsBrand(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ============================================
  // FILTRAGE
  // ============================================

  const filteredBrands =
    brand.length >= 1
      ? brands.filter((b) =>
          b.name.toLowerCase().startsWith(brand.toLowerCase()),
        )
      : [];

  const filteredModels = brandId
    ? models.filter((m) => m.brand_id === brandId)
    : [];

  // ============================================
  // HANDLERS
  // ============================================

  const handleSelectBrand = (selectedBrand: Brand) => {
    setBrand(selectedBrand.name);
    setBrandId(selectedBrand.id);
    setShowSuggestionsBrand(false);

    setModel("");
    setModelId(null);
  };

  const handleBrandKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestionsBrand || filteredBrands.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredBrands.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredBrands.length - 1,
        );
        break;
      case "Enter":
        e.preventDefault();
        handleSelectBrand(filteredBrands[highlightedIndex]);
        break;
      case "Escape":
        setShowSuggestionsBrand(false);
        break;
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = (
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    preview: string | null,
  ) => {
    setImage(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const openingPopup = () => {
    setOpenPopup(true);
    onPopupToggle(true);
  };

  const closingPopup = () => {
    setOpenPopup(false);
    onPopupToggle(false);

    setBrand("");
    setBrandId(null);
    setModel("");
    setModelId(null);
    setPrice("");
    setCondition("");

    if (watchImagePreview) URL.revokeObjectURL(watchImagePreview);
    if (certificateImagePreview) URL.revokeObjectURL(certificateImagePreview);

    setWatchImage(null);
    setWatchImagePreview(null);
    setCertificateImage(null);
    setCertificateImagePreview(null);

    setShowSuggestionsBrand(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (brandId) formData.append("brand_id", brandId.toString());
    if (modelId) formData.append("model_id", modelId.toString());
    formData.append("watch_price", price);
    formData.append("watch_condition", condition);

    if (watchImage) formData.append("watch_image", watchImage);
    if (certificateImage)
      formData.append("certificate_image", certificateImage);

    try {
      const response = await fetch(`${apiBaseUrl}/api/watches`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      onWatchAdded();
      closingPopup();
    } catch (error) {
      console.error(error);
    }
  };

  // ============================================
  // JSX
  // ============================================

  return (
    <div className="watch-card-add">
      <div className="watch-card-add__trigger">
        {!openPopup && (
          <button type="button" onClick={openingPopup}>
            Ajouter une montre
          </button>
        )}
      </div>

      {openPopup && (
        <div className="watch-card-add__modal">
          <button
            type="button"
            className="watch-card-add__close-btn"
            onClick={closingPopup}
          >
            X
          </button>

          <div className="watch-card-add__content">
            <h2>Ajouter votre montre</h2>

            <form onSubmit={handleSubmit} id="watch-adder">
              {/* MARQUE */}
              <div className="autocomplete" ref={autocompleteBrandRef}>
                <input
                  type="text"
                  placeholder="Marque"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setBrandId(null);
                    setShowSuggestionsBrand(true);
                    setHighlightedIndex(0);
                  }}
                  onFocus={() =>
                    brand.length >= 1 && setShowSuggestionsBrand(true)
                  }
                  onKeyDown={handleBrandKeyDown}
                  required
                />

                {showSuggestionsBrand && filteredBrands.length > 0 && (
                  <ul className="autocomplete__list">
                    {filteredBrands.map((b, index) => (
                      <li key={b.id}>
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
              </div>

              {/* MODELE */}
              <div className="autocomplete">
                <select
                  value={modelId ?? ""}
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    const selected = models.find((m) => m.id === id);
                    setModelId(id);
                    setModel(selected?.name ?? "");
                  }}
                  disabled={!brandId}
                  required
                >
                  <option value="">
                    {brandId
                      ? "Sélectionnez un modèle"
                      : "Choisissez d'abord une marque"}
                  </option>

                  {filteredModels.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="number"
                placeholder="Prix d'achat"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
              >
                <option value="">Sélectionnez un état</option>
                {WATCH_CONDITIONS.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>

              {/* IMAGES */}
              <div className="watch-card-add__images">
                {/* Montre */}
                <div className="image-upload">
                  <label htmlFor="watch-image" className="image-upload__label">
                    {watchImagePreview ? (
                      <div className="image-upload__preview">
                        <img src={watchImagePreview} alt="Montre" />
                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              setWatchImage,
                              setWatchImagePreview,
                              watchImagePreview,
                            )
                          }
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="image-upload__placeholder">Photo</div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="watch-image"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleImageChange(e, setWatchImage, setWatchImagePreview)
                    }
                  />
                </div>

                {/* Certificat */}
                <div className="image-upload">
                  <label
                    htmlFor="certificate-image"
                    className="image-upload__label"
                  >
                    {certificateImagePreview ? (
                      <div className="image-upload__preview">
                        <img src={certificateImagePreview} alt="Certificat" />
                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              setCertificateImage,
                              setCertificateImagePreview,
                              certificateImagePreview,
                            )
                          }
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="image-upload__placeholder">
                        Certificat
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="certificate-image"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleImageChange(
                        e,
                        setCertificateImage,
                        setCertificateImagePreview,
                      )
                    }
                  />
                </div>
              </div>
            </form>

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
