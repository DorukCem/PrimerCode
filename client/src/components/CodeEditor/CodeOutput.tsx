import type { TestResult } from "../../types/TestResult";

export default function CodeOutput({ error, response }: any) {
  return (
    <div className="space-y-4 h-full bg-neutral-800 text-gray-100 p-4 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 border-t-1 border-white ">
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {response && (
        <div className="space-y-4 p-4 bg-neutral-800 rounded-lg">
          <h3 className="font-bold text-lg text-gray-200">Result</h3>
          <div
            className={`p-2 rounded ${
              response.success
                ? "bg-emerald-900 border border-emerald-700 text-emerald-100"
                : "bg-amber-900 border border-amber-700 text-amber-100"
            }`}
          >
            <p className="font-bold">{response.message}</p>
          </div>

          {response.results && response.results.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-200">Test Results</h3>
              <div className="grid gap-4">
                {response.results.map((result: TestResult, idx: number) => (
                  <div
                    key={idx}
                    className={`p-4 rounded border ${
                      result.is_correct
                        ? "bg-emerald-900/50 border-emerald-700"
                        : "bg-red-900/50 border-red-700"
                    }`}
                  >
                    {/* Display case signature details */}
                    <div className="space-y-2 mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-300">
                          Args:
                        </p>
                        <pre className="mt-1 text-sm bg-gray-950 p-2 rounded overflow-auto max-h-20 text-gray-300">
                          {result.case_signature.args}
                        </pre>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-300">
                          Expected:
                        </p>
                        <pre className="mt-1 text-sm bg-gray-950 p-2 rounded overflow-auto max-h-32 text-gray-300">
                          {result.case_signature.expected}
                        </pre>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-300">
                          Result:
                        </p>
                        <pre className="mt-1 text-sm bg-gray-950 p-2 rounded overflow-auto max-h-32 text-gray-300">
                          {result.case_signature.result}
                        </pre>
                      </div>
                    </div>

                    {result.case_stdout && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-300">
                          Stdout:
                        </p>
                        <pre className="mt-1 text-sm bg-gray-950 p-2 rounded overflow-auto max-h-32 text-gray-300">
                          {result.case_stdout}
                        </pre>
                      </div>
                    )}

                    {result.error && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-red-300">
                          Error:
                        </p>
                        <pre className="mt-1 text-sm bg-red-950 p-2 rounded overflow-auto max-h-32 text-red-200">
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
