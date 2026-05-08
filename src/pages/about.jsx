import Navbar from "../components/navbar";

export default function About() {
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
                        About Web Lounge
                    </h1>

                    <p>
                        Web Lounge is a community-driven platform
                        that combines social posting, news updates,
                        and wiki-style content all into one space.
                    </p>

                    <p>
                        Users can create posts, interact with
                        community content, and explore information
                        shared across the platform.
                    </p>

                    <p>
                        This project was built using:
                    </p>

                    <ul>
                        <li>React + Vite frontend</li>
                        <li>Node.js + Express backend</li>
                        <li>MongoDB database</li>
                        <li>JWT authentication</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}