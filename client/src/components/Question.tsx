import CodeEditor from "./CodeEditor";
import QuestionDescription from "./QuestionDescription";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Question() {
  return (
    <div className="h-screen">
      <PanelGroup direction="horizontal" className="h-full p-12">
        <Panel defaultSize={50} minSize={20}>
          <QuestionDescription />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={50} minSize={20}>
          <CodeEditor />
        </Panel>
      </PanelGroup>
    </div>
  );
}
