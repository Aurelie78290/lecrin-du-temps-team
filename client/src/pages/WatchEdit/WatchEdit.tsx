import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";

const API_URL = "http://localhost:3310";

type Watch = Record<string, unknown> & {
  idwatch: number;
  photos?: string[];
};

const asString = (v: unknown) => (typeof v === "string" ? v : "");
const asNumberString = (v: unknown) => {
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v;
  return "";
};

export default function WatchEdit() {
  const { id } = useParams();
  const watchId = Number(id);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const userId = 1; // temporaire tant que pas d'auth

  const [watch, setWatch] = useState<Watch | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Champs du form (tu peux en ajouter au fur et à mesure)
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [sellStatus, setSellStatus] = useState("");
  const [productionYear, setProductionYear] = useState(""); // "YYYY-MM-DD"
  const [refNo, setRefNo] = useState("");
  const [isLimited, setIsLimited] = useState(false);
  const [editionNumber, setEditionNumber] = useState("");

  // Images (option simple : remplacer la principale / certificat)
  const [watchImage, setWatchImage] = useState<File | null>(null);
  const [certificateImage, setCertificateImage] = useState<File | null>(null);

  const photos = useMemo(() => watch?.photos ?? [], [watch]);

  useEffect(() => {
    if (!Number.isFinite(watchId)) {
      setError("ID invalide");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/watches/${watchId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json() as Promise<Watch>;
      })
      .then((data) => {
        setWatch(data);

        // Pré-remplissage : adapte selon ce que renvoie ton API
        setBrandId(asNumberString(data.brand_id ?? data.brandId));
        setModelId(asNumberString(data.model_id ?? data.modelId));
        setPrice(asNumberString(data.watch_price));
        setCondition(asString(data.watch_condition));
        setSellStatus(asString(data.watch_sell_status));
        setProductionYear(asString(data.production_year).slice(0, 10));
        setRefNo(asString(data.ref_no));
        setIsLimited(Number(data.is_limited_edition) === 1);
        setEditionNumber(asNumberString(data.edition_number));
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Erreur"))
      .finally(() => setLoading(false));
  }, [watchId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Number.isFinite(watchId)) return;

    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();

      // important si ton backend s'en sert
      formData.append("userId", String(userId));

      // champs (n’envoie que ce que tu gères côté backend)
      if (brandId) formData.append("brand_id", brandId);
      if (modelId) formData.append("model_id", modelId);
      if (price) formData.append("watch_price", price);
      if (condition) formData.append("watch_condition", condition);
      if (sellStatus) formData.append("watch_sell_status", sellStatus);
      if (productionYear) formData.append("production_year", productionYear);
      if (refNo) formData.append("ref_no", refNo);
      formData.append("is_limited_edition", isLimited ? "1" : "0");
      if (editionNumber) formData.append("edition_number", editionNumber);

      // images
      if (watchImage) formData.append("watch_image", watchImage);
      if (certificateImage)
        formData.append("certificate_image", certificateImage);

      const res = await fetch(`${API_URL}/api/watches/${watchId}`, {
        method: "PUT",
        body: formData,
      });

      const bodyText = await res.text().catch(() => "");
      if (!res.ok) {
        throw new Error(bodyText || `Erreur update (${res.status})`);
      }

      // si ton API renvoie la watch updated en JSON, tu peux faire res.json()
      navigate(
        from === "collection" ? `/Collection/${watchId}` : `/Shop/${watchId}`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Chargement…</div>;
  if (error) {
    return (
      <div>
        <p>Erreur : {error}</p>
        <Link to={`/watches/${watchId}`}>← Retour</Link>
      </div>
    );
  }

  return (
    <div className="watchedit-page">
      <Link to={`/watches/${watchId}`}>← Retour détails</Link>

      <h1>Modifier la montre</h1>

      {/* petit rappel visuel */}
      {photos.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {photos.map((p) => (
            <img
              key={p}
              src={`${API_URL}${p}`}
              alt=""
              style={{
                width: 90,
                height: 90,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Brand ID
          <input value={brandId} onChange={(e) => setBrandId(e.target.value)} />
        </label>

        <label>
          Model ID
          <input value={modelId} onChange={(e) => setModelId(e.target.value)} />
        </label>

        <label>
          Prix
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>

        <label>
          État
          <input
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
        </label>

        <label>
          Statut de vente
          <input
            value={sellStatus}
            onChange={(e) => setSellStatus(e.target.value)}
          />
        </label>

        <label>
          Année de production (date)
          <input
            type="date"
            value={productionYear}
            onChange={(e) => setProductionYear(e.target.value)}
          />
        </label>

        <label>
          Référence (ref_no)
          <input value={refNo} onChange={(e) => setRefNo(e.target.value)} />
        </label>

        <label>
          Édition limitée
          <input
            type="checkbox"
            checked={isLimited}
            onChange={(e) => setIsLimited(e.target.checked)}
          />
        </label>

        <label>
          N° édition
          <input
            value={editionNumber}
            onChange={(e) => setEditionNumber(e.target.value)}
          />
        </label>

        <label>
          Nouvelle photo montre (optionnel)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setWatchImage(e.target.files?.[0] ?? null)}
          />
        </label>

        <label>
          Nouveau certificat (optionnel)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCertificateImage(e.target.files?.[0] ?? null)}
          />
        </label>

        <button type="submit" disabled={saving}>
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}
