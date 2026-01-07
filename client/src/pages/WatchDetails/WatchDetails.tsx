import { useEffect, useMemo, useState } from "react";
import { Link, useMatch, useParams } from "react-router";
import "./WatchDetails.css";

const API_URL = "http://localhost:3310";

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

export default function WatchDetails() {
  const { id } = useParams();

  const inShop = !!useMatch("/shop/:id");
  const inCollection = !!useMatch("/collection/:id");

  const [watch, setWatch] = useState<Record<string, unknown> | null>(null);
  //pr la photo affichée en grand
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);
    //appeler API en fonction de l'ID, si pas d'id : rien
    fetch(`${API_URL}/api/watches/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          // Si erreur lis le body texte pour avoir plus de détails.
          const body = await res.text().catch(() => "");
          throw new Error(
            `Erreur API ${res.status} ${res.statusText} ${body}`.trim(),
          );
        }
        return res.json() as Promise<Record<string, unknown>>;
      })
      .then((data) => {
        //stock toute la montre.
        setWatch(data);

        const p1 = asStringOrNull(data.url_photo1);
        const p2 = asStringOrNull(data.url_photo2);
        const p3 = asStringOrNull(data.url_photo3);
        const p4 = asStringOrNull(data.url_photo4);
        const p5 = asStringOrNull(data.url_photo5);

        setActivePhoto(p1 ?? p2 ?? p3 ?? p4 ?? p5 ?? null); // cherche la 1ere photo non null
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const photos = useMemo(() => {
    // useMemo évite de recalculer la liste tant que watch ne change pas
    if (!watch) return [];
    return [
      asStringOrNull(watch.url_photo1),
      asStringOrNull(watch.url_photo2),
      asStringOrNull(watch.url_photo3),
      asStringOrNull(watch.url_photo4),
      asStringOrNull(watch.url_photo5),
    ].filter((p): p is string => typeof p === "string" && p.length > 0);
  }, [watch]);

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

  return (
    <div className="watchdetails-page">
      <Link
        className="watchdetails-back"
        to={inCollection ? "/Collection" : "/Shop"}
      >
        ← Retour {inCollection ? "collection" : "boutique"}
      </Link>

      <header className="watchdetails-header">
        <h1 className="watchdetails-title">
          {formatValue(watch.brand)} {formatValue(watch.model)}
        </h1>
        <div className="watchdetails-price">
          {formatPrice(asNumberOrNull(watch.watch_price))}
        </div>
      </header>

      <div className="watchdetails-layout">
        {/* Galerie */}
        <section className="watchdetails-card">
          <div className="watchdetails-main">
            {activePhoto ? (
              <img
                src={`${API_URL}/uploads/${activePhoto}`}
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
                  <img src={`${API_URL}/uploads/${p}`} alt="" />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="watchdetails-card">
          <h2 className="watchdetails-section-title">Informations générales</h2>
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
              <dt>Marque</dt>
              <dd>{formatValue(watch.brand)}</dd>
            </div>
            <div>
              <dt>Modèle</dt>
              <dd>{formatValue(watch.model)}</dd>
            </div>

            <div>
              <dt>Référence (ref_no)</dt>
              <dd>{formatValue(watch.ref_no)}</dd>
            </div>
            <div>
              <dt>Année de production</dt>
              <dd>{formatDate(asStringOrNull(watch.production_year))}</dd>
            </div>

            <div>
              <dt>Édition limitée</dt>
              <dd>
                {formatBoolTinyInt(asNumberOrNull(watch.is_limited_edition))}
              </dd>
            </div>
            <div>
              <dt>N° d’édition</dt>
              <dd>{formatValue(watch.edition_number)}</dd>
            </div>

            <div>
              <dt>Genre</dt>
              <dd>{formatValue(watch.watch_gender)}</dd>
            </div>
            <div>
              <dt>Statut de vente</dt>
              <dd>{formatValue(watch.watch_sell_status)}</dd>
            </div>

            <div>
              <dt>État</dt>
              <dd>{formatValue(watch.watch_condition)}</dd>
            </div>

            <div>
              <dt>Certificat</dt>
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

        <section className="watchdetails-card">
          <h2 className="watchdetails-section-title">Boîtier & cadran</h2>

          <dl className="watchdetails-dl">
            <div>
              <dt>Matériau boîtier</dt>
              <dd>
                {labelOrId(watch.case_material_label, watch.case_material_id)}
              </dd>
            </div>

            <div>
              <dt>Diamètre</dt>
              <dd>{formatMm(asNumberOrNull(watch.diameter_mm))}</dd>
            </div>
            <div>
              <dt>Épaisseur</dt>
              <dd>{formatMm(asNumberOrNull(watch.thickness_mm))}</dd>
            </div>
            <div>
              <dt>Étanchéité</dt>
              <dd>{formatBar(asNumberOrNull(watch.water_resistance_bar))}</dd>
            </div>

            <div>
              <dt>Couleur cadran</dt>
              <dd>{formatValue(watch.dial_color)}</dd>
            </div>
            <div>
              <dt>Finition cadran</dt>
              <dd>
                {labelOrId(watch.dial_finish_label, watch.dial_finish_id)}
              </dd>
            </div>
            <div>
              <dt>Index / marqueurs</dt>
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
          <h2 className="watchdetails-section-title">Bracelet</h2>

          <dl className="watchdetails-dl">
            <div>
              <dt>Matériau bracelet</dt>
              <dd>
                {labelOrId(watch.strap_material_label, watch.strap_material_id)}
              </dd>
            </div>
            <div>
              <dt>Couleur bracelet</dt>
              <dd>{formatValue(watch.strap_color)}</dd>
            </div>
            <div>
              <dt>Type de fermoir</dt>
              <dd>{labelOrId(watch.clasp_type_label, watch.clasp_type_id)}</dd>
            </div>
            <div>
              <dt>Largeur entre-cornes</dt>
              <dd>{formatMm(asNumberOrNull(watch.lug_width_mm))}</dd>
            </div>
          </dl>
        </section>

        <section className="watchdetails-card">
          <h2 className="watchdetails-section-title">Mouvement</h2>

          <dl className="watchdetails-dl">
            <div>
              <dt>Type mouvement</dt>
              <dd>
                {labelOrId(watch.movement_type_label, watch.movement_type_id)}
              </dd>
            </div>
            <div>
              <dt>Calibre</dt>
              <dd>{formatValue(watch.caliber)}</dd>
            </div>
            <div>
              <dt>Fonctions</dt>
              <dd>{labelOrId(watch.functions_label, watch.functions_id)}</dd>
            </div>

            <div>
              <dt>Réserve de marche</dt>
              <dd>{formatHours(asNumberOrNull(watch.power_reserve_hours))}</dd>
            </div>
            <div>
              <dt>Fréquence</dt>
              <dd>{formatHz(asNumberOrNull(watch.frequency_hz))}</dd>
            </div>
            <div>
              <dt>Nombre de rubis</dt>
              <dd>{formatValue(watch.jewel_count)}</dd>
            </div>
          </dl>
        </section>

        <section className="watchdetails-card watchdetails-actions">
          {inShop && (
            <button
              type="button"
              className="watchdetails-buy"
              disabled={asNumberOrNull(watch.watch_price) == null}
              onClick={() => console.log("Acheter", watch.idwatch)}
            >
              Acheter
            </button>
          )}

          {inCollection && (
            <button
              type="button"
              className="watchdetails-sell"
              onClick={() => console.log("Mettre en vente", watch.idwatch)}
            >
              Mettre en vente
            </button>
          )}

          {!inShop && !inCollection && (
            <div className="watchdetails-empty">Action indisponible</div>
          )}
        </section>
      </div>
    </div>
  );
}
