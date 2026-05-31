import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1>Institution Management Portal</h1>

        <p>
          Manage students, staff, courses, and departments from one platform.
        </p>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;