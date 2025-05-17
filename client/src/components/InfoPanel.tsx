import HintsTab from "./InfoPanel/HintsTab";
import QuestionDescription from "./InfoPanel/QuestionDescription";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TriviaTab from "./InfoPanel/TriviaTab";
import SolutionTab from "./InfoPanel/SolutionTab";
import { useEffect, useState } from "react";

export default function InfoPanel() {
  const [question, setQuestion] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/question/1")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.text();
      })
      .then((question_md) => {
        setQuestion(question_md);
      })
      .catch((err) => {
        console.error("Failed to fetch question", err);
        setQuestion("# Failed to load boilerplate");
      });
  }, []);

  return (
    <div className="flex flex-col h-full bg-neutral-800 rounded-lg shadow-lg border border-white overflow-y-scroll">
      <Tabs className="flex flex-col text-white h-full">
        <TabList className="flex border-b border-gray-600">
          <Tab
            className="px-4 py-2 mr-2 cursor-pointer "
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
            className="px-4 py-2 mr-2 cursor-pointer  "
            selectedClassName="border-b border-white outline-none"
          >
            Trivia
          </Tab>
          <Tab
            className="px-4 py-2 mr-2 cursor-pointer"
            selectedClassName="border-b border-white outline-none"
          >
            Solution
          </Tab>
        </TabList>

        <TabPanel>
          <QuestionDescription markdown={question} />
        </TabPanel>

        <TabPanel>
          <HintsTab />
        </TabPanel>

        <TabPanel>
          <TriviaTab />
        </TabPanel>

        <TabPanel>
          <SolutionTab />
        </TabPanel>
      </Tabs>
    </div>
  );
}
