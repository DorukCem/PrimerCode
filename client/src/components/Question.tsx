import CodeEditor from "./CodeEditor/CodeEditor";
import InfoPanel from "./InfoPanel/InfoPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useParams } from "react-router"

export default function Question( ) {
  let params = useParams();
  let name= params.name;

  return (
    <div className="h-screen border-white ">
      <PanelGroup direction="horizontal" className="h-full p-12">
        <Panel defaultSize={40} minSize={20} className="h-full">
          <InfoPanel name={name}/>
        </Panel>
        <PanelResizeHandle className="w-[8px] hover:bg-sky-600"/>
        <Panel defaultSize={60} minSize={20} className="h-full">
          <CodeEditor name={name}/>
        </Panel>
      </PanelGroup>
    </div>
  );
}
