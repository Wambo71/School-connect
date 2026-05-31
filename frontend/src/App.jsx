import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Staff from "./pages/Staff";

function App() {
  return (
    <div>
      <Navbar />
      <Dashboard />

      {/* TEMP: show students page */}
      <Students />
      <Staff />
    </div>
  );
}

export default App;