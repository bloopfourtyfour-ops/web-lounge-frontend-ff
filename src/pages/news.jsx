import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

export default function News() {
  const [news, setNews] = useState([]);

  const loadNews = async () => {
    const res = await axios.get("http://localhost:3000/news");
    setNews(res.data);
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div
      style={{
        background: "#1e1f22",
        minHeight: "100vh",
        color: "#dcddde",
        padding: "20px"
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            background: "#232428",
            borderRadius: "12px",
            border: "1px solid #3a3d45",
            padding: "18px"
          }}
        >
          <h1 style={{ marginTop: 0 }}>
            News
          </h1>

          {news.map((n, i) => (
            <div
              key={i}
              style={{
                background: "#2b2d31",
                borderRadius: "10px",
                padding: "14px",
                marginBottom: "12px",
                border: "1px solid #3a3d45"
              }}
            >
              <h3 style={{ marginTop: 0 }}>
                {n.title}
              </h3>

              <p>{n.text}</p>

              <small>
                Posted by {n.username}
              </small>

              <br />

              <small>
                {new Date(n.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}