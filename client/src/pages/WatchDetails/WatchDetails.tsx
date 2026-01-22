import { useEffect, useState } from "react";
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
  watch_sell_status?: string | null;

  diameter_mm?: number | null;
  thickness_mm?: number | null;
  water_resistance_bar?: number | null;

  dial_color?: string | null;

  // labels + ids utilisés par labelOrId(...)
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

  // certificat (tu l’affiches via labelOrId)
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
// Typage pour la props venant de ClassifiedAdDetails.tsx
interface WatchDetailsProps {
  idwatch?: number;
  isReadOnly?: boolean;
}

const API_URL = "http://localhost:3310";

// const getAuthHeaders = (): Record<string, string> => {
//   const token = localStorage.getItem("token"); // ⚠️ mets la bonne key si besoin
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

//convertir en string
const formatValue = (v: unknown) => {
  if (v === null || v === undefined || v === "") return "—";
  return String(v);
};
//format FR pour le prix
const formatPrice = (v: number | null) => {
  if (v == null) return "—";
  return `${new Intl.NumberFormat("fr-FR").format(v)} €`;
};
//format jour/mois/année
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
//format pr les unités
const formatMm = (v: number | null) => (v == null ? "—" : `${v} mm`);
const formatBar = (v: number | null) => (v == null ? "—" : `${v} bar`);
const formatHours = (v: number | null) => (v == null ? "—" : `${v} h`);
const formatHz = (v: number | null) => (v == null ? "—" : `${v} Hz`);
//si une string est convertible en number genre "42" alors le change en number, sinon null
const asNumberOrNull = (v: unknown): number | null => {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  }
  return null;
};
//Si c’est une string → OK sinon null.
const asStringOrNull = (v: unknown): string | null => {
  if (typeof v === "string") return v;
  return null;
};
//revoir avec gepeto pr comprendre x)
const labelOrId = (
  label: unknown,
  id: unknown,
  suffixIfId?: string,
): string => {
  const l = asStringOrNull(label);
  if (l && l.trim() !== "") return l;

  // fallback id
  const n = asNumberOrNull(id);
  if (n != null) return suffixIfId ? `${n}${suffixIfId}` : String(n);

  // fallback string id
  const s = asStringOrNull(id);
  if (s && s.trim() !== "") return suffixIfId ? `${s}${suffixIfId}` : s;

  return "—";
};

export default function WatchDetails({
  idwatch,
  isReadOnly = false,
}: WatchDetailsProps) {
  // 1. On récupère l'id de l'URL au cas où
  const { id } = useParams();

  const { addToBasket } = useBasket();
  const [basketOpen, setBasketOpen] = useState(false);

  // 2. LA LOGIQUE DE DÉCISION :
  // Si idwatch (prop) existe, on l'utilise(issu de ClassifiedAdDetails.tsx). Sinon, on utilise id (URL).
  const effectiveId = idwatch || (id ? Number(id) : null);

  const inShop = !!useMatch("/shop/:id");
  const inCollection = !!useMatch("/collection/:id");
  // const location = useLocation();
  const watchId = Number(id);
  const [watch, setWatch] = useState<WatchDetailsWithContext | null>(null);
  //pr la photo affichée en grand
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (!Number.isFinite(watchId)) return;
    if (
      !window.confirm(
        inCollection
          ? "Retirer de la collection ?"
          : "Supprimer cette montre ?",
      )
    )
      return;

    try {
      const url = inCollection
        ? `${API_URL}/api/collection/watches/${watchId}` // plus de userId en query
        : `${API_URL}/api/watches/${watchId}`;
      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      const body = res.status === 204 ? "" : await res.text().catch(() => "");
      console.log("DELETE URL:", url);
      console.log("DELETE status:", res.status, res.statusText);
      console.log("DELETE body:", body);

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
  useEffect(() => {
    if (!effectiveId) return;

    setLoading(true);
    setError(null);

    // ✅ Route existante pour les détails (shop ET collection)
    const detailsUrl = `${API_URL}/api/watches/${effectiveId}`;

    fetch(detailsUrl, {
      credentials: "include", // ✅ envoie le cookie token si besoin
    })
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
          is_in_my_collection: inCollection, // ✅ basé sur la route côté front
        };

        setWatch(normalized);
        setActivePhoto(normalized.photos[0] ?? null);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      })
      .finally(() => setLoading(false));
  }, [effectiveId, inCollection]);

  const photos = watch?.photos ?? [];
  if (loading) return <div className="watchdetails-state">Chargement…</div>;

  if (error || !watch) {
    //si erreur ou pas de watch
    return (
      <div className="watchdetails-state">
        <p>Erreur : {error ?? "Montre introuvable"}</p>
        <Link to="/Shop">← Retour boutique</Link>
      </div>
    );
  }

  // fonction pour ajouter la montre au panier
  const handleBuy = async () => {
    await addToBasket({
      idwatch: watch.idwatch,
      brand: watch.brand,
      model: watch.model,
      price: watch.watch_price ?? 0,
    });

    setBasketOpen(true);
  };

  return (
    <div className="watchdetails-page">
      <div className="watchdetails-layout">
        {/* Galerie */}
        <div className="watchdetails-100vh">
          {/* On masque le retour seulement si isReadOnly est vrai (en mode validation d'annonce)*/}
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

          <div className="watchdetails-layout-flex">
            <section className="watchdetails-card watchdetails-card-w40">
              {/* <h2 className="watchdetails-section-title">
              Photos
            </h2> */}
              <div className="watchdetails-main">
                {activePhoto ? (
                  <img
                    src={`${API_URL}${activePhoto}`}
                    alt={`Montre ${formatValue(watch.brand)} ${formatValue(
                      watch.model,
                    )}`}
                  />
                ) : (
                  <div className="watchdetails-empty">Aucune photo</div>
                )}
              </div>
              {/* Photo principale : si activePhoto existe */}
              {photos.length > 1 && (
                <div className="watchdetails-thumbs">
                  {photos.map((p) => (
                    <button
                      key={p}
                      type="button"
                      // On affiche les thumbs uniquement si plus d’une photo
                      className={`watchdetails-thumb ${
                        p === activePhoto ? "is-active" : ""
                      }`}
                      onClick={() => setActivePhoto(p)} //Classe is-active si c’est la photo sélectionnée
                    >
                      <img src={`${API_URL}${p}`} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </section>
            <section className="watchdetails-card watchdetails-card-w50">
              <h2 className="watchdetails-section-title">
                Informations générales
              </h2>
              {/* 
          <dl> — Description List 
          <dt> — Description Term 
          <dd> — Description Details 
          en gros le dt s'assossie au dd (terme qui va avec sa description), comme un label 
          Exemple : 
          <dl> 
            <dt>Marque</dt> 
            <dd>Rolex</dd> 
            <dt>Diamètre</dt> 
            <dd>40 mm</dd> 
          </dl> 
          Le navigateur comprend : “Marque → Rolex” “Diamètre → 40 mm” 
          bien pour l'accessibilité : lecteurs d’écran comprennent le lien dt → dd 
          SEO (les moteurs comprennent que c’est une fiche produit) 
          */}
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
                    {formatBoolTinyInt(
                      asNumberOrNull(watch.is_limited_edition),
                    )}
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
                  <dt>STATUT DE VENTE</dt>
                  <dd>{formatValue(watch.watch_sell_status)}</dd>
                </div>

                <div>
                  <dt>ETAT</dt>
                  <dd>{formatValue(watch.watch_condition)}</dd>
                </div>

                <div>
                  <dt>CERTIFICAT</dt>
                  <dd>
                    {labelOrId(
                      watch.certificate_label,
                      watch.certificate_id,
                      " (id)",
                    )}
                  </dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
        <div className="watchdetails-100vhMax">
          <div className="watchdetails-layout-flex">
            <div className="watchdetails-card-w40">
              <section className="watchdetails-card">
                <h2 className="watchdetails-section-title">Certificat</h2>
              </section>
            </div>
            <div className="watchdetails-card-w50">
              <section className="watchdetails-card">
                <h2 className="watchdetails-section-title">Caractéristiques</h2>

                <dl className="watchdetails-dl">
                  <div>
                    <dt>MATERIAU BOITIER</dt>
                    <dd>
                      {labelOrId(
                        watch.case_material_label,
                        watch.case_material_id,
                      )}
                    </dd>
                  </div>

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
                    <dd>
                      {formatBar(asNumberOrNull(watch.water_resistance_bar))}
                    </dd>
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
                </dl>
              </section>

              <section className="watchdetails-card">
                {/* <h2 className="watchdetails-section-title">Bracelet</h2> */}

                <dl className="watchdetails-dl">
                  <div>
                    <dt>MATERIAU BRACELET</dt>
                    <dd>
                      {labelOrId(
                        watch.strap_material_label,
                        watch.strap_material_id,
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>COULEUR BRACELET</dt>
                    <dd>{formatValue(watch.strap_color)}</dd>
                  </div>
                  <div>
                    <dt>TYPE DE FERMOIR</dt>
                    <dd>
                      {labelOrId(watch.clasp_type_label, watch.clasp_type_id)}
                    </dd>
                  </div>
                  <div>
                    <dt>LARGEUR ENTRE-CORNES</dt>
                    <dd>{formatMm(asNumberOrNull(watch.lug_width_mm))}</dd>
                  </div>
                </dl>
              </section>

              <section className="watchdetails-card">
                {/* <h2 className="watchdetails-section-title">Mouvement</h2> */}

                <dl className="watchdetails-dl">
                  <div>
                    <dt>TYPE MOUVEMENT</dt>
                    <dd>
                      {labelOrId(
                        watch.movement_type_label,
                        watch.movement_type_id,
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>CALIBRE</dt>
                    <dd>{formatValue(watch.caliber)}</dd>
                  </div>
                  <div>
                    <dt>FONCTIONS</dt>
                    <dd>
                      {labelOrId(watch.functions_label, watch.functions_id)}
                    </dd>
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
          </div>
          <section className="watchdetails-card watchdetails-actions">
            {inShop && (
              <>
                <button
                  type="button"
                  className="watchdetails-buy"
                  disabled={asNumberOrNull(watch.watch_price) == null}
                  onClick={handleBuy}
                  // () =>
                  // console.log("Acheter", watch.idwatch)
                >
                  Acheter
                </button>
                <ShopBasket
                  isOpen={basketOpen}
                  onClose={() => setBasketOpen(false)}
                />
              </>
            )}
            {/* On masque le retour seulement si isReadOnly est vrai (en mode validation d'annonce)*/}
            {!isReadOnly && (
              <section className="watchdetails-card watchdetails-actions">
                {inCollection && (
                  <div className="watchdetails-actions">
                    <button
                      type="button"
                      className="watchdetails-sell"
                      onClick={() =>
                        console.log("Mettre en vente", watch.idwatch)
                      }
                    >
                      Mettre en vente
                    </button>

                    <button
                      type="button"
                      className="watchdetails-edit"
                      onClick={() =>
                        navigate(`/watches/${watch.idwatch}/edit`, {
                          state: {
                            from: inCollection ? "collection" : "shop",
                            id: watch.idwatch,
                          },
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
                      {inCollection ? "Retirer de la collection" : "Supprimer"}
                    </button>

                    {!inShop && !inCollection && (
                      <div className="watchdetails-empty">
                        Action indisponible
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
