import CodeEditor from "./CodeEditor";
import QuestionDescription from "./QuestionDescription";

export default function Question() {
  return (
    <div className="h-screen">
        <div className="flex flex-row">
          <div className="flex-1">
            <QuestionDescription />
          </div>
          <div className="flex-1">
            <CodeEditor />
          </div>
        </div>
    </div>
  );
}
