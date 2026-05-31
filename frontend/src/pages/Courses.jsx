import { useEffect, useState } from "react";
import api from "../services/api";

 function Courses() {
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    course_name: "",
    course_code: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // =========================
  // FETCH COURSES
  // =========================
  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
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
        await api.put(`/courses/${editId}`, form);
        setIsEditing(false);
        setEditId(null);
      } else {
        await api.post("/courses", form);
      }

      setForm({
        course_name: "",
        course_code: ""
      });

      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // EDIT COURSE
  // =========================
  const handleEdit = (course) => {
    setForm({
      course_name: course.course_name,
      course_code: course.course_code
    });

    setIsEditing(true);
    setEditId(course.id);
  };

  // =========================
  // DELETE COURSE
  // =========================
  const deleteCourse = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses Management</h2>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="course_name"
          placeholder="Course Name"
          value={form.course_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="course_code"
          placeholder="Course Code"
          value={form.course_code}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {isEditing ? "Update Course" : "Add Course"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setForm({ course_name: "", course_code: "" });
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
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.course_name}</td>
              <td>{course.course_code}</td>
              <td>
                <button onClick={() => handleEdit(course)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteCourse(course.id)}
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

export default Courses; 