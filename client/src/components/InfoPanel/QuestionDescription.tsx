import MarkdownRenderer from "./MarkdownRenderer";

export default function QuestionDescription({ markdown }: any) {
  return <MarkdownRenderer content={markdown}/>
  
}
