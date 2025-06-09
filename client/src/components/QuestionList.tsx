import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { QuestionList } from "../types/QuestionList";
import type { QuestionSummary } from "../types/QuestionSummary";
import { CheckCheck, Search } from "lucide-react";
import Select from "react-select";

export default function QuestionList() {
  const [questions, setQuestions] = useState<QuestionSummary[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [status, setStatus] = useState("Any");

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
        setQuestions(q.questions);
      })
      .catch((err) => {
        console.error("Failed to fetch questions", err);
      });
  }, []);

  const solvedQuestions = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("solvedQuestions") || "{}");
    } catch {
      return {};
    }
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchTerm && status === "Any") return questions;
    if (questions == null) {
      return [];
    }

    return questions.filter((q) => {
      const isSolved = solvedQuestions[q.id];
      const matchesStatus =
        status === "Any" ||
        (status === "Solved" && isSolved) ||
        (status === "Unsolved" && !isSolved);

      const matchesSearch = q.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [questions, searchTerm, status]);

  

  return (
    <div className="h-full text-gray-200 py-8 max-w-7xl mx-auto rounded-lg ">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Questions
      </h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
        {/* Search Box with Icon */}
        <div className="relative w-full md:w-7/8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 rounded-md border border-neutral-600  text-white focus:outline-none focus:ring-0 focus:border-neutral-400"
          />
        </div>

        {/* Status Dropdown */}
        <div className="w-full md:w-1/8 text-center ">
          <Select
            options={[
              { value: "Any", label: "Any" },
              { value: "Unsolved", label: "Unsolved" },
              { value: "Solved", label: "Solved" },
            ]}
            defaultValue={{ value: "Any", label: "Any" }}
            onChange={(s: any) => setStatus(s?.value || "Any")}
            isSearchable={false}
            className="border-none"
            theme={(theme) => ({
              ...theme,
              borderRadius: 4,
              colors: {
                ...theme.colors,
                //after select dropdown option
                primary50: "gray",
                //Border and Background dropdown color
                primary: "#525252",
                //Background hover dropdown color
                primary25: "gray",
                //Background color
                neutral0: "#171717",
                //Border before select
                neutral20: "#525252",
                //Hover border
                neutral30: "#e5e7eb",
                //No options color
                neutral40: "white",
                //Select color
                neutral50: "gray",
                //arrow icon when click select
                neutral60: "white",
                //Text color
                neutral80: "#F4FFFD",
              },
            })}
          />
        </div>
      </div>

      {/* Questions List */}
      {filteredItems && (
        <div className="space-y-4">
          {filteredItems.map((question, index) => (
            <Link
              to={`/question/${question.slug}`}
              className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] 
            rounded-md border border-gray-800 transition-all hover:bg-[#252525] hover:border-gray-700 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-400 min-w-[24px]">{index + 1}.</span>
                <span className="text-gray-200">{question.title}</span>
              </div>
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-transparent border border-gray-700 group-hover:border-gray-500 transition-all">
                {solvedQuestions[question.id] && (
                  <CheckCheck size={20} className={"text-green-500"} />
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
