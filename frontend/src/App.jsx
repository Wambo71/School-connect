import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import Courses from "./pages/Courses";

function App() {
  return (
    <div>
      <Navbar />
      <Dashboard />

      {/* TEMP: show students page */}
      <Students />
      <Staff />
      <Courses />
    </div>
  );
}

export default App;