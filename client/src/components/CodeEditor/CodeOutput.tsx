import type { TestResult } from "../../types/TestResult";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { AlertTriangleIcon } from "lucide-react";

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
          <h1 className="text-3xl font-bold mb-2">Test Results</h1>
          <div className="flex items-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <CheckCircleIcon size={16} className="text-green-500" />
              <span>Passed</span>
            </div>
            <div className="flex items-center gap-1">
              <XCircleIcon size={16} className="text-red-500" />
              <span>Failed</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangleIcon size={16} className="text-yellow-500" />
              <span>Skipped</span>
            </div>
          </div>
          <div
            className={`p-4 mb-6 rounded-lg ${
              response.success
                ? "bg-emerald-900/30 border border-emerald-800 text-emerald-100"
                : "bg-red-900/30 border border-red-800 text-amber-100"
            }`}
          >
            <div className="flex items-center gap-3">
              {!response.success ? (
                <AlertTriangleIcon size={20} className="text-red-400" />
              ) : null}

              <h2 className="font-medium text-white">{response.message}</h2>
            </div>
          </div>

          {response.results && response.results.length > 0 && (
            <div className="space-y-4">
              <Tabs className="react-tabs">
                <TabList className="flex flex-wrap space-x-1 p-1 rounded-lg">
                  {response.results.map((result: TestResult, idx: number) => (
                    <Tab
                      key={idx}
                      className={`px-4 py-2 font-medium rounded-md cursor-pointer transition-colors flex items-center gap-2 t ${
                        result.is_correct
                          ? "text-gray-300 hover:bg-gray-600/50"
                          : "text-red-400 hover:bg-gray-600/50"
                      }`}
                      selectedClassName={"bg-gray-600/50"}
                    >
                      {!result.is_correct ? (
                        <XCircleIcon size={16} className="text-red-500" />
                      ) : (
                        <CheckCircleIcon size={16} className="text-green-500" />
                      )}
                      Case {idx + 1}
                    </Tab>
                  ))}
                </TabList>

                {response.results.map((result: TestResult, idx: number) => (
                  <TabPanel
                    key={idx}
                    selectedClassName={`mt-4 p-4 rounded-lg border ${
                      result.is_correct
                        ? "bg-emerald-900/30 border-emerald-800"
                        : "bg-red-900/30 border-red-800"
                    }`}
                  >
                    <div className="font-semibold mb-4 flex place-content-between">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        {!result.is_correct ? (
                          <XCircleIcon size={20} className="text-red-500" />
                        ) : (
                          <CheckCircleIcon
                            size={20}
                            className="text-green-500"
                          />
                        )}
                        Test Case {idx + 1}
                      </h3>
                      <div
                        className={`py-1 px-3 rounded-full text-sm font-medium
                        ${
                          !result.is_correct
                            ? "bg-red-600/50 text-red-200"
                            : "bg-green-600/50 text-green-200"
                        } 
                      `}
                      >
                        {!result.is_correct ? "Failed" : "Passed"}
                      </div>
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
