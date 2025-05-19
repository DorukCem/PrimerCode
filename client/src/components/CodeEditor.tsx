import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import CodeOutput from "./CodeOutput";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import type { CodeSubmissionResponse } from "../types/CodeSubmissionResponse";
import type { CodeInput } from "../types/CodeInput";

import ReactModal from "react-modal";
import Select from "react-select";

// TODO refactor this file

export default function CodeEditor() {
  const [resetPanels, setResetPanels] = useState(1);

  const editorRef = useRef<any | null>(null);
  const [boilerplate, setBoilerplate] = useState("");
  const [editorValue, setEditorValue] = useState("# Loading...");
  const [editorLoading, setEditorLoading] = useState(true);

  const [response, setResponse] = useState<CodeSubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [responseLoading, setResponseLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fontSize, setFontSize] = useState(16)

  const onMount = (editor: any) => {
    editorRef.current = editor;
    // Apply initial settings
    editor.updateOptions({
      fontSize: fontSize,
    });
  };

  useEffect(() => {
    // Update editor options when settings change
    if (editorRef.current) {
      editorRef.current.updateOptions({
        fontSize: fontSize,
      });
    }
  }, [fontSize]);

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
        setEditorValue(boilerplate);
        setBoilerplate(boilerplate);
        setEditorLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch boilerplate:", err);
        setEditorValue("# Failed to load boilerplate");
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
        setResetPanels(resetPanels + 1); // ! Maybe only do this if the panel is completely collapsed
        setResponseLoading(false);
      });
  };

  const options = {
    readOnly: false,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    folding: true,
    padding: {
      top: 12,
    },
  };

  
  const fontOptions = [
    { value: 12, label: "12px" },
    { value: 14, label: "14px" },
    { value: 16, label: "16px" },
    { value: 18, label: "18px" },
    { value: 20, label: "20px" },
  ];
  
  
  function getCurrentFontOption()  {
    return fontOptions.find(option => option.value === fontSize) || fontOptions[1];
  };
  
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="h-full flex flex-col rounded-lg border border-white">
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        className="mx-auto mt-32 w-[500px] bg-zinc-900 text-white p-6 rounded-lg shadow-xl outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">
          Editor Settings
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Font Size</label>
            <Select
              options={fontOptions}
              defaultValue={getCurrentFontOption()} 
              className="text-black"
              onChange={(option) => setFontSize(option?.value || 16)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </ReactModal>
      {/* Buttons */}
      <div className="flex justify-end text-white bg-stone-900 rounded-t-lg p-2">
        <div
          className="border border-white mx-2 px-4 hover:cursor-pointer"
          onClick={() => setEditorValue(boilerplate)}
        >
          Reset
        </div>
        <div
          className="border border-white mx-2 px-4 hover:cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Settings
        </div>
      </div>
      {/* Editor */}
      <PanelGroup direction="vertical" className="rounded-b-xl">
        <Panel defaultSize={60} minSize={20} order={1}>
          <Editor
            theme="vs-dark"
            defaultLanguage="python"
            value={editorValue}
            onChange={(newValue) => setEditorValue(newValue || "")}
            onMount={onMount}
            loading={editorLoading ? "Loading..." : null}
            options={options}
          />
        </Panel>

        {response && (
          <>
            <PanelResizeHandle />
            <Panel
              defaultSize={40}
              collapsible={true}
              collapsedSize={0}
              minSize={0}
              order={2}
              key={resetPanels}
            >
              <CodeOutput response={response} error={error} />
            </Panel>
          </>
        )}
      </PanelGroup>
      <div className="flex flex-row-reverse bg-neutral-800 p-4 px-4 border-t-1 border-white rounded-b-lg">
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
