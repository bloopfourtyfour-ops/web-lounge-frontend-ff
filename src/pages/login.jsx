import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "https://web-lounge-backend-ff.onrender.com/login",
        {
          username,
          password
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/feed");

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        background: "#1e1f22",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#dcddde"
      }}
    >
      <div
        style={{
          background: "#232428",
          padding: "30px",
          borderRadius: "14px",
          width: "350px",
          border: "1px solid #3a3d45",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginTop: 0
          }}
        >
          Web Lounge
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginBottom: "25px"
          }}
        >
          Sign in to continue
        </p>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #3a3d45",
            background: "#2b2d31",
            color: "#dcddde",
            boxSizing: "border-box"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "18px",
            borderRadius: "8px",
            border: "1px solid #3a3d45",
            background: "#2b2d31",
            color: "#dcddde",
            boxSizing: "border-box"
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#5865f2",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "#9ca3af"
          }}
        >
          No account?{" "}
          <Link
            to="/register"
            style={{
              color: "#5865f2",
              textDecoration: "none"
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}