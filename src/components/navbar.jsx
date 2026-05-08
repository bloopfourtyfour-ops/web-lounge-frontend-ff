import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        marginBottom: "20px",
        borderBottom: "1px solid #464646",
        background: "hsl(243, 12%, 33%)"
      }}
    >
      <h2
        style={{ margin: 0, cursor: "pointer" }}
        onClick={() => navigate("/feed")}
      >
        Web Lounge
      </h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/feed")}
            style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px"
          }}>
          Feed
        </button>

                  <button onClick={() => navigate("/about")}
            style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px"
          }}>
          About
        </button>

                  <button onClick={() => navigate("/contact")}
            style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px"
          }}>
          Contact
        </button>
        <button onClick={() => navigate("/news")}
            style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px"
          }}>
          News
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}