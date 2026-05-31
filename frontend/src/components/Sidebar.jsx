import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}
    >
      <h3>Admin Panel</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link style={{ color: "white" }} to="/">
          Dashboard
        </Link>

        <Link style={{ color: "white" }} to="/students">
          Students
        </Link>

        <Link style={{ color: "white" }} to="/staff">
          Staff
        </Link>

        <Link style={{ color: "white" }} to="/courses">
          Courses
        </Link>

        <Link style={{ color: "white" }} to="/      departments">
          Departments
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar; 