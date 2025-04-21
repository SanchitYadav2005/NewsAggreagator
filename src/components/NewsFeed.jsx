import { useState, useEffect } from "react";
import "./NewsFeed.css";

const NewsFeed = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=343150d47242485d914a0b44b58a921e`;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        if (data.articles.length === 0) throw new Error("No articles found for this category");
        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]); 

  if (loading) return <p className="loading">Fetching {category} news...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="news-container">
      <h2 className="category-title">{category.toUpperCase()} NEWS</h2>
      <div className="news-grid">
        {articles.map((article, index) => (
          <div key={index} className="news-card">
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />}
            <h3 className="news-title">{article.title}</h3>
            <p className="news-description">{article.description || "No description available."}</p>
            
            {/* Fixed Source Name Position */}
            <div className="news-footer">
              <span className="news-source">{article.source.name}</span>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
