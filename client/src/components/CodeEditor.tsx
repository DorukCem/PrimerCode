import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import CodeOutput from "./CodeOutput";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function CodeEditor() {
  const editorRef = useRef(null);
  const [value, setValue] = useState("# Loading...");
  const [isLoading, setIsLoading] = useState(true);

  const onMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    // Fetch boilerplate from the backend
    fetch("http://localhost:3000/boilerplate/1")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.text();
      })
      .then((boilerplate) => {
        setValue(boilerplate);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch boilerplate:", err);
        setValue("# Failed to load boilerplate");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <PanelGroup direction="vertical">
        <Panel defaultSize={90} minSize={20}>
          <Editor
            theme="vs-dark"
            defaultLanguage="python"
            value={value}
            onChange={(newValue) => setValue(newValue || "")}
            onMount={onMount}
            loading={isLoading ? "Loading..." : null}
          />
        </Panel>
        <PanelResizeHandle />
        <Panel collapsible={true} collapsedSize={10} minSize={10}>
          <CodeOutput editorRef={editorRef} />
        </Panel>
      </PanelGroup>
    </>
  );
}