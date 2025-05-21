import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionList from "./components/QuestionList";
import Question from "./components/Question";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-neutral-900">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<QuestionList />} />
            <Route path="/question/:id" element={<Question />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
