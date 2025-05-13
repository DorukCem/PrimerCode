import { useState } from "react";
import type { CodeInput } from "../types/CodeInput";
import type { CodeSubmissionResponse } from "../types/CodeSubmissionResponse";

export default function CodeOutput({ editorRef }: any) {
  const [response, setResponse] = useState<CodeSubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        return response.json() as Promise<CodeSubmissionResponse>;
      })
      .then((result) => {
        setResponse(result);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error: " + err.message);
        setResponse(null);
        setLoading(false);
      });
  };

  return (
    <div className="space-y-4">
      <button
        className="bg-green-700 text-white border border-white rounded-md px-4 py-1 mb-2"
        onClick={getCode}
        disabled={loading}
      >
        {loading ? "Running..." : "Run Code"}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {response && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded ${
              response.success
                ? "bg-green-100 border-green-400"
                : "bg-yellow-100 border-yellow-400"
            }`}
          >
            <p className="font-bold">{response.message}</p>
          </div>

          {Object.entries(response.results).length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Test Results</h3>
              <div className="grid gap-4">
                {response.results.map((result, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded border ${
                      result.is_correct
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p className="font-semibold mb-2">
                      {result.case_signature}
                      {result.is_correct ? "✅ Passed" : "❌ Failed"}
                    </p>
                    {result.case_stdout && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">
                          Output:
                        </p>
                        <pre className="mt-1 text-sm bg-gray-50 p-2 rounded overflow-auto">
                          {result.case_stdout}
                        </pre>
                      </div>
                    )}
                    {result.error && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-red-700">
                          Error:
                        </p>
                        <pre className="mt-1 text-sm bg-red-50 p-2 rounded overflow-auto">
                          {result.error}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
