import { useEffect, useState } from "react";
import api from "../services/api"

function Staff() {
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department_id: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // =========================
  // FETCH STAFF
  // =========================
  const fetchStaff = async () => {
    try {
      const res = await api.get("/staff");
      setStaff(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // FETCH DEPARTMENTS
  // =========================
  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchDepartments();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // SUBMIT (ADD / UPDATE)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await api.put(`/staff/${editId}`, form);
        setIsEditing(false);
        setEditId(null);
      } else {
        await api.post("/staff", form);
      }

      setForm({
        full_name: "",
        email: "",
        department_id: ""
      });

      fetchStaff();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // EDIT STAFF
  // =========================
  const handleEdit = (member) => {
    setForm({
      full_name: member.full_name,
      email: member.email,
      department_id: member.department_id || ""
    });

    setIsEditing(true);
    setEditId(member.id);
  };

  // =========================
  // DELETE STAFF
  // =========================
  const deleteStaff = async (id) => {
    try {
      await api.delete(`/staff/${id}`);
      fetchStaff();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Staff Management</h2>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* ================= DEPARTMENT DROPDOWN ================= */}
        <select
          name="department_id"
          value={form.department_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>

          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        <button type="submit">
          {isEditing ? "Update Staff" : "Add Staff"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setForm({
                full_name: "",
                email: "",
                department_id: ""
              });
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* ================= TABLE ================= */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.full_name}</td>
              <td>{member.email}</td>
              <td>{member.department}</td>
              <td>
                <button onClick={() => handleEdit(member)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteStaff(member.id)}
                  style={{ color: "red", marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staff;