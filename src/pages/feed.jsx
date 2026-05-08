import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

export default function Feed() {
  const cardStyle = {
    background: "#2b2d31",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #3a3d45",
    color: "#e5e7eb"
  };

  // states
  const [posts, setPosts] = useState([]);
  const [news, setNews] = useState([]);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsText, setNewsText] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const token = localStorage.getItem("token");

  const user = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;
  const loadPosts = async () => {
    const res = await axios.get("http://localhost:3000/posts");
    setPosts(res.data);

    res.data.forEach((post) => {
      loadComments(post._id);
    });
  };

  const loadNews = async () => {
    const res = await axios.get("http://localhost:3000/news");
    setNews(res.data);
  };

  const loadComments = async (postId) => {
    const res = await axios.get(
      `http://localhost:3000/comments/${postId}`
    );

    setComments((prev) => ({
      ...prev,
      [postId]: res.data
    }));
  };

  const createNews = async () => {
    await axios.post(
      "http://localhost:3000/news",
      { title: newsTitle, text: newsText },
      { headers: { Authorization: token } }
    );

    setNewsTitle("");
    setNewsText("");
    loadNews();
  };

  const createPost = async () => {
    await axios.post(
      "http://localhost:3000/posts",
      { text },
      { headers: { Authorization: token } }
    );

    setText("");
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
    loadNews();
  }, []);

  return (
    <div style={{
      background: "#1e1f22",
      minHeight: "100vh",
      color: "#dcddde",
      padding: "20px"
    }}>

      {/*navbar*/}
      <Navbar />

      {/*main layout*/}
      <div style={{
        display: "flex",
        gap: "16px",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>

        {/* left side feed */}
        <div style={{
          flex: 2,
          background: "#232428",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid #3a3d45"
        }}>

          {/* create post */}
          <div style={{ marginBottom: "20px" }}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a post..."
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #3a3d45",
                background: "#2b2d31",
                color: "#dcddde",
                marginRight: "10px",
                width: "70%"
              }}
            />

            <button
              onClick={createPost}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "none",
                background: "#3b82f6",
                color: "white",
                cursor: "pointer"
              }}
            >
              Post
            </button>
          </div>

          {/* posts */}
          {posts.map((p, i) => (
            <div
              key={i}
              style={{
                ...cardStyle,
                maxWidth: "520px",
                margin: "12px auto",
                textAlign: "left"
              }}
            >
              <b>{p.username}</b>
              <p>{p.text}</p>
              <small>{new Date(p.createdAt).toLocaleString()}</small>
              <div style={{ marginTop: "14px" }}>

                <input
                  value={commentInputs[p._id] || ""}
                  onChange={(e) =>
                    setCommentInputs({
                      ...commentInputs,
                      [p._id]: e.target.value
                    })
                  }
                  placeholder="Write a comment..."
                  style={{
                    width: "90%",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #3a3d45",
                    background: "#1e1f22",
                    color: "#dcddde",
                    marginBottom: "8px"
                  }}
                />

                <button
                  onClick={async () => {
                    if (!commentInputs[p._id]) return;

                    await axios.post(
                      "http://localhost:3000/comments",
                      {
                        postId: p._id,
                        text: commentInputs[p._id]
                      },
                      {
                        headers: {
                          Authorization: token
                        }
                      }
                    );

                    setCommentInputs({
                      ...commentInputs,
                      [p._id]: ""
                    });

                    loadComments(p._id);
                  }}
                  style={{
                    background: "#5865f2",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    cursor: "pointer"
                  }}
                >
                  Comment
                </button>

                <div style={{ marginTop: "12px" }}>
                  {(comments[p._id] || []).map((c, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#1e1f22",
                        padding: "8px",
                        borderRadius: "8px",
                        marginBottom: "8px"
                      }}
                    >
                      <b>{c.username}</b>

                      <p style={{ margin: "4px 0" }}>
                        {c.text}
                      </p>

                      <small>
                        {new Date(c.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>

              </div>
              {(user?.username === p.username ||
                user?.role === "admin") && (
                  <button
                    onClick={async () => {
                      await axios.delete(
                        `http://localhost:3000/posts/${p._id}`,
                        {
                          headers: {
                            Authorization: token
                          }
                        }
                      );

                      loadPosts();
                    }}
                    style={{
                      marginTop: "10px",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                )}
            </div>
          ))}
        </div>

        {/* right side news */}
        <div style={{
          flex: 1,
          background: "#232428",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid #3a3d45",
          height: "fit-content"
        }}>
          <h3>News</h3>
          {user?.role === "admin" && (
            <div style={{ marginBottom: "15px" }}>
              <input
                placeholder="News title"
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                style={{
                  display: "block",
                  marginBottom: "8px",
                  width: "90%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #3a3d45",
                  background: "#2b2d31",
                  color: "#dcddde"
                }}
              />

              <input
                placeholder="News text"
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                style={{
                  display: "block",
                  marginBottom: "8px",
                  width: "90%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #3a3d45",
                  background: "#2b2d31",
                  color: "#dcddde"
                }}
              />

              <button onClick={createNews}
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#3b82f6",
                  color: "white",
                  cursor: "pointer"
                }}>
                Post
              </button>

            </div>
          )}
          {news.map((n, i) => (
            <div
              key={i}
              style={cardStyle}
            >
              <b>{n.title}</b>
              <p>{n.text}</p>
              <small>{new Date(n.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}