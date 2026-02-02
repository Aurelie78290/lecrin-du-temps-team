import { useEffect, useMemo, useState } from "react";
import { Link, useMatch, useNavigate, useParams } from "react-router";
import ShopBasket from "../../components/ShopBasket/ShopBasket";
import { useBasket } from "../../contexts/ShopContext";
import "./WatchDetails.css";

type WatchDetailsDTO = {
  idwatch: number;

  brand: string;
  model: string;

  // champs de base
  watch_price: number | null;
  watch_condition: string | null;

  // champs affichés dans la page
  ref_no?: number | string | null;
  production_year?: string | null;
  is_limited_edition?: number | null;
  edition_number?: string | number | null;

  watch_gender?: string | null;
  watch_sell_status?: "personal" | "pending" | "active" | null;

  diameter_mm?: number | null;
  thickness_mm?: number | null;
  water_resistance_bar?: number | null;

  dial_color?: string | null;

  case_material_label?: string | null;
  case_material_id?: number | string | null;

  dial_finish_label?: string | null;
  dial_finish_id?: number | string | null;

  hour_marker_type_label?: string | null;
  hour_marker_type_id?: number | string | null;

  strap_material_label?: string | null;
  strap_material_id?: number | string | null;

  clasp_type_label?: string | null;
  clasp_type_id?: number | string | null;

  movement_type_label?: string | null;
  movement_type_id?: number | string | null;

  functions_label?: string | null;
  functions_id?: number | string | null;

  strap_color?: string | null;
  lug_width_mm?: number | null;

  caliber?: string | null;
  power_reserve_hours?: number | null;
  frequency_hz?: number | null;
  jewel_count?: number | null;

  certificate_label?: string | null;
  certificate_id?: number | string | null;

  // médias
  photos: string[];
  certificates: string[];
};

type WatchDetailsWithContext = WatchDetailsDTO & {
  is_in_my_collection: boolean;
};

type WatchDetailsApi = Partial<WatchDetailsWithContext> & {
  idwatch: number;
  brand?: string;
  model?: string;
};

interface WatchDetailsProps {
  idwatch?: number;
  isReadOnly?: boolean;
}

const API_URL = "http://localhost:3310";

// convertir en string
const formatValue = (v: unknown) => {
  if (v === null || v === undefined || v === "") return "—";
  return String(v);
};

// format FR pour le prix
const formatPrice = (v: number | null) => {
  if (v == null) return "—";
  return `${new Intl.NumberFormat("fr-FR").format(v)} €`;
};

// format jour/mois/année
const formatDate = (v: string | null) => {
  if (!v) return "—";
  const d = new Date(v); // "YYYY-MM-DD"
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleDateString("fr-FR");
};

// si 1 : oui, sinon Non (pr le tinyInt)
const formatBoolTinyInt = (v: number | null) => {
  if (v == null) return "—";
  return v === 1 ? "Oui" : "Non";
};

const formatMm = (v: number | null) => (v == null ? "—" : `${v} mm`);
const formatBar = (v: number | null) => (v == null ? "—" : `${v} bar`);
const formatHours = (v: number | null) => (v == null ? "—" : `${v} h`);
const formatHz = (v: number | null) => (v == null ? "—" : `${v} Hz`);

const asNumberOrNull = (v: unknown): number | null => {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  }
  return null;
};

const asStringOrNull = (v: unknown): string | null => {
  if (typeof v === "string") return v;
  return null;
};

const labelOrId = (
  label: unknown,
  id: unknown,
  suffixIfId?: string,
): string => {
  const l = asStringOrNull(label);
  if (l && l.trim() !== "") return l;

  const n = asNumberOrNull(id);
  if (n != null) return suffixIfId ? `${n}${suffixIfId}` : String(n);

  const s = asStringOrNull(id);
  if (s && s.trim() !== "") return suffixIfId ? `${s}${suffixIfId}` : s;

  return "—";
};

export default function WatchDetails({
  idwatch,
  isReadOnly = false,
}: WatchDetailsProps) {
  // J'utilise soit l'id en props (depuis ClassifiedAdDetails), soit celui de l'URL
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToBasket } = useBasket();
  const [basketOpen, setBasketOpen] = useState(false);

  const inShop = !!useMatch("/shop/:id");
  const inCollection = !!useMatch("/collection/:id");

  const effectiveId = useMemo(() => {
    if (typeof idwatch === "number") return idwatch;
    if (!id) return null;
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [idwatch, id]);

  const [watch, setWatch] = useState<WatchDetailsWithContext | null>(null);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [activeCertif, setActiveCertif] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalize = (s?: string | null) =>
    (s ?? "").toLowerCase().replace("à", "a").trim();

  const isPending = normalize(watch?.watch_sell_status) === "pending";
  const isForSale = normalize(watch?.watch_sell_status) === "active";

  const photos = watch?.photos ?? [];
  const certifs = watch?.certificates ?? [];

  // ===== ACTIONS =====
  const handleBuy = async () => {
    if (!watch) return;

    await addToBasket({
      idwatch: watch.idwatch,
      brand: watch.brand,
      model: watch.model,
      price: watch.watch_price ?? 0,
    });

    setBasketOpen(true);
  };

  const handleDelete = async () => {
    if (!effectiveId) return;

    if (
      !window.confirm(
        inCollection
          ? "Retirer de la collection ?"
          : "Supprimer cette montre ?",
      )
    ) {
      return;
    }

    try {
      const url = inCollection
        ? `${API_URL}/api/collection/watches/${effectiveId}`
        : `${API_URL}/api/watches/${effectiveId}`;

      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      const body = res.status === 204 ? "" : await res.text().catch(() => "");

      if (!res.ok) {
        alert(`Erreur suppression (${res.status}) : ${body || res.statusText}`);
        return;
      }

      navigate(inCollection ? "/collection" : "/shop");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  const handleRequestSell = async () => {
    if (!effectiveId) return;

    const hasWatchPhoto = (watch?.photos?.length ?? 0) > 0;
    if (!hasWatchPhoto) {
      alert(
        "📸 Ajoutez au moins une photo de la montre avant de la mettre en vente.",
      );
      return;
    }

    if (!window.confirm("Voulez-vous vraiment demander la mise en vente ?"))
      return;

    try {
      const res = await fetch(
        `${API_URL}/api/watches/${effectiveId}/request-sell`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        alert(`Erreur (${res.status}) : ${body || res.statusText}`);
        return;
      }

      const refreshed = await fetch(`${API_URL}/api/watches/${effectiveId}`, {
        credentials: "include",
      }).then((r) => r.json());

      setWatch((prev) => (prev ? { ...prev, ...refreshed } : refreshed));
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la mise en vente");
    }
  };

  const handleCancelSellRequest = async () => {
    if (!effectiveId) return;

    if (!window.confirm("Annuler la demande de mise en vente ?")) return;

    try {
      const res = await fetch(
        `${API_URL}/api/watches/${effectiveId}/cancel-sell-request`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        alert(`Erreur (${res.status}) : ${body || res.statusText}`);
        return;
      }

      const refreshed = await fetch(`${API_URL}/api/watches/${effectiveId}`, {
        credentials: "include",
      }).then((r) => r.json());

      setWatch((prev) => (prev ? { ...prev, ...refreshed } : refreshed));
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'annulation");
    }
  };

  const handleRemoveFromSale = async () => {
    if (!effectiveId) return;

    if (!window.confirm("Retirer cette montre de la vente ?")) return;

    try {
      const res = await fetch(
        `${API_URL}/api/watches/${effectiveId}/remove-from-sale`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        alert(`Erreur (${res.status}) : ${body || res.statusText}`);
        return;
      }

      const refreshed = await fetch(`${API_URL}/api/watches/${effectiveId}`, {
        credentials: "include",
      }).then((r) => r.json());

      setWatch((prev) => (prev ? { ...prev, ...refreshed } : refreshed));
    } catch (e) {
      console.error(e);
      alert("Erreur lors du retrait de la vente");
    }
  };

  // ===== FETCH DETAILS =====
  useEffect(() => {
    if (!effectiveId) {
      setError("ID de montre invalide.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/watches/${effectiveId}`, { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.text().catch(() => "");
          throw new Error(
            `Erreur API ${res.status} ${res.statusText} ${body}`.trim(),
          );
        }
        return res.json() as Promise<WatchDetailsApi>;
      })
      .then((data) => {
        const normalized: WatchDetailsWithContext = {
          ...data,
          idwatch: data.idwatch,
          brand: data.brand ?? "",
          model: data.model ?? "",
          watch_price: data.watch_price ?? null,
          watch_condition: data.watch_condition ?? null,
          photos: Array.isArray(data.photos) ? data.photos : [],
          certificates: Array.isArray(data.certificates)
            ? data.certificates
            : [],
          is_in_my_collection: inCollection,
        };

        setWatch(normalized);
        setActivePhoto(normalized.photos[0] ?? null);
        setActiveCertif(normalized.certificates[0] ?? null);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      })
      .finally(() => setLoading(false));
  }, [effectiveId, inCollection]);

  // ===== RENDER STATES =====
  if (loading) return <div className="watchdetails-state">Chargement…</div>;

  if (error || !watch) {
    return (
      <div className="watchdetails-state">
        <p>Erreur : {error ?? "Montre introuvable"}</p>
        <Link to="/Shop">← Retour boutique</Link>
      </div>
    );
  }

  return (
    <div className="watchdetails-page">
      <div className="watchdetails-layout">
        {!isReadOnly && (
          <Link
            className="watchdetails-back"
            to={inCollection ? "/Collection" : "/Shop"}
          >
            ← Retour {inCollection ? "Collection" : "Boutique"}
          </Link>
        )}

        <header className="watchdetails-header">
          <h1 className="watchdetails-title">
            {formatValue(watch.brand)} {formatValue(watch.model)}
          </h1>
          <div className="watchdetails-price">
            Prix: {formatPrice(asNumberOrNull(watch.watch_price))}
          </div>
        </header>

        {/* GRID 2x2  */}
        <div className="watchdetails-grid2x2">
          {/* ===== PHOTOS (haut gauche) ===== */}
          <section className="watchdetails-card wd-photos">
            <h2 className="watchdetails-section-title">Photos</h2>

            <div className="watchdetails-main">
              {activePhoto ? (
                <img
                  src={`${API_URL}${activePhoto}`}
                  alt={`Montre ${formatValue(watch.brand)} ${formatValue(watch.model)}`}
                />
              ) : (
                <div className="watchdetails-placeholder">
                  <div className="watchdetails-placeholder__title">
                    Aucune photo
                  </div>
                  <div className="watchdetails-placeholder__text">
                    Ajoutez une photo pour mettre en valeur la montre.
                  </div>
                </div>
              )}
            </div>

            {photos.length > 1 && (
              <div
                className={`watchdetails-thumbs ${photos.length > 1 ? "" : "is-empty"}`}
              >
                {photos.length > 1 &&
                  photos.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`watchdetails-thumb ${p === activePhoto ? "is-active" : ""}`}
                      onClick={() => setActivePhoto(p)}
                    >
                      <img src={`${API_URL}${p}`} alt="" />
                    </button>
                  ))}
              </div>
            )}
          </section>

          {/* ===== INFOS (haut droite) ===== */}
          <section className="watchdetails-card wd-info">
            <h2 className="watchdetails-section-title">
              Informations générales
            </h2>

            <dl className="watchdetails-dl">
              <div>
                <dt>MARQUE</dt>
                <dd>{formatValue(watch.brand)}</dd>
              </div>
              <div>
                <dt>MODELE</dt>
                <dd>{formatValue(watch.model)}</dd>
              </div>

              <div>
                <dt>REFERENCE (ref_no)</dt>
                <dd>{formatValue(watch.ref_no)}</dd>
              </div>
              <div>
                <dt>ANNEE DE PRODUCTION</dt>
                <dd>{formatDate(asStringOrNull(watch.production_year))}</dd>
              </div>

              <div>
                <dt>EDITION LIMITEE</dt>
                <dd>
                  {formatBoolTinyInt(asNumberOrNull(watch.is_limited_edition))}
                </dd>
              </div>
              <div>
                <dt>N° D'EDITION</dt>
                <dd>{formatValue(watch.edition_number)}</dd>
              </div>

              <div>
                <dt>GENRE</dt>
                <dd>{formatValue(watch.watch_gender)}</dd>
              </div>

              <div>
                <dt>ETAT</dt>
                <dd>{formatValue(watch.watch_condition)}</dd>
              </div>

              <div>
                <dt>MATERIAU BOITIER</dt>
                <dd>
                  {labelOrId(watch.case_material_label, watch.case_material_id)}
                </dd>
              </div>

              <div>
                <dt>TYPE DE FERMOIR</dt>
                <dd>
                  {labelOrId(watch.clasp_type_label, watch.clasp_type_id)}
                </dd>
              </div>

              <div>
                <dt>MATERIAU BRACELET</dt>
                <dd>
                  {labelOrId(
                    watch.strap_material_label,
                    watch.strap_material_id,
                  )}
                </dd>
              </div>
            </dl>
          </section>

          {/* ===== CERTIF (bas gauche) ===== */}
          <section className="watchdetails-card wd-certif">
            <h2 className="watchdetails-section-title">Certificat</h2>

            <div className="watchdetails-main">
              {activeCertif ? (
                <img src={`${API_URL}${activeCertif}`} alt="Certificat" />
              ) : (
                <div className="watchdetails-placeholder">
                  <div className="watchdetails-placeholder__title">
                    Aucun certificat
                  </div>
                  <div className="watchdetails-placeholder__text">
                    Vous pourrez en ajouter un plus tard.
                  </div>
                </div>
              )}
            </div>

            {certifs.length > 1 && (
              <div
                className={`watchdetails-thumbs ${certifs.length > 1 ? "" : "is-empty"}`}
              >
                {certifs.length > 1 &&
                  certifs.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`watchdetails-thumb ${c === activeCertif ? "is-active" : ""}`}
                      onClick={() => setActiveCertif(c)}
                    >
                      <img src={`${API_URL}${c}`} alt="" />
                    </button>
                  ))}
              </div>
            )}
          </section>

          {/* ===== SPECS (bas droite) ===== */}
          <section className="watchdetails-card wd-specs">
            <h2 className="watchdetails-section-title">Caractéristiques</h2>

            <dl className="watchdetails-dl">
              <div>
                <dt>DIAMETRE</dt>
                <dd>{formatMm(asNumberOrNull(watch.diameter_mm))}</dd>
              </div>

              <div>
                <dt>EPAISSEUR</dt>
                <dd>{formatMm(asNumberOrNull(watch.thickness_mm))}</dd>
              </div>

              <div>
                <dt>ETANCHEITE</dt>
                <dd>{formatBar(asNumberOrNull(watch.water_resistance_bar))}</dd>
              </div>

              <div>
                <dt>COULEUR CADRAN</dt>
                <dd>{formatValue(watch.dial_color)}</dd>
              </div>

              <div>
                <dt>FINITION CADRAN</dt>
                <dd>
                  {labelOrId(watch.dial_finish_label, watch.dial_finish_id)}
                </dd>
              </div>

              <div>
                <dt>INDEX / MARQUEURS</dt>
                <dd>
                  {labelOrId(
                    watch.hour_marker_type_label,
                    watch.hour_marker_type_id,
                  )}
                </dd>
              </div>

              <div>
                <dt>COULEUR BRACELET</dt>
                <dd>{formatValue(watch.strap_color)}</dd>
              </div>

              <div>
                <dt>LARGEUR ENTRE-CORNES</dt>
                <dd>{formatMm(asNumberOrNull(watch.lug_width_mm))}</dd>
              </div>

              <div>
                <dt>TYPE MOUVEMENT</dt>
                <dd>
                  {labelOrId(watch.movement_type_label, watch.movement_type_id)}
                </dd>
              </div>

              <div>
                <dt>CALIBRE</dt>
                <dd>{formatValue(watch.caliber)}</dd>
              </div>

              <div>
                <dt>FONCTIONS</dt>
                <dd>{labelOrId(watch.functions_label, watch.functions_id)}</dd>
              </div>

              <div>
                <dt>RESERVE DE MARCHE</dt>
                <dd>
                  {formatHours(asNumberOrNull(watch.power_reserve_hours))}
                </dd>
              </div>

              <div>
                <dt>FREQUENCE</dt>
                <dd>{formatHz(asNumberOrNull(watch.frequency_hz))}</dd>
              </div>

              <div>
                <dt>NOMBRE DE RUBIS</dt>
                <dd>{formatValue(watch.jewel_count)}</dd>
              </div>
            </dl>
          </section>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="watchdetails-actionsBar">
          {inShop && (
            <>
              <button
                type="button"
                className="watchdetails-buy"
                disabled={asNumberOrNull(watch.watch_price) == null}
                onClick={handleBuy}
              >
                Acheter
              </button>

              <ShopBasket
                isOpen={basketOpen}
                onClose={() => setBasketOpen(false)}
              />
            </>
          )}

          {!isReadOnly && inCollection && (
            <>
              {isPending && (
                <div className="watchdetails-actionsGroup">
                  <div className="watchdetails-info">
                    ⏳ En cours de validation, modifications impossibles
                  </div>

                  <button
                    type="button"
                    className="watchdetails-cancel"
                    onClick={handleCancelSellRequest}
                  >
                    Annuler la mise en vente
                  </button>
                </div>
              )}

              {isForSale && !isPending && (
                <div className="watchdetails-actionsGroup">
                  <div className="watchdetails-info">
                    ✅ Cette montre est en vente
                  </div>

                  <button
                    type="button"
                    className="watchdetails-cancel"
                    onClick={handleRemoveFromSale}
                  >
                    Retirer de la vente
                  </button>
                </div>
              )}

              {!isPending && !isForSale && (
                <>
                  <button
                    type="button"
                    className="watchdetails-sell"
                    onClick={handleRequestSell}
                  >
                    Mettre en vente
                  </button>

                  <button
                    type="button"
                    className="watchdetails-edit"
                    onClick={() =>
                      navigate(`/watches/${watch.idwatch}/edit`, {
                        state: { from: "collection", id: watch.idwatch },
                      })
                    }
                  >
                    Modifier
                  </button>

                  <button
                    type="button"
                    className="watchdetails-delete"
                    onClick={handleDelete}
                  >
                    Supprimer de la collection
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
