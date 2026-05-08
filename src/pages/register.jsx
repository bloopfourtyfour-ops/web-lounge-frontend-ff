import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post(
        "http://localhost:3000/register",
        {
          username,
          password
        }
      );

      navigate("/");

    } catch (err) {
      alert("Register failed");
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
          Create Account
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginBottom: "25px"
          }}
        >
          Join the Web Lounge
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
          onClick={register}
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
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "#9ca3af"
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#5865f2",
              textDecoration: "none"
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}