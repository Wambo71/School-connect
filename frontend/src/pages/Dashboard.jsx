import { useNavigate } from "react-router-dom";

 function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      
      {/* HEADER */}
      <h1 style={{ fontSize: "30px", fontWeight: "800", color: "#0f172a" }}>
        Institution Management Portal
      </h1>

      <p style={{ color: "#64748b", marginBottom: "20px" }}>
        Admin dashboard for managing academic operations and resources
      </p>

      {/* DASHBOARD CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "15px"
        }}
      >

        {/* STUDENTS */}
        <div style={cardStyle} onClick={() => navigate("/students")}>
          <h3>Students</h3>
          <p>Manage student records</p>
        </div>

        {/* STAFF */}
        <div style={cardStyle} onClick={() => navigate("/staff")}>
          <h3>Staff</h3>
          <p>Manage teaching & admin staff</p>
        </div>

        {/* COURSES */}
        <div style={cardStyle} onClick={() => navigate("/courses")}>
          <h3>Courses</h3>
          <p>Manage academic programs</p>
        </div>

        {/* DEPARTMENTS (NEW ADDITION) */}
        <div style={cardStyle} onClick={() => navigate("/departments")}>
          <h3>Departments</h3>
          <p>Manage school departments & structure</p>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  backgroundColor: "white",
  cursor: "pointer",
  transition: "0.2s",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
};

export default Dashboard;