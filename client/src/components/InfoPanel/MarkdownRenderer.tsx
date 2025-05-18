import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {vscDarkPlus as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./github-markdown-dark.css";
import { useState } from "react";

// okaidia
// tomorrow
// atomDark
// cb
// coldarkDark
// nightOwl
// oneDark
// vscDarkPlus

function HintButton({ children }: any) {
  const [show, setShow] = useState(false);

  return (
    <div className="my-2 border border-white rounded-md bg-neutral-700 overflow-clip">
      <button
        onClick={() => setShow(!show)}
        className="cursor-pointer w-full px-4 py-4 text-left text-lg font-medium flex justify-between items-center"
      >
        <span>{show ? "Hide Hint" : "Show Hint"}</span>
        <span className="text-white">{show ? "▼" : "►"}</span>
      </button>
      {show && (
        <div className="p-4 border-t border-dashed border-white bg-neutral-700">
          {children}
        </div>
      )}
    </div>
  );
}



export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body h-full overflow-y-scroll">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          blockquote: HintButton,
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <SyntaxHighlighter
                codeTagProps={{style: {fontSize: 16} }}
                style={theme}
                PreTag="div"
                language={match[1]}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
