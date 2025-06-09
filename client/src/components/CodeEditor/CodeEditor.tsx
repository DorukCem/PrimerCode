import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import CodeOutput from "./CodeOutput";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import type { CodeSubmissionResponse } from "../../types/CodeSubmissionResponse";
import type { CodeInput } from "../../types/CodeInput";

import Modal from "./Modal";

export default function CodeEditor({ slug }: any) {
  const [resetPanels, setResetPanels] = useState(1);

  const editorRef = useRef<any | null>(null);
  const [boilerplate, setBoilerplate] = useState("");
  const [editorValue, setEditorValue] = useState("# Loading...");
  const [editorLoading, setEditorLoading] = useState(true);

  const [response, setResponse] = useState<CodeSubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [responseLoading, setResponseLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fontSize, setFontSize] = useState(() => {
    const storedSetting = localStorage.getItem("fontSize");
    return storedSetting ? JSON.parse(storedSetting) : 16;
  });

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
    fetch(`http://localhost:3000/boilerplate/${slug}`)
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

    fetch(`http://localhost:3000/submit_code/${slug}`, {
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
        if (result.success) {
          if (result) {
            const solvedQuestions = JSON.parse(
              localStorage.getItem("solvedQuestions") || "{}"
            );

            solvedQuestions[result.question_id] = true;

            localStorage.setItem(
              "solvedQuestions",
              JSON.stringify(solvedQuestions)
            );
          }
        }
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

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="h-full flex flex-col rounded-lg border border-white">
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      {/* Buttons */}
      <div className="flex justify-end text-white bg-stone-900 border-b border-dashed border-white rounded-t-lg p-2">
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
          className="bg-green-700 text-white border border-white rounded-md px-4 py-1 my-auto hover:cursor-pointer"
          onClick={getCode}
          disabled={responseLoading}
        >
          {responseLoading ? "Running..." : "Run Code"}
        </button>
      </div>
    </div>
  );
}
