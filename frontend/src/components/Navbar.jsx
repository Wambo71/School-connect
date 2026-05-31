import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div style={styles.navbar}>
      
      {/* LEFT - BRAND */}
      <div style={styles.brand}>
        Institution Management System
      </div>

      {/* CENTER - LINKS */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/students" style={styles.link}>Students</Link>
        <Link to="/staff" style={styles.link}>Staff</Link>
        <Link to="/courses" style={styles.link}>Courses</Link>
        <Link to="/departments" style={styles.link}>Departments</Link>
      </div>

      {/* RIGHT - USER AREA */}
      <div style={styles.user}>
        Admin | Logout
      </div>

    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#0f172a",
    color: "white"
  },

  brand: {
    fontWeight: "700",
    fontSize: "16px"
  },

  links: {
    display: "flex",
    gap: "15px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px"
  },

  user: {
    fontSize: "14px",
    color: "#cbd5e1"
  }
};

export default Navbar;