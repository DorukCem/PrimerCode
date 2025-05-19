import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionList from "./components/QuestionList";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="bg-neutral-700">
        <Routes>
          <Route path="/" element={<QuestionList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
