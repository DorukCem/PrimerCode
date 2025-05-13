import CodeEditor from "./CodeEditor";
import QuestionDescription from "./QuestionDescription";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Question() {
  return (
    <div className="h-screen border-white">
      <PanelGroup direction="horizontal" className="h-full p-12">
        <Panel defaultSize={50} minSize={20}>
          <QuestionDescription />
        </Panel>
        <PanelResizeHandle className="w-[8px]"/>
        <Panel defaultSize={50} minSize={20}>
          <CodeEditor />
        </Panel>
      </PanelGroup>
    </div>
  );
}
