import MarkdownRenderer from "./MarkdownRenderer";

export default function SolutionTab({ markdown }: any) {
  return <MarkdownRenderer content={markdown} />;
}
