import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import BreakingNewsCard from "../../components/BreakingNewsCard/BreakingNewsCard";
import NewsAddForm from "../../components/NewsAddForm/NewsAddForm";

import "./News.css";

interface Article {
  idarticles: number;
  article_title: string;
  photo: string;
  subtitle: string;
  release_date: string;
  content: string;
  reference_source: string;
}

function News() {
  const [news, setNews] = useState<Article[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/articles`)
      .then((res) => res.json())
      .then((data: Article[]) => setNews(data))
      .catch((err) => console.error(err));
  }, []);

  const handleArticleAdded = (newArticle: Article) => {
    setNews((prev) => [newArticle, ...prev]); // ajout en début de liste
    setShowAddForm(false);
  };

  return (
    <div>
      <section className="News-section">
        <h1 className="news-title">Chroniques horlogères</h1>

        <div className="news-grid">
          {news.map((article) => (
            <BreakingNewsCard
              key={article.idarticles}
              article={article}
              className="card"
            />
          ))}
        </div>

        {/* //Bouton visible uniquement pour les admins */}
        <div className="news-add-article">
          {user?.role === "admin" && (
            <button
              type="button"
              className="add-article-btn"
              onClick={() => setShowAddForm(true)}
            >
              {showAddForm ? "Annuler" : "+ Ajouter un article"}
            </button>
          )}
        </div>

        {showAddForm && (
          <NewsAddForm
            onArticleAdded={handleArticleAdded}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </section>
    </div>
  );
}

export default News;
