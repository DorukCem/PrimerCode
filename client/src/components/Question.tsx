import { useState } from "react";
import CodeEditor from "./CodeEditor/CodeEditor";
import InfoPanel from "./InfoPanel/InfoPanel";
import { Panel, Group, Separator } from "react-resizable-panels";
import { useParams } from "react-router"

export default function Question( ) {
  const [resetSolved, setResetSolved] = useState(0)
  
  let params = useParams();
  let slug = params.slug;


  return (
    <div className="h-full border-white ">
      <Group orientation="horizontal" className="h-full p-12">
        <Panel defaultSize={40} minSize={20} className="h-full">
          <InfoPanel slug={slug} resetSolved={resetSolved}/>
        </Panel>
        <Separator className="[&[data-separator='hover']]:bg-slate-500 [&[data-separator='active']]:bg-slate-400 w-[8px]"/>
        <Panel defaultSize={60} minSize={20} className="h-full">
          <CodeEditor slug={slug} resetSolved={resetSolved} setResetSolved={setResetSolved}/>
        </Panel>
      </Group>
    </div>
  );
}
