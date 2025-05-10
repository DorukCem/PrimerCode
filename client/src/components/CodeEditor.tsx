import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import CodeOutput from "./CodeOutput";

export default function CodeEditor() {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");

  const onMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <>
      <Editor
        height="75vh"
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue="# Enter solution"
        value={value}
        onChange={(value, _event) => setValue(value || "")}
        onMount={onMount}
      />
      <CodeOutput editorRef={editorRef} />
    </>
  );
}
