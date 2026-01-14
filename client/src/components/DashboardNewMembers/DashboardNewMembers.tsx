import { useEffect, useState } from "react";

import "./DashboardNewMembers.css";

type NewMembersI = {
  new_members_count: number;
};

function DashboardNewMembers() {
  const [nbNewMembers, setNbNewMembers] = useState<NewMembersI[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/AdminNewMembers`)
      .then((response) => response.json())
      .then((data: NewMembersI[]) => {
        setNbNewMembers(data);
      });
  }, []);

  const nbNewMem =
    nbNewMembers.length === 0
      ? "Donnée en cours de chargement"
      : nbNewMembers[0].new_members_count === 0
        ? "Pas de nouveau membre"
        : nbNewMembers[0].new_members_count;

  const dateDuMoisDernier = new Date();
  // On retire 1 mois à la date d'aujourd'hui
  dateDuMoisDernier.setMonth(dateDuMoisDernier.getMonth() - 1);

  // Formatage en français (ex: "8 décembre 2025")
  const dateFormatee = dateDuMoisDernier.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <article className="DashboardNewMembers">
      <p> Nombre de nouveaux membres depuis le {dateFormatee}:</p>
      <p>{nbNewMem}</p>
    </article>
  );
}

export default DashboardNewMembers;
