import CodeEditor from "./CodeEditor/CodeEditor";
import InfoPanel from "./InfoPanel/InfoPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useParams } from "react-router"

export default function Question( ) {
  let params = useParams();
  let slug = params.slug;

  return (
    <div className="h-full border-white ">
      <PanelGroup direction="horizontal" className="h-full p-12">
        <Panel defaultSize={40} minSize={20} className="h-full">
          <InfoPanel slug={slug}/>
        </Panel>
        <PanelResizeHandle className="w-[8px] hover:bg-sky-600"/>
        <Panel defaultSize={60} minSize={20} className="h-full">
          <CodeEditor slug={slug}/>
        </Panel>
      </PanelGroup>
    </div>
  );
}
