import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";

function App() {
  return (
    <div>
      <Navbar />
      <Dashboard />

      {/* TEMP: show students page */}
      <Students />
    </div>
  );
}

export default App;