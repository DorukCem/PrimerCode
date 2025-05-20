import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { QuestionList } from "../types/QuestionList";
import type { QuestionSummary } from "../types/QuestionSummary";

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
    <div className="h-full text-gray-200 p-8 max-w-7xl mx-auto   rounded-lg">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2  text-center">
        Questions
      </h1>
      {questions && (
        <ul className="space-y-3">
          {questions.questions.map((question: QuestionSummary, index) => (
            <li key={question.id}>
              <Link
                to={`/question/${question.title}`}
                className={
                  "block hover:cursor-pointer text-white px-4 py-3 rounded-md transition-colors duration-200" +
                  (index % 2 == 0 ? " bg-neutral-700" : "")
                }
              >
                {
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="green"
                      className="size-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>

                    <div>{`${index+1}. ${question.title}`}</div>
                  </div>
                }
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
