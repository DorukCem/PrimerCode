import HintsTab from "./HintsTab";
import QuestionDescription from "./QuestionDescription";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SolutionTab from "./SolutionTab";
import { useEffect, useState, useMemo } from "react";
import { Check } from "lucide-react";
import type { QuestionMDResponse } from "../../types/QuestionMDResponse";
import API_CONFIG from "../../config/api";
import { Link } from "react-router-dom";

export default function InfoPanel({ slug, resetSolved }: any) {
  const [questionMD, setQuestionMD] = useState<QuestionMDResponse | null>(null);

  const solvedQuestions = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("solvedQuestions") || "{}");
    } catch {
      return {};
    }
  }, [resetSolved]);

  const isSolved = questionMD?.id ? solvedQuestions[questionMD.id] : false;

  useEffect(() => {
    fetch(`${API_CONFIG.BASE_URL}/question/${slug}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json() as Promise<QuestionMDResponse>;
      })
      .then((question_md) => {
        setQuestionMD(question_md);
      })
      .catch((err) => {
        console.error("Failed to fetch question", err);
      });
  }, []);

  return (
    <div className="flex flex-col h-full bg-neutral-800 rounded-lg shadow-lg border border-white overflow-y-scroll">
      <Tabs className="flex flex-col text-white h-full">
        <TabList className="flex border-b border-gray-600 justify-between items-center">
          <div className="flex">
            <Tab
              className="px-4 py-2 mr-2 cursor-pointer"
              selectedClassName="border-b border-white outline-none"
            >
              Question
            </Tab>
            <Tab
              className="px-4 py-2 mr-2 cursor-pointer"
              selectedClassName="border-b border-white outline-none"
            >
              Hints
            </Tab>
            <Tab
              className="px-4 py-2 mr-2 cursor-pointer"
              selectedClassName="border-b border-white outline-none"
            >
              Solution
            </Tab>
          </div>

          <div className="flex items-center gap-2 px-4">
            {isSolved && (
              <div className="text-green-400 flex items-center">
                <Check size={18} className="mr-2" />
                <span className="text-sm mr-2">Solved</span>
              </div>
            )}
            {questionMD?.prev ? (
              <Link
                to={`/questions/${questionMD.prev.slug}`}
                className="px-3 py-1 text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded transition-colors"
              >
                ← Prev
              </Link>
            ) : (
              <span className="px-3 py-1 text-sm text-gray-600 border border-gray-700 rounded cursor-not-allowed">
                ← Prev
              </span>
            )}
            {questionMD?.next ? (
              <Link
                to={`/questions/${questionMD.next.slug}`}
                className="px-3 py-1 text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded transition-colors"
              >
                Next →
              </Link>
            ) : (
              <span className="px-3 py-1 text-sm text-gray-600 border border-gray-700 rounded cursor-not-allowed">
                Next →
              </span>
            )}
          </div>
        </TabList>

        <TabPanel>
          <QuestionDescription markdown={questionMD?.question} />
        </TabPanel>
        <TabPanel>
          <HintsTab markdown={questionMD?.hint} />
        </TabPanel>
        <TabPanel>
          <SolutionTab markdown={questionMD?.solution} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
