import type { TestResult } from "../../types/TestResult";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

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

              <Tabs className="react-tabs">
                <TabList className="flex space-x-1 p-1 rounded-lg">
                  {response.results.map((result: TestResult, idx: number) => (
                    <Tab
                      key={idx}
                      className={`px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                        result.is_correct
                          ? "text-emerald-400 hover:bg-emerald-900/30"
                          : "text-red-400 hover:bg-red-900/30"
                      }`}
                      selectedClassName={`${
                        result.is_correct
                          ? "bg-emerald-900/50 text-emerald-300"
                          : "bg-red-900/50 text-red-300"
                      }`}
                    >
                      Test {idx + 1}
                    </Tab>
                  ))}
                </TabList>

                {response.results.map((result: TestResult, idx: number) => (
                  <TabPanel
                    key={idx}
                    selectedClassName={`mt-4 p-4 rounded border ${
                      result.is_correct
                        ? "bg-emerald-900/50 border-emerald-700"
                        : "bg-red-900/50 border-red-700"
                    }`}
                  >
                    <div className="font-semibold mb-4 flex place-content-between">
                      <p className="text-lg">Test Case {idx + 1}</p>
                      <p className="text-lg">
                        {result.is_correct ? "✅ Passed" : "❌ Failed"}
                      </p>
                    </div>

                    {/* Display case signature details */}
                    <div className="space-y-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-300 mb-2">
                          Arguments:
                        </p>
                        <pre className="text-sm bg-gray-950 p-3 rounded overflow-auto max-h-20 text-gray-300">
                          {result.case_signature.args}
                        </pre>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-300 mb-2">
                          Expected
                        </p>
                        <pre className="text-sm bg-gray-950 p-3 rounded overflow-auto max-h-40 text-gray-300">
                          {result.case_signature.expected}
                        </pre>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-300 mb-2">
                          Result:
                        </p>
                        <pre className="text-sm bg-gray-950 p-3 rounded overflow-auto max-h-40 text-gray-300">
                          {result.case_signature.result}
                        </pre>
                      </div>
                    </div>

                    {result.case_stdout && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-300 mb-2">
                          Standard Output:
                        </p>
                        <pre className="text-sm bg-gray-950 p-3 rounded overflow-auto max-h-32 text-gray-300">
                          {result.case_stdout}
                        </pre>
                      </div>
                    )}

                    {result.error && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-red-300 mb-2">
                          Error:
                        </p>
                        <pre className="text-sm bg-red-950 p-3 rounded overflow-auto max-h-32 text-red-200">
                          {result.error}
                        </pre>
                      </div>
                    )}
                  </TabPanel>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
