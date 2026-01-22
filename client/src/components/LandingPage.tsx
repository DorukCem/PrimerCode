import { Link } from "react-router-dom";
import "./InfoPanel/github-markdown-dark.css";

export default function LandingPage() {
  return (
    <div className="bg-neutral-800 h-full flex flex-col">
      <div className="h-10 md:h-1/5"></div>
      <div className="max-w-4xl mx-auto w-full px-4">
        <div>
          <h1 className="text-4xl text-center md:text-left md:text-[4em] mb-4 text-white border-b border-gray-400 pb-2">
            Welcome to PrimerCode
          </h1>
          <p className="text-lg md:text-[1.4em] text-white">
            PrimerCode is website for solving elementary level programming
            exercises. The site features over 50 questions, each coming with a
            flavour text. You may use the site without login and free of charge.
          </p>
        </div>
        <div className="mt-6 flex flex-col md:flex-row gap-3 text-base md:text-xl text-white w-full md:w-fit">
          <Link
            to="/questions"
            className="border-2 border-white rounded-md px-4 py-3 hover:bg-white hover:text-neutral-800 transition-colors duration-200 text-center"
            prefetch="render"
          >
            Start solving questions now
          </Link>
          <Link
            to="/about"
            className="border-2 border-white rounded-md px-4 py-3 hover:bg-white hover:text-neutral-800 transition-colors duration-200 text-center"
            prefetch="intent"
          >
            Learn more about the website
          </Link>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}