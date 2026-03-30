import { useState } from "react";
import CodeEditor from "./CodeEditor/CodeEditor";
import InfoPanel from "./InfoPanel/InfoPanel";
import { Panel, Group, Separator } from "react-resizable-panels";
import { useParams } from "react-router";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Question() {
  const [resetSolved, setResetSolved] = useState(0);
  const isMobile = useIsMobile();
  let params = useParams();
  let slug = params.slug;

  if (isMobile) {
    return (
      <div className="flex flex-col overflow-y-auto">
        <InfoPanel slug={slug} resetSolved={resetSolved} />
        <div className="w-screen h-[70vh]">
          <CodeEditor
            slug={slug}
            resetSolved={resetSolved}
            setResetSolved={setResetSolved}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full border-white">
      <Group orientation="horizontal" className="h-full p-12">
        <Panel defaultSize={40} minSize={20} className="h-full">
          <InfoPanel slug={slug} resetSolved={resetSolved} />
        </Panel>
        <Separator className="[&[data-separator='hover']]:bg-slate-500 [&[data-separator='active']]:bg-slate-400 w-[8px] my-1 flex items-center justify-center cursor-col-resize">
          <div className="w-[3px] h-12 rounded-full bg-slate-500 transition-colors" />
        </Separator>
        <Panel defaultSize={60} minSize={20} className="h-full">
          <CodeEditor
            slug={slug}
            resetSolved={resetSolved}
            setResetSolved={setResetSolved}
          />
        </Panel>
      </Group>
    </div>
  );
}
