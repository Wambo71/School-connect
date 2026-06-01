import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let storedUser = null;
    try {
      storedUser = JSON.parse(localStorage.getItem("user"));
    } catch {
      storedUser = null;
    }
    setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div style={styles.navbar}>
      
      {/* BRAND */}
      <div style={styles.brand}>
        Institution Management System
      </div>

      {/* LINKS */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/students" style={styles.link}>Students</Link>
        <Link to="/staff" style={styles.link}>Staff</Link>
        <Link to="/courses" style={styles.link}>Courses</Link>
        <Link to="/departments" style={styles.link}>Departments</Link>
      </div>

      {/* USER AREA */}
      <div style={styles.user}>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              Welcome, {user.username}
            </span>
            <button onClick={logout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        )}
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
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#cbd5e1"
  },

  button: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px"
  }
};

export default Navbar;