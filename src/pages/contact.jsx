import Navbar from "../components/navbar";

export default function Contact() {
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
            padding: "24px"
          }}
        >
          <h1 style={{ marginTop: 0 }}>
            Contact
          </h1>

          <p>
            Have feedback, suggestions, or questions
            about Web Lounge?
          </p>

          <p>
            Reach out through the platform or contact
            the development team for assistance.
          </p>

          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              background: "#2b2d31",
              borderRadius: "10px",
              border: "1px solid #3a3d45"
            }}
          >
            <p>
              <b>Email:</b> bloopfourtyfour@gmail.com
            </p>

            <p>
              <b>Status:</b> Active Development
            </p>

            <p>
              <b>Version:</b> 0.1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}