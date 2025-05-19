import CodeEditor from "./CodeEditor/CodeEditor";
import InfoPanel from "./InfoPanel/InfoPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Question() {
  return (
    <div className="h-screen border-white ">
      <PanelGroup direction="horizontal" className="h-full p-12">
        <Panel defaultSize={40} minSize={20} className="h-full">
          <InfoPanel/>
        </Panel>
        <PanelResizeHandle className="w-[8px] hover:bg-sky-600"/>
        <Panel defaultSize={60} minSize={20} className="h-full">
          <CodeEditor />
        </Panel>
      </PanelGroup>
    </div>
  );
}
