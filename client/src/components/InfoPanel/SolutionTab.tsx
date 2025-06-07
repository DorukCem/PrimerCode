import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

export default function SolutionTab({ markdown }: any) {
  const [isRevealed, setIsRevealed] = useState(false);

  if (!isRevealed) {
    return (
      <div 
        className="cursor-pointer rounded select-none transition-colors"
        onClick={() => setIsRevealed(true)}
        title="Click to reveal solution"
      >
        <div className="blur-sm">
          <MarkdownRenderer content={markdown} />
        </div>
        <div className="text-center text-lg mt-4 text-white">
          Click to reveal solution
        </div>
      </div>
    );
  }

  return <MarkdownRenderer content={markdown} />;
}