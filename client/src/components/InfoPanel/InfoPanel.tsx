import HintsTab from "./HintsTab";
import QuestionDescription from "./QuestionDescription";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SolutionTab from "./SolutionTab";
import { useEffect, useState } from "react";
import type { QuestionMDResponse } from "../../types/QuestionMDResponse";

export default function InfoPanel({slug}: any) {
  const [questionMD, setQuestionMD] = useState<QuestionMDResponse | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/question/${slug}`)
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
            className="px-4 py-2 mr-2 cursor-pointer"
            selectedClassName="border-b border-white outline-none"
          >
            Solution
          </Tab>
        </TabList>

        <TabPanel>
          <QuestionDescription markdown={questionMD?.question} />
        </TabPanel>

        <TabPanel>
          <HintsTab markdown={questionMD?.hint} />
        </TabPanel>

        <TabPanel>
          <SolutionTab markdown={questionMD?.solution}/>
        </TabPanel>
      </Tabs>
    </div>
  );
}
