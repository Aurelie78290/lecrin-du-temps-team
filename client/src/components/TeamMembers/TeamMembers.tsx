import { useState, useEffect } from "react";
import "./TeamMembers.css";

interface TeamMember {
  id: number;
  firstname: string;
  photo: string | null;
  bio: string | null;
  role: string;
  userType: string | null;
}

const TeamMembers = () => {
  const [TeamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/team-members");

      if (!response.ok) {
        throw new Error("Erreur lors du chargement");
      }

      const data = await response.json();
      setTeamMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">
          <p>Chargement de l'équipe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Une erreur est survenue : {error}</p>
      </div>
    );
  }

  return (
    <div className="team-container">
      <section className="team-header">
        <h1>Notre Équipe</h1>
        <p className="subtitle">
          {TeamMembers.length}{" "}
          {TeamMembers.length > 1 ? "experts passionnés" : "expert passionné"}{" "}
          au service de l'excellence
        </p>
      </section>

      <div className="team-grid">
        {TeamMembers.map((user) => (
          <div key={user.id} className="team-card">
            <div className="card-image">
              {user.photo ? (
                <img
                  src={user.photo}
                  alt={user.firstname}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextElementSibling) {
                      (
                        e.currentTarget.nextElementSibling as HTMLElement
                      ).style.display = "flex";
                    }
                  }}
                />
              ) : null}
              {user.role === "admin" && (
                <span className="admin-badge">Admin</span>
              )}
            </div>

            <div className="card-content">
              <h3>${user.firstname}</h3>
              <p className="job">{user.userType || "Membre de l'équipe"}</p>
              {user.bio && <p className="bio">{user.bio}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TeamMembers;
