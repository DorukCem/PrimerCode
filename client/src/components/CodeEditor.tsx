import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import CodeOutput from "./CodeOutput";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import type { CodeSubmissionResponse } from "../types/CodeSubmissionResponse";
import type { CodeInput } from "../types/CodeInput";

export default function CodeEditor() {
  const editorRef = useRef<any|null>(null);
  const [value, setValue] = useState("# Loading...");
  const [editorLoading, setEditorLoading] = useState(true);

  const [response, setResponse] = useState<CodeSubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [responseLoading, setResponseLoading] = useState(false);

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
        setEditorLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch boilerplate:", err);
        setValue("# Failed to load boilerplate");
        setEditorLoading(false);
      });
  }, []);

  const getCode = () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    setResponseLoading(true);

    const payload: CodeInput = {
      content: sourceCode,
    };

    fetch("http://localhost:3000/submit_code/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json() as Promise<CodeSubmissionResponse>;
      })
      .then((result) => {
        setResponse(result);
      })
      .catch((err) => {
        setError("Error: " + err.message);
        setResponse(null);
      })
      .finally(() => {
        setResponseLoading(false);
      });
  };

  const options = {
    readOnly: false,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    folding: true
  };

  return (
    <div className="h-full flex flex-col rounded-xl border border-white">
      <PanelGroup direction="vertical">
        <Panel defaultSize={90} minSize={20}>
          <Editor
            theme="vs-dark"
            defaultLanguage="python"
            value={value}
            onChange={(newValue) => setValue(newValue || "")}
            onMount={onMount}
            loading={editorLoading ? "Loading..." : null}
            options = {options}
          />
        </Panel>
        <PanelResizeHandle />
        <Panel collapsible={true} collapsedSize={0} minSize={0}>
          <CodeOutput response={response} error={error} />
        </Panel>
      </PanelGroup>
      <div className="flex flex-row-reverse bg-neutral-800 p-4 px-4 border-t-1 border-white">
        <button
          className="bg-green-700 text-white border border-white rounded-md px-4 py-1 my-auto"
          onClick={getCode}
          disabled={responseLoading}
        >
          {responseLoading ? "Running..." : "Run Code"}
        </button>
      </div>
    </div>
  );
}
