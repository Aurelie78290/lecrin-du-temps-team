import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router";
import "../WatchDetails/WatchDetails.css";

// ============================
// TYPES (alignés WatchDetails)
// ============================
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

  // labels + ids
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

  photos: string[];
  certificates: string[];

  // ids utiles pour pré-remplir les selects marque/modèle
  brand_id?: number | null;
  model_id?: number | null;

  watch_photos?: PhotoDTO[];
  certificate_photos?: PhotoDTO[];
};

type WatchDetailsApi = Partial<WatchDetailsDTO> & {
  idwatch: number;
};

type Option = { id: number; name: string };

type PhotoDTO = {
  id: number;
  url: string;
  type: "watch" | "certificate";
  watch_id: number;
};

// ============================
// CONFIG
// ============================
const API_URL = "http://localhost:3310";

// ============================
// HELPERS
// ============================

const GENDER_OPTIONS = ["Homme", "Femme", "Unisexe"] as const;

const MAX_WATCH_PHOTOS = 5;
const MAX_CERT_PHOTOS = 3;

const CONDITION_OPTIONS = [
  "Neuf",
  "Excellent état",
  "Très bon état",
  "Bon état",
  "Etat correct",
  "A reviser",
] as const;
const asString = (v: unknown) => (typeof v === "string" ? v : "");
const asNumberOrNull = (v: unknown): number | null => {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  }
  return null;
};
const asStringOrNull = (v: unknown): string | null =>
  typeof v === "string" ? v : null;

const formatValue = (v: unknown) => {
  if (v === null || v === undefined || v === "") return "—";
  return String(v);
};
const formatPrice = (v: number | null) => {
  if (v == null) return "—";
  return `${new Intl.NumberFormat("fr-FR").format(v)} €`;
};
const formatDate = (v: string | null) => {
  if (!v) return "—";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleDateString("fr-FR");
};
const formatBoolTinyInt = (v: number | null) => {
  if (v == null) return "—";
  return v === 1 ? "Oui" : "Non";
};

const formatMm = (v: number | null) => (v == null ? "—" : `${v} mm`);
const formatBar = (v: number | null) => (v == null ? "—" : `${v} bar`);
const formatHours = (v: number | null) => (v == null ? "—" : `${v} h`);
const formatHz = (v: number | null) => (v == null ? "—" : `${v} Hz`);

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

// ============================
// WATCH EDIT
// ============================
export default function WatchEdit() {
  const { id } = useParams();
  const watchId = Number(id);

  const inCollection = !!useMatch("/collection/:id");

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: "collection" | "shop" } | null)
    ?.from;

  const [watch, setWatch] = useState<WatchDetailsDTO | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoDTO | null>(null);
  const [activeCert, setActiveCert] = useState<PhotoDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------- LOOKUPS ----------
  const [brands, setBrands] = useState<Option[]>([]);
  const [models, setModels] = useState<Option[]>([]);
  const [caseMaterials, setCaseMaterials] = useState<Option[]>([]);
  const [dialFinishes, setDialFinishes] = useState<Option[]>([]);
  const [hourMarkerTypes, setHourMarkerTypes] = useState<Option[]>([]);
  const [strapMaterials, setStrapMaterials] = useState<Option[]>([]);
  const [claspTypes, setClaspTypes] = useState<Option[]>([]);
  const [movementTypes, setMovementTypes] = useState<Option[]>([]);
  const [functionsList, setFunctionsList] = useState<Option[]>([]);
  // const [certificates, setCertificates] = useState<Option[]>([]);

  // ---------- FORM STATE ----------
  // marque / modèle
  const [brandId, setBrandId] = useState<number | "">("");
  const [modelId, setModelId] = useState<number | "">("");

  // base
  const [watchPrice, setWatchPrice] = useState<string>("");
  const [watchCondition, setWatchCondition] = useState<string>("");
  const [watchSellStatus, setWatchSellStatus] = useState<string>("");
  const [watchGender, setWatchGender] = useState<string>("");

  // général
  const [refNo, setRefNo] = useState<string>("");
  const [productionYear, setProductionYear] = useState<string>(""); // YYYY-MM-DD
  const [isLimitedEdition, setIsLimitedEdition] = useState<boolean>(false);
  const [editionNumber, setEditionNumber] = useState<string>("");

  // caractéristiques
  const [caseMaterialId, setCaseMaterialId] = useState<number | "">("");
  const [diameterMm, setDiameterMm] = useState<string>("");
  const [thicknessMm, setThicknessMm] = useState<string>("");
  const [waterResistanceBar, setWaterResistanceBar] = useState<string>("");

  const [dialColor, setDialColor] = useState<string>("");
  const [dialFinishId, setDialFinishId] = useState<number | "">("");
  const [hourMarkerTypeId, setHourMarkerTypeId] = useState<number | "">("");

  // bracelet
  const [strapMaterialId, setStrapMaterialId] = useState<number | "">("");
  const [strapColor, setStrapColor] = useState<string>("");
  const [claspTypeId, setClaspTypeId] = useState<number | "">("");
  const [lugWidthMm, setLugWidthMm] = useState<string>("");

  // mouvement
  const [movementTypeId, setMovementTypeId] = useState<number | "">("");
  const [caliber, setCaliber] = useState<string>("");
  const [functionsId, setFunctionsId] = useState<number | "">("");
  const [powerReserveHours, setPowerReserveHours] = useState<string>("");
  const [frequencyHz, setFrequencyHz] = useState<string>("");
  const [jewelCount, setJewelCount] = useState<string>("");

  // certificat (lookup)
  const [certificateId, setCertificateId] = useState<number | "">("");

  // uploads (multi)
  const [watchImages, setWatchImages] = useState<File[]>([]);
  const [certificateImages, setCertificateImages] = useState<File[]>([]);
  const [uploadingWatch, setUploadingWatch] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);

  const watchPhotos = useMemo(() => watch?.watch_photos ?? [], [watch]);
  const certPhotos = useMemo(() => watch?.certificate_photos ?? [], [watch]);

  // ===== LIMITES RESTANTES =====
  const remainingWatchSlots = Math.max(
    0,
    MAX_WATCH_PHOTOS - watchPhotos.length,
  );
  const remainingCertSlots = Math.max(0, MAX_CERT_PHOTOS - certPhotos.length);

  // ===== HANDLERS FILE PICK =====
  const handlePickWatchFiles = (files: FileList | null) => {
    if (!files) return;
    const picked = Array.from(files);

    const allowed = picked.slice(0, remainingWatchSlots);
    setWatchImages((prev) =>
      [...prev, ...allowed].slice(0, remainingWatchSlots),
    );
  };

  const handlePickCertFiles = (files: FileList | null) => {
    if (!files) return;
    const picked = Array.from(files);

    const allowed = picked.slice(0, remainingCertSlots);
    setCertificateImages((prev) =>
      [...prev, ...allowed].slice(0, remainingCertSlots),
    );
  };

  // ===== UPLOAD MULTI PHOTOS =====
  const uploadPhotos = async (type: "watch" | "certificate") => {
    const files = type === "watch" ? watchImages : certificateImages;
    if (files.length === 0) return;

    try {
      type === "watch" ? setUploadingWatch(true) : setUploadingCert(true);

      const fd = new FormData();
      fd.append("type", type);
      for (const f of files) fd.append("images", f);

      const res = await fetch(`${API_URL}/api/watches/${watchId}/photos`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      const txt = await res.text().catch(() => "");
      if (!res.ok) throw new Error(txt || "Erreur upload photos");

      // refresh montre
      const refreshed = await fetch(`${API_URL}/api/watches/${watchId}`, {
        credentials: "include",
      }).then((r) => r.json());

      setWatch((prev) => (prev ? { ...prev, ...refreshed } : refreshed));

      if (type === "watch") {
        setWatchImages([]);
        const newPhotos = Array.isArray(refreshed.watch_photos)
          ? refreshed.watch_photos
          : [];
        setActivePhoto(newPhotos[0] ?? null);
      } else {
        setCertificateImages([]);
        const newCerts = Array.isArray(refreshed.certificate_photos)
          ? refreshed.certificate_photos
          : [];
        setActiveCert(newCerts[0] ?? null);
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur upload");
    } finally {
      type === "watch" ? setUploadingWatch(false) : setUploadingCert(false);
    }
  };

  // ============================
  // LOAD LOOKUPS
  // ============================
  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/lookups/brands`).then((r) => r.json()),
      fetch(`${API_URL}/api/lookups/case-materials`).then((r) => r.json()),
      fetch(`${API_URL}/api/lookups/dial-finishes`).then((r) => r.json()),
      fetch(`${API_URL}/api/lookups/hour-marker-types`).then((r) => r.json()),
      fetch(`${API_URL}/api/lookups/strap-materials`).then((r) => r.json()),
      fetch(`${API_URL}/api/lookups/clasp-types`).then((r) => r.json()),
      fetch(`${API_URL}/api/lookups/movement-types`).then((r) => r.json()),
      fetch(`${API_URL}/api/lookups/functions`).then((r) => r.json()),
      fetch(`${API_URL}/api/lookups/certificates`).then((r) => r.json()),
    ])
      .then(
        ([
          brandsData,
          caseMaterialsData,
          dialFinishesData,
          hourMarkerTypesData,
          strapMaterialsData,
          claspTypesData,
          movementTypesData,
          functionsData,
          // certificatesData,
        ]) => {
          setBrands(brandsData);
          setCaseMaterials(caseMaterialsData);
          setDialFinishes(dialFinishesData);
          setHourMarkerTypes(hourMarkerTypesData);
          setStrapMaterials(strapMaterialsData);
          setClaspTypes(claspTypesData);
          setMovementTypes(movementTypesData);
          setFunctionsList(functionsData);
          // setCertificates(certificatesData);
        },
      )
      .catch((e) => {
        console.error(e);
        // pas bloquant : on peut quand même éditer les champs texte
      });
  }, []);

  // ============================
  // LOAD WATCH
  // ============================
  useEffect(() => {
    if (!Number.isFinite(watchId)) {
      setError("ID invalide");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/watches/${watchId}`, {
      credentials: "include",
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
        const normalized: WatchDetailsDTO = {
          idwatch: data.idwatch,
          brand: data.brand ?? "",
          model: data.model ?? "",
          watch_price: data.watch_price ?? null,
          watch_condition: data.watch_condition ?? null,

          ref_no: data.ref_no ?? null,
          production_year: data.production_year ?? null,
          is_limited_edition: data.is_limited_edition ?? null,
          edition_number: data.edition_number ?? null,

          watch_gender: data.watch_gender ?? null,
          watch_sell_status: data.watch_sell_status ?? null,

          diameter_mm: data.diameter_mm ?? null,
          thickness_mm: data.thickness_mm ?? null,
          water_resistance_bar: data.water_resistance_bar ?? null,

          dial_color: data.dial_color ?? null,

          case_material_label: data.case_material_label ?? null,
          case_material_id: data.case_material_id ?? null,

          dial_finish_label: data.dial_finish_label ?? null,
          dial_finish_id: data.dial_finish_id ?? null,

          hour_marker_type_label: data.hour_marker_type_label ?? null,
          hour_marker_type_id: data.hour_marker_type_id ?? null,

          strap_material_label: data.strap_material_label ?? null,
          strap_material_id: data.strap_material_id ?? null,

          clasp_type_label: data.clasp_type_label ?? null,
          clasp_type_id: data.clasp_type_id ?? null,

          movement_type_label: data.movement_type_label ?? null,
          movement_type_id: data.movement_type_id ?? null,

          functions_label: data.functions_label ?? null,
          functions_id: data.functions_id ?? null,

          strap_color: data.strap_color ?? null,
          lug_width_mm: data.lug_width_mm ?? null,

          caliber: data.caliber ?? null,
          power_reserve_hours: data.power_reserve_hours ?? null,
          frequency_hz: data.frequency_hz ?? null,
          jewel_count: data.jewel_count ?? null,

          certificate_label: data.certificate_label ?? null,
          certificate_id: data.certificate_id ?? null,

          photos: Array.isArray(data.photos) ? data.photos : [],
          certificates: Array.isArray(data.certificates)
            ? data.certificates
            : [],

          brand_id: data.brand_id ?? null,
          model_id: data.model_id ?? null,

          watch_photos: Array.isArray(data.watch_photos)
            ? data.watch_photos
            : [],
          certificate_photos: Array.isArray(data.certificate_photos)
            ? data.certificate_photos
            : [],
        };

        setWatch(normalized);
        setActivePhoto(normalized.watch_photos?.[0] ?? null);
        setActiveCert(normalized.certificate_photos?.[0] ?? null);

        // ---------- PREFILL FORM ----------
        // marque / modèle (id)
        setBrandId(normalized.brand_id ?? "");
        setModelId(normalized.model_id ?? "");

        // base
        setWatchPrice(
          normalized.watch_price == null ? "" : String(normalized.watch_price),
        );
        setWatchCondition(asString(normalized.watch_condition));
        setWatchSellStatus(asString(normalized.watch_sell_status));
        setWatchGender(asString(normalized.watch_gender));

        // général
        setRefNo(normalized.ref_no == null ? "" : String(normalized.ref_no));
        setProductionYear(asString(normalized.production_year).slice(0, 10));
        setIsLimitedEdition(Number(normalized.is_limited_edition) === 1);
        setEditionNumber(
          normalized.edition_number == null
            ? ""
            : String(normalized.edition_number),
        );

        // caractéristiques
        setCaseMaterialId(asNumberOrNull(normalized.case_material_id) ?? "");
        setDiameterMm(
          normalized.diameter_mm == null ? "" : String(normalized.diameter_mm),
        );
        setThicknessMm(
          normalized.thickness_mm == null
            ? ""
            : String(normalized.thickness_mm),
        );
        setWaterResistanceBar(
          normalized.water_resistance_bar == null
            ? ""
            : String(normalized.water_resistance_bar),
        );

        setDialColor(asString(normalized.dial_color));
        setDialFinishId(asNumberOrNull(normalized.dial_finish_id) ?? "");
        setHourMarkerTypeId(
          asNumberOrNull(normalized.hour_marker_type_id) ?? "",
        );

        // bracelet
        setStrapMaterialId(asNumberOrNull(normalized.strap_material_id) ?? "");
        setStrapColor(asString(normalized.strap_color));
        setClaspTypeId(asNumberOrNull(normalized.clasp_type_id) ?? "");
        setLugWidthMm(
          normalized.lug_width_mm == null
            ? ""
            : String(normalized.lug_width_mm),
        );

        // mouvement
        setMovementTypeId(asNumberOrNull(normalized.movement_type_id) ?? "");
        setCaliber(asString(normalized.caliber));
        setFunctionsId(asNumberOrNull(normalized.functions_id) ?? "");
        setPowerReserveHours(
          normalized.power_reserve_hours == null
            ? ""
            : String(normalized.power_reserve_hours),
        );
        setFrequencyHz(
          normalized.frequency_hz == null
            ? ""
            : String(normalized.frequency_hz),
        );
        setJewelCount(
          normalized.jewel_count == null ? "" : String(normalized.jewel_count),
        );

        // certificat
        setCertificateId(asNumberOrNull(normalized.certificate_id) ?? "");
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      })
      .finally(() => setLoading(false));
  }, [watchId]);

  // ============================
  // LOAD MODELS WHEN BRAND CHANGES
  // ============================
  useEffect(() => {
    if (brandId === "") {
      setModels([]);
      setModelId("");
      return;
    }

    fetch(`${API_URL}/api/lookups/brands/${brandId}/models`)
      .then((r) => r.json())
      .then((data: Option[]) => {
        setModels(data);

        // si le modelId actuel n'appartient pas à la nouvelle marque -> reset
        if (modelId !== "" && !data.some((m) => m.id === modelId)) {
          setModelId("");
        }
      })
      .catch((e) => {
        console.error(e);
        setModels([]);
      });
  }, [brandId, modelId]);

  // ============================
  // SUBMIT (PUT FormData)
  // ============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Number.isFinite(watchId)) return;

    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();

      // ✅ ids obligatoires
      if (brandId === "" || modelId === "") {
        setError("Marque et Modèle sont requis");
        setSaving(false);
        return;
      }

      formData.append("brand_id", String(brandId));
      formData.append("model_id", String(modelId));

      // base
      if (watchPrice !== "") formData.append("watch_price", watchPrice);
      if (watchCondition !== "")
        formData.append("watch_condition", watchCondition);
      if (watchSellStatus !== "")
        formData.append("watch_sell_status", watchSellStatus);
      if (watchGender !== "") formData.append("watch_gender", watchGender);

      // général
      if (refNo !== "") formData.append("ref_no", refNo);
      if (productionYear !== "")
        formData.append("production_year", productionYear);
      formData.append("is_limited_edition", isLimitedEdition ? "1" : "0");
      if (editionNumber !== "")
        formData.append("edition_number", editionNumber);

      // caractéristiques
      if (caseMaterialId !== "")
        formData.append("case_material_id", String(caseMaterialId));
      if (diameterMm !== "") formData.append("diameter_mm", diameterMm);
      if (thicknessMm !== "") formData.append("thickness_mm", thicknessMm);
      if (waterResistanceBar !== "")
        formData.append("water_resistance_bar", waterResistanceBar);

      if (dialColor !== "") formData.append("dial_color", dialColor);
      if (dialFinishId !== "")
        formData.append("dial_finish_id", String(dialFinishId));
      if (hourMarkerTypeId !== "")
        formData.append("hour_marker_type_id", String(hourMarkerTypeId));

      // bracelet
      if (strapMaterialId !== "")
        formData.append("strap_material_id", String(strapMaterialId));
      if (strapColor !== "") formData.append("strap_color", strapColor);
      if (claspTypeId !== "")
        formData.append("clasp_type_id", String(claspTypeId));
      if (lugWidthMm !== "") formData.append("lug_width_mm", lugWidthMm);

      // mouvement
      if (movementTypeId !== "")
        formData.append("movement_type_id", String(movementTypeId));
      if (caliber !== "") formData.append("caliber", caliber);
      if (functionsId !== "")
        formData.append("functions_id", String(functionsId));
      if (powerReserveHours !== "")
        formData.append("power_reserve_hours", powerReserveHours);
      if (frequencyHz !== "") formData.append("frequency_hz", frequencyHz);
      if (jewelCount !== "") formData.append("jewel_count", jewelCount);

      // certificat
      if (certificateId !== "")
        formData.append("certificate_id", String(certificateId));

      //       console.log("=== WATCHEDIT FORM DATA ===");
      // for (const [k, v] of formData.entries()) {
      //   console.log(k, v);
      // }
      console.log("=== END ===");
      const res = await fetch(`${API_URL}/api/watches/${watchId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const bodyText = await res.text().catch(() => "");
      if (!res.ok) {
        throw new Error(bodyText || `Erreur update (${res.status})`);
      }

      navigate(
        from === "collection" || inCollection
          ? `/collection/${watchId}`
          : `/shop/${watchId}`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur update");
    } finally {
      setSaving(false);
    }
  };

  // ============================
  // UI STATES
  // ============================
  if (loading) return <div className="watchdetails-state">Chargement…</div>;

  if (error || !watch) {
    return (
      <div className="watchdetails-state">
        <p>Erreur : {error ?? "Montre introuvable"}</p>
        <Link to={inCollection ? "/collection" : "/shop"}>← Retour</Link>
      </div>
    );
  }

  // ============================
  // RENDER
  // ============================
  return (
    <div className="watchdetails-page">
      <div className="watchdetails-layout">
        <div className="watchdetails-100vh">
          <Link
            className="watchdetails-back"
            to={inCollection ? "/collection" : "/shop"}
          >
            ← Retour {inCollection ? "Collection" : "Boutique"}
          </Link>

          <header className="watchdetails-header">
            <h1 className="watchdetails-title">Modifier la montre</h1>
            <div className="watchdetails-price">
              Prix actuel: {formatPrice(asNumberOrNull(watch.watch_price))}
            </div>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="watchdetails-layout-flex">
              {/* Galerie (identique) */}
              <section className="watchdetails-card watchdetails-card-w40">
                <div className="watchdetails-main">
                  {activePhoto ? (
                    <img src={`${API_URL}${activePhoto.url}`} alt="" />
                  ) : (
                    <div className="watchdetails-empty">Aucune photo</div>
                  )}
                </div>

                {watchPhotos.length > 0 && (
                  <div className="watchdetails-thumbs">
                    {watchPhotos.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`watchdetails-thumb ${p.id === activePhoto?.id ? "is-active" : ""}`}
                        onClick={() => setActivePhoto(p)}
                      >
                        <img src={`${API_URL}${p.url}`} alt="" />
                      </button>
                    ))}
                    <button
                      type="button"
                      className="watchdetails-delete"
                      disabled={!activePhoto}
                      onClick={async () => {
                        if (!activePhoto) return;

                        if (!window.confirm("Supprimer cette photo ?")) return;

                        const res = await fetch(
                          `${API_URL}/api/photos/${activePhoto.id}`,
                          {
                            method: "DELETE",
                            credentials: "include",
                          },
                        );

                        if (!res.ok) {
                          const msg = await res.text().catch(() => "");
                          alert(msg || "Erreur suppression photo");
                          return;
                        }

                        // ✅ refresh : on refetch la montre ou on met à jour le state local
                        const refreshed = await fetch(
                          `${API_URL}/api/watches/${watchId}`,
                          {
                            credentials: "include",
                          },
                        ).then((r) => r.json());

                        setWatch((prev) =>
                          prev ? { ...prev, ...refreshed } : refreshed,
                        );

                        // reset activePhoto après refresh
                        const newWatchPhotos = Array.isArray(
                          refreshed.watch_photos,
                        )
                          ? refreshed.watch_photos
                          : [];
                        setActivePhoto(newWatchPhotos[0] ?? null);
                      }}
                    >
                      Supprimer la photo sélectionnée
                    </button>
                  </div>
                )}

                {/* Uploads */}
                <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>
                      Photos montre (max {MAX_WATCH_PHOTOS}) —{" "}
                      {watchPhotos.length}/{MAX_WATCH_PHOTOS}
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={remainingWatchSlots === 0}
                      onChange={(e) => handlePickWatchFiles(e.target.files)}
                    />

                    <div style={{ opacity: 0.75, marginTop: 6 }}>
                      Sélection : {watchImages.length} (reste{" "}
                      {remainingWatchSlots})
                    </div>

                    <button
                      type="button"
                      className="watchdetails-edit"
                      disabled={uploadingWatch || watchImages.length === 0}
                      onClick={() => uploadPhotos("watch")}
                      style={{ marginTop: 8 }}
                    >
                      {uploadingWatch ? "Upload…" : "Uploader les photos"}
                    </button>
                  </div>
                </div>
              </section>

              {/* Informations générales */}
              <section className="watchdetails-card watchdetails-card-w50">
                <h2 className="watchdetails-section-title">
                  Informations générales
                </h2>

                <dl className="watchdetails-dl">
                  {/* MARQUE */}
                  <div>
                    <dt>MARQUE</dt>
                    <dd>
                      <select
                        value={brandId}
                        onChange={(e) =>
                          setBrandId(
                            e.target.value === "" ? "" : Number(e.target.value),
                          )
                        }
                        required
                      >
                        <option value="">Sélectionner…</option>
                        {brands.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </dd>
                  </div>

                  {/* MODELE */}
                  <div>
                    <dt>MODELE</dt>
                    <dd>
                      <select
                        value={modelId}
                        onChange={(e) =>
                          setModelId(
                            e.target.value === "" ? "" : Number(e.target.value),
                          )
                        }
                        disabled={brandId === ""}
                        required
                      >
                        <option value="">
                          {brandId === ""
                            ? "Choisir une marque d'abord"
                            : "Sélectionner…"}
                        </option>
                        {models.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </dd>
                  </div>

                  <div>
                    <dt>REFERENCE (ref_no)</dt>
                    <dd>
                      <input
                        value={refNo}
                        onChange={(e) => setRefNo(e.target.value)}
                        placeholder="Ex: 124060"
                      />
                    </dd>
                  </div>

                  <div>
                    <dt>ANNEE DE PRODUCTION</dt>
                    <dd>
                      <input
                        type="date"
                        value={productionYear}
                        onChange={(e) => setProductionYear(e.target.value)}
                      />
                      <div style={{ opacity: 0.7, marginTop: 4 }}>
                        Actuel:{" "}
                        {formatDate(asStringOrNull(watch.production_year))}
                      </div>
                    </dd>
                  </div>

                  <div>
                    <dt>EDITION LIMITEE</dt>
                    <dd>
                      <label
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isLimitedEdition}
                          onChange={(e) =>
                            setIsLimitedEdition(e.target.checked)
                          }
                        />
                        {isLimitedEdition ? "Oui" : "Non"}
                      </label>
                      <div style={{ opacity: 0.7, marginTop: 4 }}>
                        Actuel:{" "}
                        {formatBoolTinyInt(
                          asNumberOrNull(watch.is_limited_edition),
                        )}
                      </div>
                    </dd>
                  </div>

                  <div>
                    <dt>N° D'EDITION</dt>
                    <dd>
                      <input
                        value={editionNumber}
                        onChange={(e) => setEditionNumber(e.target.value)}
                        placeholder="Ex: 12/200"
                      />
                    </dd>
                  </div>

                  <div>
                    <dt>GENRE</dt>
                    <dd>
                      <select
                        value={watchGender}
                        onChange={(e) => setWatchGender(e.target.value)}
                      >
                        <option value="">—</option>
                        {GENDER_OPTIONS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>

                      <div style={{ opacity: 0.7, marginTop: 4 }}>
                        Actuel: {watch.watch_gender ?? "—"}
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt>ETAT</dt>
                    <dd>
                      <select
                        value={watchCondition}
                        onChange={(e) => setWatchCondition(e.target.value)}
                      >
                        <option value="">—</option>
                        {CONDITION_OPTIONS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      <div style={{ opacity: 0.7, marginTop: 4 }}>
                        Actuel: {watch.watch_condition ?? "—"}
                      </div>
                    </dd>
                  </div>

                  <div>
                    <dt>PRIX</dt>
                    <dd>
                      <input
                        type="number"
                        value={watchPrice}
                        onChange={(e) => setWatchPrice(e.target.value)}
                        placeholder="Prix d'achat"
                      />
                    </dd>
                  </div>
                </dl>
              </section>
            </div>

            <div className="watchdetails-100vhMax">
              <div className="watchdetails-layout-flex">
                <div className="watchdetails-card-w40">
                  <section className="watchdetails-card">
                    <h2 className="watchdetails-section-title">Certificats</h2>

                    <div className="watchdetails-main">
                      {activeCert ? (
                        <img src={`${API_URL}${activeCert.url}`} alt="" />
                      ) : (
                        <div className="watchdetails-empty">
                          Aucun certificat
                        </div>
                      )}
                    </div>

                    {certPhotos.length > 0 && (
                      <div className="watchdetails-thumbs">
                        {certPhotos.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            className={`watchdetails-thumb ${p.id === activeCert?.id ? "is-active" : ""}`}
                            onClick={() => setActiveCert(p)}
                          >
                            <img src={`${API_URL}${p.url}`} alt="" />
                          </button>
                        ))}

                        <button
                          type="button"
                          className="watchdetails-delete"
                          disabled={!activeCert}
                          onClick={async () => {
                            if (!activeCert) return;
                            if (!window.confirm("Supprimer ce certificat ?"))
                              return;

                            const res = await fetch(
                              `${API_URL}/api/photos/${activeCert.id}`,
                              {
                                method: "DELETE",
                                credentials: "include",
                              },
                            );

                            if (!res.ok) {
                              const msg = await res.text().catch(() => "");
                              alert(msg || "Erreur suppression certificat");
                              return;
                            }

                            const refreshed = await fetch(
                              `${API_URL}/api/watches/${watchId}`,
                              {
                                credentials: "include",
                              },
                            ).then((r) => r.json());

                            setWatch((prev) =>
                              prev ? { ...prev, ...refreshed } : refreshed,
                            );

                            const newCerts = Array.isArray(
                              refreshed.certificate_photos,
                            )
                              ? refreshed.certificate_photos
                              : [];
                            setActiveCert(newCerts[0] ?? null);
                          }}
                        >
                          Supprimer le certificat sélectionné
                        </button>
                      </div>
                    )}
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontWeight: 600, marginBottom: 6 }}>
                        Certificats (max {MAX_CERT_PHOTOS}) —{" "}
                        {certPhotos.length}/{MAX_CERT_PHOTOS}
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={remainingCertSlots === 0}
                        onChange={(e) => handlePickCertFiles(e.target.files)}
                      />

                      <div style={{ opacity: 0.75, marginTop: 6 }}>
                        Sélection : {certificateImages.length} (reste{" "}
                        {remainingCertSlots})
                      </div>

                      <button
                        type="button"
                        className="watchdetails-edit"
                        disabled={
                          uploadingCert || certificateImages.length === 0
                        }
                        onClick={() => uploadPhotos("certificate")}
                        style={{ marginTop: 8 }}
                      >
                        {uploadingCert ? "Upload…" : "Uploader les certificats"}
                      </button>
                    </div>
                  </section>
                </div>

                {/* Caractéristiques + bracelet + mouvement */}
                <div className="watchdetails-card-w50">
                  <section className="watchdetails-card">
                    <h2 className="watchdetails-section-title">
                      Caractéristiques
                    </h2>

                    <dl className="watchdetails-dl">
                      <div>
                        <dt>MATERIAU BOITIER</dt>
                        <dd>
                          <select
                            value={caseMaterialId}
                            onChange={(e) =>
                              setCaseMaterialId(
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value),
                              )
                            }
                          >
                            <option value="">—</option>
                            {caseMaterials.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.name}
                              </option>
                            ))}
                          </select>
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {labelOrId(
                              watch.case_material_label,
                              watch.case_material_id,
                            )}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>DIAMETRE</dt>
                        <dd>
                          <input
                            type="number"
                            value={diameterMm}
                            onChange={(e) => setDiameterMm(e.target.value)}
                            placeholder="mm"
                          />
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {formatMm(asNumberOrNull(watch.diameter_mm))}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>EPAISSEUR</dt>
                        <dd>
                          <input
                            type="number"
                            value={thicknessMm}
                            onChange={(e) => setThicknessMm(e.target.value)}
                            placeholder="mm"
                          />
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {formatMm(asNumberOrNull(watch.thickness_mm))}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>ETANCHEITE</dt>
                        <dd>
                          <input
                            type="number"
                            value={waterResistanceBar}
                            onChange={(e) =>
                              setWaterResistanceBar(e.target.value)
                            }
                            placeholder="bar"
                          />
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {formatBar(
                              asNumberOrNull(watch.water_resistance_bar),
                            )}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>COULEUR CADRAN</dt>
                        <dd>
                          <input
                            value={dialColor}
                            onChange={(e) => setDialColor(e.target.value)}
                            placeholder="Noir, Bleu..."
                          />
                        </dd>
                      </div>

                      <div>
                        <dt>FINITION CADRAN</dt>
                        <dd>
                          <select
                            value={dialFinishId}
                            onChange={(e) =>
                              setDialFinishId(
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value),
                              )
                            }
                          >
                            <option value="">—</option>
                            {dialFinishes.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.name}
                              </option>
                            ))}
                          </select>
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {labelOrId(
                              watch.dial_finish_label,
                              watch.dial_finish_id,
                            )}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>INDEX / MARQUEURS</dt>
                        <dd>
                          <select
                            value={hourMarkerTypeId}
                            onChange={(e) =>
                              setHourMarkerTypeId(
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value),
                              )
                            }
                          >
                            <option value="">—</option>
                            {hourMarkerTypes.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.name}
                              </option>
                            ))}
                          </select>
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {labelOrId(
                              watch.hour_marker_type_label,
                              watch.hour_marker_type_id,
                            )}
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </section>

                  <section className="watchdetails-card">
                    <dl className="watchdetails-dl">
                      <div>
                        <dt>MATERIAU BRACELET</dt>
                        <dd>
                          <select
                            value={strapMaterialId}
                            onChange={(e) =>
                              setStrapMaterialId(
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value),
                              )
                            }
                          >
                            <option value="">—</option>
                            {strapMaterials.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.name}
                              </option>
                            ))}
                          </select>
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {labelOrId(
                              watch.strap_material_label,
                              watch.strap_material_id,
                            )}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>COULEUR BRACELET</dt>
                        <dd>
                          <input
                            value={strapColor}
                            onChange={(e) => setStrapColor(e.target.value)}
                            placeholder="Noir, Brun..."
                          />
                        </dd>
                      </div>

                      <div>
                        <dt>TYPE DE FERMOIR</dt>
                        <dd>
                          <select
                            value={claspTypeId}
                            onChange={(e) =>
                              setClaspTypeId(
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value),
                              )
                            }
                          >
                            <option value="">—</option>
                            {claspTypes.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.name}
                              </option>
                            ))}
                          </select>
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {labelOrId(
                              watch.clasp_type_label,
                              watch.clasp_type_id,
                            )}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>LARGEUR ENTRE-CORNES</dt>
                        <dd>
                          <input
                            type="number"
                            value={lugWidthMm}
                            onChange={(e) => setLugWidthMm(e.target.value)}
                            placeholder="mm"
                          />
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {formatMm(asNumberOrNull(watch.lug_width_mm))}
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </section>

                  <section className="watchdetails-card">
                    <dl className="watchdetails-dl">
                      <div>
                        <dt>TYPE MOUVEMENT</dt>
                        <dd>
                          <select
                            value={movementTypeId}
                            onChange={(e) =>
                              setMovementTypeId(
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value),
                              )
                            }
                          >
                            <option value="">—</option>
                            {movementTypes.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.name}
                              </option>
                            ))}
                          </select>
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {labelOrId(
                              watch.movement_type_label,
                              watch.movement_type_id,
                            )}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>CALIBRE</dt>
                        <dd>
                          <input
                            value={caliber}
                            onChange={(e) => setCaliber(e.target.value)}
                            placeholder="Ex: 3230"
                          />
                        </dd>
                      </div>

                      <div>
                        <dt>FONCTIONS</dt>
                        <dd>
                          <select
                            value={functionsId}
                            onChange={(e) =>
                              setFunctionsId(
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value),
                              )
                            }
                          >
                            <option value="">—</option>
                            {functionsList.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.name}
                              </option>
                            ))}
                          </select>
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {labelOrId(
                              watch.functions_label,
                              watch.functions_id,
                            )}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>RESERVE DE MARCHE</dt>
                        <dd>
                          <input
                            type="number"
                            value={powerReserveHours}
                            onChange={(e) =>
                              setPowerReserveHours(e.target.value)
                            }
                            placeholder="heures"
                          />
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {formatHours(
                              asNumberOrNull(watch.power_reserve_hours),
                            )}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>FREQUENCE</dt>
                        <dd>
                          <input
                            type="number"
                            value={frequencyHz}
                            onChange={(e) => setFrequencyHz(e.target.value)}
                            placeholder="Hz"
                          />
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel:{" "}
                            {formatHz(asNumberOrNull(watch.frequency_hz))}
                          </div>
                        </dd>
                      </div>

                      <div>
                        <dt>NOMBRE DE RUBIS</dt>
                        <dd>
                          <input
                            type="number"
                            value={jewelCount}
                            onChange={(e) => setJewelCount(e.target.value)}
                            placeholder="rubis"
                          />
                          <div style={{ opacity: 0.7, marginTop: 4 }}>
                            Actuel: {formatValue(watch.jewel_count)}
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </section>
                </div>
              </div>

              {/* Actions (même style que details) */}
              <section className="watchdetails-card watchdetails-actions">
                <button
                  type="submit"
                  className="watchdetails-edit"
                  disabled={saving}
                >
                  {saving ? "Enregistrement…" : "Enregistrer"}
                </button>

                <button
                  type="button"
                  className="watchdetails-buy"
                  onClick={() =>
                    navigate(
                      from === "collection" || inCollection
                        ? `/collection/${watchId}`
                        : `/shop/${watchId}`,
                    )
                  }
                >
                  Annuler
                </button>
              </section>

              {error && (
                <div className="watchdetails-state" style={{ marginTop: 12 }}>
                  <p>Erreur : {error}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
