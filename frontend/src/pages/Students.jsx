import { useEffect, useState } from "react";
import api from "../services/api";

 function Students() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    course: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // =========================
  // FETCH STUDENTS
  // =========================
  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
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
  // ADD / UPDATE STUDENT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await api.put(`/students/${editId}`, form);
        setIsEditing(false);
        setEditId(null);
      } else {
        await api.post("/students", form);
      }

      setForm({
        full_name: "",
        email: "",
        course: ""
      });

      fetchStudents();
    } catch (error) {
      console.log("Submit error:", error);
    }
  };

  // =========================
  // EDIT STUDENT
  // =========================
  const handleEdit = (student) => {
    setForm({
      full_name: student.full_name,
      email: student.email,
      course: student.course
    });

    setIsEditing(true);
    setEditId(student.id);
  };

  // =========================
  // DELETE STUDENT
  // =========================
  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students Management</h2>

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

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {isEditing ? "Update Student" : "Add Student"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditId(null);
              setForm({ full_name: "", email: "", course: "" });
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
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.full_name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <button onClick={() => handleEdit(student)}>
                    Edit
                  </button>

                  <button
                    onClick={() => deleteStudent(student.id)}
                    style={{ color: "red", marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students;