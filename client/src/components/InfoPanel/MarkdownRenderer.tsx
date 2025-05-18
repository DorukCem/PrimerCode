import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./github-markdown-dark.css";
import { useState } from "react";


function HintButton({ children }: any) {
  const [show, setShow] = useState(false);

  return (
    <div className="my-2">
      <button
        onClick={() => setShow(!show)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        {show ? "Hide Hint" : "Show Hint"}
      </button>
      {show && <div className="mt-2">{children}</div>}
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
                style={atomDark}
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
