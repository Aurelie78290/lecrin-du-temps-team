import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import "./NewsAddForm.css";

interface Article {
  idarticles: number;
  article_title: string;
  photo: string;
  subtitle: string;
  release_date: string;
  content: string;
  reference_source: string;
}

interface BreakingNewsFormProps {
  onArticleAdded: (article: Article) => void;
  onClose: () => void; // callback pour mettre à jour la liste
}

interface BreakingNewsForm {
  article_title: string;
  subtitle: string;
  content: string;
  release_date?: string;
  reference_source?: string;
  photo?: string;
}

function NewsAddForm({ onArticleAdded, onClose }: BreakingNewsFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<BreakingNewsForm>({
    article_title: "",
    subtitle: "",
    content: "",
    reference_source: "",
    release_date: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const bodyToSend = {
        article_title: formData.article_title.slice(0, 100),
        subtitle: formData.subtitle.slice(0, 200),
        content: formData.content,
        reference_source: (formData.reference_source || "").slice(0, 45),
        release_date:
          formData.release_date || new Date().toISOString().slice(0, 10),
        photo: formData.photo || "",
        user_iduser: user?.id,
      };

      console.log("Envoi au serveur :", bodyToSend);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bodyToSend),
      });

      if (!res.ok) throw new Error("Impossible de créer l'article");

      const newArticle = await res.json();
      onArticleAdded(newArticle); // mise à jour de la liste parent
      onClose();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création de l'article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="news-add-modal">
      <button
        type="button"
        className="overlay-btn"
        onClick={onClose}
        aria-label="Fermer le formulaire"
      />
      <form
        className="news-add-form"
        onSubmit={handleSubmit}
        style={{ pointerEvents: "auto" }}
      >
        <button type="button" className="close-btn" onClick={onClose}>
          ×
        </button>
        <label>
          Titre
          <input
            name="article_title"
            value={formData.article_title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Sous-titre
          <input
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
          />
        </label>
        <label>
          Source
          <input
            name="reference_source"
            value={formData.reference_source}
            onChange={handleChange}
          />
        </label>
        <label>
          Date
          <input
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
          />
        </label>
        <label>
          Photo (URL)
          <input
            name="photo"
            type="url"
            placeholder="https://exemple.com/image.jpg"
            value={formData.photo}
            onChange={handleChange}
          />
        </label>
        <label>
          Contenu
          <textarea
            name="content"
            rows={6}
            value={formData.content}
            onChange={handleChange}
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Publication..." : "Publier l'article"}
        </button>
      </form>
    </div>
  );
}

export default NewsAddForm;
