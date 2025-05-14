import HintsTab from "./InfoPanel/HintsTab";
import QuestionDescription from "./InfoPanel/QuestionDescription";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TriviaTab from "./InfoPanel/TriviaTab";
import SolutionTab from "./InfoPanel/SolutionTab";

export default function InfoPanel() {
  return (
    <div className="h-full bg-neutral-800 rounded-lg shadow-lg border border-white">
      <Tabs className="text-white">
        <TabList className="flex mb-4 border-b border-gray-600">
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

        <div className="p-4 rounded-lg h-full">
          <TabPanel>
            <div className="">
              <QuestionDescription />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="">
              <HintsTab />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="">
              <TriviaTab />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="">
              <SolutionTab />
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}
