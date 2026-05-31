import { useEffect, useState } from "react";
import api from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    course: ""
  });

  // =========================
  // FETCH STUDENTS
  // =========================
  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // ADD STUDENT
  // =========================
  const addStudent = async (e) => {
    e.preventDefault();

    try {
      await api.post("/students", form);

      setForm({
        full_name: "",
        email: "",
        course: ""
      });

      fetchStudents();
    } catch (error) {
      console.log("Error adding student:", error);
    }
  };

  // =========================
  // DELETE STUDENT
  // =========================
  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students Management</h2>

      {/* ================= FORM ================= */}
      <form onSubmit={addStudent} style={{ marginBottom: "20px" }}>
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

        <button type="submit">Add Student</button>
      </form>

      {/* ================= TABLE ================= */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.full_name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button
                  onClick={() => deleteStudent(student.id)}
                  style={{ color: "red" }}
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

export default Students;    