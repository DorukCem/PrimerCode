import { useState } from "react";
import type { CodeInput } from "../types/CodeInput";

export default function CodeOutput({ editorRef }: any) {
  const [output, setOutput] = useState("");

  const getCode = () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

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
        return response.text();
      })
      .then((result) => {
        setOutput(result);
      })
      .catch((err) => {
        setOutput("Error: " + err.message);
      });
  };

  return (
    <>
      <p className="text-lg mb-2">Output</p>
      <button
        className="bg-green-700 text-white border border-white rounded-md px-4 py-1 mb-2"
        onClick={getCode}
      >
        Run Code
      </button>
      <div className="whitespace-pre bg-gray-100 p-3 rounded border">
        {output}
      </div>
    </>
  );
}
