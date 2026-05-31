import { useState } from "react";
import authApi from "../services/authApi";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authApi.post("/login", form);

      // Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");

      // Redirect once
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;