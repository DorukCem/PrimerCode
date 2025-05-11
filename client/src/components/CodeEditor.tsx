import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import CodeOutput from "./CodeOutput";

export default function CodeEditor() {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [boilerplate, setBoilerplate] = useState("# Loading...");


  const onMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    // Fetch boilerplate from the backend
    fetch("http://localhost:3000/question")
      .then((res) => res.text())
      .then((boilerplate) => {
        setBoilerplate(boilerplate);
      })
      .catch((err) => {
        console.error("Failed to fetch boilerplate:", err);
        setBoilerplate("# Failed to load boilerplate");
      });
  }, []);

  return (
    <>
      <Editor
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue={boilerplate}
        height="75vh"
        value={value}
        onChange={(value, _event) => setValue(value || "")}
        onMount={onMount}
      />
      <CodeOutput editorRef={editorRef} />
    </>
  );
}
