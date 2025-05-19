import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionList from "./components/QuestionList";
import Question from "./components/Question";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="bg-neutral-700">
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/question/:name" element={<Question />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
