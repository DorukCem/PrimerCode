import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { QuestionList } from "../types/QuestionList";

export default function QuestionList() {
  const [questions, setQuestions] = useState<QuestionList | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/all-questions")
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json() as Promise<QuestionList>;
      })
      .then((q) => {
        setQuestions(q);
      })
      .catch((err) => {
        console.error("Failed to fetch questions", err);
      });
  }, []);

  return (
    <div className="h-screen text-gray-200 p-8 max-w-7xl mx-auto border border-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2  text-center">
        Questions
      </h1>
      {questions && (
        <ul className="space-y-3">
          {questions.questions.map((question, index) => (
            <li key={index}>
              <Link
                to={`/question/${question}`}
                className="block  bg-neutral-900 hover:bg-gray-600 text-white px-4 py-3 rounded-md transition-colors duration-200"
              >
                {question}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
