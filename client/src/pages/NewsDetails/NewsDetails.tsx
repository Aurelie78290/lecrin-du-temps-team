import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import "./NewsDetails.css";

interface Article {
  idarticles: number;
  article_title: string;
  photo: string;
  subtitle: string;
  release_date: string;
  content: string;
  reference_source: string;
}

function NewsDetails() {
  const [article, setArticle] = useState<Article | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR");

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        );
        if (!res.ok) throw new Error("Article non trouvé");
        const data: Article = await res.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Impossible de supprimer l'article");

      // Redirection vers la page News après suppression
      navigate("/news");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression de l'article");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (!article) return <p>Chargement...</p>;

  return (
    <div className="NewsDetails-page">
      {/* Bouton de retour à la page News */}
      <Link to="/news" className="NewsDetails-back-btn">
        ← Retour aux articles
      </Link>
      <section className="NewsDetails-section">
        <h1 className="NewsDetails-title">{article.article_title}</h1>
        <div className="NewsDetails-references">
          <p className="NewsDetails-references-content">
            <strong>Source : </strong>
            {article.reference_source}
          </p>
          <p className="NewsDetail-references-content">
            <strong>Date : </strong>
            {formatDate(article.release_date)}
          </p>
        </div>
        <p className="NewsDetails-subtitle">{article.subtitle}</p>
        <div className="NewsDetails-container">
          <img
            src={article.photo}
            alt={article.article_title}
            className="NewsDetails-photo"
          />
          <p className="NewsDetails-content">{article.content}</p>
        </div>

        {/* Bouton de suppression (visible uniquement pour les admins) */}
        {user?.role === "admin" && (
          <div className="NewsDetails-actions">
            {!showConfirm ? (
              <button
                type="button"
                className="NewsDetails-delete-btn"
                onClick={() => setShowConfirm(true)}
              >
                🗑️ Supprimer cet article
              </button>
            ) : (
              <div className="NewsDetails-confirm-delete">
                <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
                <button
                  type="button"
                  className="NewsDetails-confirm-btn"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "Suppression..." : "Oui, supprimer"}
                </button>
                <button
                  type="button"
                  className="NewsDetails-cancel-btn"
                  onClick={() => setShowConfirm(false)}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default NewsDetails;
