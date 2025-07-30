import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { QuestionList } from "../types/QuestionList";
import { CheckCheck, Search, Brackets, Braces, Hash, Grid3X3, TextSearch, CaseSensitive, Rabbit, PawPrint, SquareFunction, Repeat, LetterText, Binary, CaseUpper } from "lucide-react";
import Select from "react-select";
import type { QuestionOverview } from "../types/QuestionOverview";

const tagIconMap: Record<string, any> = {
  list: Brackets,
  dict: Braces,
  set: Hash,
  grid: Grid3X3,
  parse: TextSearch,
  string: CaseUpper,
  type: PawPrint,
  function: SquareFunction,
  loop: Repeat,
  format: LetterText,
  bool: Binary
};

function getIconForTag(tag: string): any {
  let icon =  tagIconMap[tag]
  return icon;
}


export default function QuestionList() {
  const [questions, setQuestions] = useState<QuestionOverview[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [status, setStatus] = useState("Any");


  useEffect(() => {
    fetch("http://127.0.0.1:3000/all-questions", {
      credentials: "include", // Important for sending auth cookies
    })
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
              key={question.id}
              to={`/questions/${question.slug}`}
              className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e]
                   rounded-md border border-gray-800 transition-all hover:bg-[#252525]
                   hover:border-gray-700 group cursor-pointer"
            >
              {/* LEFT: number + title */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-gray-400 min-w-[24px]">{index + 1}.</span>
                <span className="text-gray-200 truncate">{question.title}</span>
              </div>

              {/* RIGHT: tags (icons) then check */}
              <div className="flex items-center gap-3">
                {/* Tag icons */}
                <div className="flex items-center gap-2 mr-4">
                  {question.tags?.map((tag) => {
                    const Icon = getIconForTag(tag);
                    const label = tag;
                    return (
                      <span
                        key={tag}
                        className="inline-flex"
                        title={label}
                        aria-label={label}
                      >
                        <Icon
                          size={20}
                          className="text-gray-400 group-hover:text-gray-300"
                        />
                      </span>
                    );
                  })}
                </div>

                {/* Check circle */}
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-transparent border border-gray-700 group-hover:border-gray-500 transition-all">
                  {solvedQuestions[question.id] && (
                    <CheckCheck
                      size={20}
                      className={
                        solvedQuestions[question.id]?.synced
                          ? "text-green-500"
                          : "text-orange-500"
                      }
                    />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
