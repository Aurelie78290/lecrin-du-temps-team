// import { useEffect, useState } from "react";
// import BreakingNewsCard from "../../components/BreakingNewsCard/BreakingNewsCard";

// import "./News.css";

function News() {
  //   const [news, setNews] = useState<Article[]>([]);

  //   useEffect(() => {
  //     fetch(`${import.meta.env.VITE_API_URL}/api/articles`)
  //       .then((res) => res.json())
  //       .then((data: Article[]) => setNews(data))
  //       .catch((err) => console.error(err));
  //   }, []);

  return (
    <section>
      <h1>Chroniques horlogères</h1>
      {/* <div className="news-grid">
        {news.map((article) => (
          <BreakingNewsCard key={article.idarticles} article={article} />
        ))}
      </div> */}
    </section>
  );
}

export default News;
