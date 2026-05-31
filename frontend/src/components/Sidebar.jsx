import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;

  return (
    <div style={styles.sidebar}>
      <h3 style={{ marginBottom: "20px" }}>Menu</h3>

      <ul style={styles.ul}>
        {/* ALWAYS AVAILABLE */}
        <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/courses" style={styles.link}>Courses</Link></li>

        {/* STAFF + ADMIN */}
        {(role === "staff" || role === "admin") && (
          <li><Link to="/students" style={styles.link}>Students</Link></li>
        )}

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <>
            <li><Link to="/staff" style={styles.link}>Staff</Link></li>
            <li><Link to="/departments" style={styles.link}>Departments</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "white",
    padding: "20px"
  },
  ul: {
    listStyle: "none",
    padding: 0
  },
  link: {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "10px 0"
  }
};

export default Sidebar;