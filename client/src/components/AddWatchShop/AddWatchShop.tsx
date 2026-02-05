import { useContext, useEffect, useState } from "react";
import "./AddWatchShop.css";
import { AuthContext } from "../../contexts/AuthContext";

interface BrandListI {
  id: number;
  name: string;
}
interface ModelListI {
  id: number;
  name: string;
  brand_id: number;
}
interface CaseMaterialListI {
  idcase_material: number;
  case_material_name: string;
}
interface DialFinishListI {
  iddial_finish: number;
  dial_finish_name: string;
}
interface HourMakerTypeListI {
  idhour_maker_type: number;
  hour_maker_type_name: string;
}
interface StrapMaterialListI {
  idstrap_material: number;
  strap_material_name: string;
}
interface ClaspTypeListI {
  idclasp_type: number;
  clasp_type_name: string;
}
interface MovementTypeListI {
  idmovement_type: number;
  movement_type: string;
}
interface FunctionListI {
  idfunctions: number;
  function_name: string;
}

const WATCH_CONDITIONS = [
  "Neuf",
  "Excellent état",
  "Très bon état",
  "Bon état",
  "État correct",
  "À réviser",
] as const;

const GENDER = ["Homme", "Femme", "Unisexe"] as const;

function AddWatchShop() {
  //Récupération des informations de l'user connecté
  const auth = useContext(AuthContext);
  const userId = auth?.user?.id;

  // ----------------------------------------------
  //Fonction pour envoyer le formulaire A COMPLETER
  // ----------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (userId) {
      formData.append("user_id", userId.toString());
    }
    formData.append("brand_id", brand);
    formData.append("model_id", model);
    formData.append("watch_condition", condition);
    formData.append("ref_no", refNo);
    formData.append("production_year", productionYear);
    formData.append("is_limited_edition", isLimitedEdition ? "1" : "0");
    formData.append("edition_number", editionNumber);
    formData.append("watch_price", watchPrice);
    formData.append("watch_gender", watchGender);
    formData.append("case_material_id", caseMaterial);
    formData.append("diameter_mm", diameterMm);
    formData.append("thickness_mm", thicknessMm);
    formData.append("water_resistance_bar", waterResistanceBar);
    formData.append("dial_color", dialColor);
    formData.append("dial_finish_id", dialFinishColor);
    formData.append("hour_marker_type_id", hourMakerType);
    formData.append("strap_material_id", strapMaterial);
    formData.append("clasp_type_id", claspType);
    formData.append("strap_color", strapColor);
    formData.append("lug_width_mm", lugWidthMm);
    formData.append("movement_type_id", movementType);
    formData.append("caliber", caliber);
    formData.append("functions_id", functionWatch);
    formData.append("power_reserve_hours", powerReserveHours);
    formData.append("frequency_hz", frequencyHz);
    formData.append("jewel_count", jewelCount);
    // Pour mettre la montre directement en vente sans passer par la validation:
    formData.append("watch_sell_status", "active");

    // if (watchImage) formData.append("watch_image", watchImage);
    // if (certificateImage)
    //   formData.append("certificate_image", certificateImage);

    try {
      const response = await fetch(`${apiBaseUrl}/api/adminAddWatch`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --------------------------------------------
  // API
  // --------------------------------------------

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  // ----------------------------------------------------------------------------------
  // Constantes contenant les valeurs de la montre à mettre en vente (à envoyer en BDD)
  // ----------------------------------------------------------------------------------

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [watchPrice, setWatchPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [refNo, setRefNo] = useState("");
  const [productionYear, setProductionYear] = useState("");
  const [isLimitedEdition, setIsLimitedEdition] = useState(false);
  const [editionNumber, setEditionNumber] = useState("");
  const [watchGender, setWatchGender] = useState("");
  const [caseMaterial, setCaseMaterial] = useState("");
  const [diameterMm, setDiameterMm] = useState("");
  const [thicknessMm, setThicknessMm] = useState("");
  const [waterResistanceBar, setWaterResistanceBar] = useState("");
  const [dialColor, setDialColor] = useState("");
  const [dialFinishColor, setDialFinishColor] = useState("");
  const [hourMakerType, setHourMakerType] = useState("");
  const [strapMaterial, setStrapMaterial] = useState("");
  const [claspType, setClaspType] = useState("");
  const [strapColor, setStrapColor] = useState("");
  const [lugWidthMm, setLugWidthMm] = useState("");
  const [movementType, setMovementType] = useState("");
  const [caliber, setCaliber] = useState("");
  const [functionWatch, setFunctionWatch] = useState("");
  const [powerReserveHours, setPowerReserveHours] = useState("");
  const [frequencyHz, setFrequencyHz] = useState("");
  const [jewelCount, setJewelCount] = useState("");

  // -------------------------------------------------------------
  // Constantes contenant les listes des données fixes des montres
  // -------------------------------------------------------------

  const [brandList, setBrandList] = useState<BrandListI[]>([]);
  const [modelList, setModelList] = useState<ModelListI[]>([]);
  const [caseMaterialList, setCaseMaterialList] = useState<CaseMaterialListI[]>(
    [],
  );
  const [dialFinishList, setDialFinishList] = useState<DialFinishListI[]>([]);
  const [hourMakerTypeList, setHourMakerTypeList] = useState<
    HourMakerTypeListI[]
  >([]);
  const [strapMaterialList, setStrapMaterialList] = useState<
    StrapMaterialListI[]
  >([]);
  const [claspTypeList, setClaspTypeList] = useState<ClaspTypeListI[]>([]);
  const [movementTypeList, setMovementTypeList] = useState<MovementTypeListI[]>(
    [],
  );
  const [functionList, setFunctionList] = useState<FunctionListI[]>([]);
  // --------------------------------
  // Reception des données des tables
  // --------------------------------

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/adminAddWatch`)
      .then((res) => res.json())
      .then((result) => {
        setBrandList(result.brand);
        setModelList(result.model);
        setCaseMaterialList(result.case_material);
        setDialFinishList(result.dial_finish);
        setHourMakerTypeList(result.hour_maker_type);
        setStrapMaterialList(result.strap_material);
        setClaspTypeList(result.clasp_type);
        setMovementTypeList(result.movement_type);
        setFunctionList(result.function_table);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <h1>Ajouter une montre à la boutique</h1>
      <form
        id="watchAddShop"
        className="AddWatchShop-formulaire"
        onSubmit={handleSubmit}
      >
        <div className="AddWatchShop-GeneralInfo">
          <h2>informations générales</h2>
          {/* BRAND */}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          >
            <option value="">Sélectionnez une marque</option>
            {brandList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* MODEL */}
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          >
            <option value="">Sélectionnez un modèle</option>
            {modelList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* PRICE */}
          <input
            type="number"
            placeholder="prix de vente"
            value={watchPrice}
            onChange={(e) => setWatchPrice(e.target.value)}
            required
          />

          {/* CONDITION */}
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

          {/* NUMERO DE SERIE*/}
          <input
            type="text"
            placeholder="N° de série"
            value={refNo}
            onChange={(e) => setRefNo(e.target.value)}
          />

          {/* ANNEE DE FABRICATION*/}
          <input
            type="date"
            placeholder="Année de fabrication"
            value={productionYear}
            onChange={(e) => setProductionYear(e.target.value)}
          />
          <div className="AddWatchShop-Limiteddition">
            {/* EDITION LIMITEE BOOLEAN*/}
            <label htmlFor="edition_limite">
              Edition limitée{" "}
              <input
                id="edition_limite"
                type="checkbox"
                checked={isLimitedEdition}
                onChange={(e) => setIsLimitedEdition(e.target.checked)}
              />{" "}
            </label>

            {/* NUMERO DE L'EDITION LIMITEE*/}
            <input
              type="text"
              placeholder="N° d'édition limitée"
              value={editionNumber}
              disabled={!isLimitedEdition}
              // PENSER A CHANGER LE HOOVER LORSQUE DISABLED
              onChange={(e) => setEditionNumber(e.target.value)}
            />
          </div>

          {/* GENRE*/}
          <select
            value={watchGender}
            onChange={(e) => setWatchGender(e.target.value)}
            required
          >
            <option value="">Sélectionnez un genre</option>
            {GENDER.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </div>
        <div className="AddWatchShop-Caracteristiques">
          <h2>Caractéristiques</h2>
          {/* CASE MATERIAL*/}
          <select
            value={caseMaterial}
            onChange={(e) => setCaseMaterial(e.target.value)}
            required
          >
            <option value="">Sélectionnez la matiére</option>
            {caseMaterialList.map((item) => (
              <option key={item.idcase_material} value={item.idcase_material}>
                {item.case_material_name}
              </option>
            ))}
          </select>

          {/* DIAMETRE*/}
          <input
            type="number"
            placeholder="Diamètre"
            value={diameterMm}
            onChange={(e) => setDiameterMm(e.target.value)}
          />

          {/* EPAISSEUR*/}
          <input
            type="number"
            placeholder="Epaisseur"
            value={thicknessMm}
            onChange={(e) => setThicknessMm(e.target.value)}
          />

          {/* ETANCHEITE*/}
          <input
            type="number"
            placeholder="Etanchéité (Bar)"
            value={waterResistanceBar}
            onChange={(e) => setWaterResistanceBar(e.target.value)}
          />

          {/* DIAL COLOR*/}
          <input
            type="text"
            placeholder="Couleur du cadran"
            value={dialColor}
            onChange={(e) => setDialColor(e.target.value)}
          />

          {/* DIAL FINISH COLOR*/}
          <select
            value={dialFinishColor}
            onChange={(e) => setDialFinishColor(e.target.value)}
            required
          >
            <option value="">
              Sélectionnez une couleur de finition du cadran
            </option>
            {dialFinishList.map((item) => (
              <option key={item.iddial_finish} value={item.iddial_finish}>
                {item.dial_finish_name}
              </option>
            ))}
          </select>

          {/* HOUR MAKER TYPE*/}
          <select
            value={hourMakerType}
            onChange={(e) => setHourMakerType(e.target.value)}
            required
          >
            <option value="">Sélectionnez un format d'heure</option>
            {hourMakerTypeList.map((item) => (
              <option
                key={item.idhour_maker_type}
                value={item.idhour_maker_type}
              >
                {item.hour_maker_type_name}
              </option>
            ))}
          </select>

          {/* STRAP MATERIAL*/}
          <select
            value={strapMaterial}
            onChange={(e) => setStrapMaterial(e.target.value)}
            required
          >
            <option value="">Sélectionnez la matiére du bracelet</option>
            {strapMaterialList.map((item) => (
              <option key={item.idstrap_material} value={item.idstrap_material}>
                {item.strap_material_name}
              </option>
            ))}
          </select>

          {/* STRAP COLOR*/}
          <input
            type="text"
            placeholder="Couleur du bracelet"
            value={strapColor}
            onChange={(e) => setStrapColor(e.target.value)}
          />

          {/* TYPE DE FERMOIRE*/}
          <select
            value={claspType}
            onChange={(e) => setClaspType(e.target.value)}
            required
          >
            <option value="">Sélectionnez le fermoire</option>
            {claspTypeList.map((item) => (
              <option key={item.idclasp_type} value={item.idclasp_type}>
                {item.clasp_type_name}
              </option>
            ))}
          </select>

          {/* LUG WIDTH*/}
          <input
            type="number"
            placeholder="Largeur entre-corne (mm)"
            value={lugWidthMm}
            onChange={(e) => setLugWidthMm(e.target.value)}
          />

          {/* TYPE DE MOUVEMENT*/}
          <select
            value={movementType}
            onChange={(e) => setMovementType(e.target.value)}
            required
          >
            <option value="">Sélectionnez le type de mouvement</option>
            {movementTypeList.map((item) => (
              <option key={item.idmovement_type} value={item.idmovement_type}>
                {item.movement_type}
              </option>
            ))}
          </select>

          {/* CALIBRE*/}
          <input
            type="text"
            placeholder="Calibre"
            value={caliber}
            onChange={(e) => setCaliber(e.target.value)}
          />

          {/* FUNCTION WATCH*/}
          <select
            value={functionWatch}
            onChange={(e) => setFunctionWatch(e.target.value)}
            required
          >
            <option value="">Sélectionnez une fonction de la montre</option>
            {functionList.map((item) => (
              <option key={item.idfunctions} value={item.idfunctions}>
                {item.function_name}
              </option>
            ))}
          </select>

          {/* RESERVE DE MARCHE*/}
          <input
            type="number"
            placeholder="Réserve de marche"
            value={powerReserveHours}
            onChange={(e) => setPowerReserveHours(e.target.value)}
          />

          {/* FREQUENCE*/}
          <input
            type="number"
            placeholder="Fréquence"
            value={frequencyHz}
            onChange={(e) => setFrequencyHz(e.target.value)}
          />

          {/* JEWEL COUNT*/}
          <input
            type="number"
            placeholder="Nombre de rubis"
            value={jewelCount}
            onChange={(e) => setJewelCount(e.target.value)}
          />
        </div>
      </form>
      <div className="AddWatchShop-Toggle">
        <button
          type="button"
          className="addWatchShop-annulationBtn"
          onClick={() => window.history.back()}
        >
          Annuler
        </button>
        <button
          type="submit"
          form="watchAddShop"
          className="addWatchShop-submitBtn"
        >
          Valider
        </button>
      </div>
    </>
  );
}

export default AddWatchShop;
