import Navbar from "./Components/Navbar";
import ToDoForm from "./Pages/ToDoForm";
import "./App.css";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard/>
      <ToDoForm />
    </div>
  );
}

export default App;
