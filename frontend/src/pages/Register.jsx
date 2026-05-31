import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../services/authApi";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "staff"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authApi.post("/register", form);

      alert("Registration successful. Please login.");

      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register Account</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Username</label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Role</label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9"
  },

  card: {
    width: "400px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column"
  },

  button: {
    width: "100%",
    padding: "10px",
    cursor: "pointer"
  }
};

export default Register;