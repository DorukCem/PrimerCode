import { Link } from "react-router-dom";

const questions = [
  "Introduction",
  "Remove Zeroes",
  "Add Numbers",
  "Remove Duplicate Elements",
];

export default function QuestionList() {
  return (
    <div className="h-screen text-gray-200 p-8 max-w-7xl mx-auto border border-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2  text-center">
        Questions
      </h1>
      <ul className="space-y-3">
        {questions.map((question, index) => (
          <li key={index}>
            <Link
              to={`/question/${index}`}
              className="block  bg-neutral-900 hover:bg-gray-600 text-white px-4 py-3 rounded-md transition-colors duration-200"
            >
              {question}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
