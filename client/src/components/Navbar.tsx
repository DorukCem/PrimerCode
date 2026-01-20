import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-neutral-800 p-4 shadow-md text-lg">
      <div className="mx-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link
            to="/questions"
            className="text-gray-300 hover:text-white font-medium"
          >
            Questions
          </Link>
          <Link to="/" className="text-gray-300 hover:text-white font-medium mr-4">
            About
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* Buy Me a Coffee Button */}
          <a
            href="https://buymeacoffee.com/DorukCem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center whitespace-nowrap min-w-[150px] justify-center
             py-2 px-4 bg-neutral-700 hover:bg-yellow-600 
             text-gray-300 font-medium rounded-md 
             transition-colors duration-200"
          >
            <span className="mr-1.5">☕</span>
            Buy me a coffee
          </a>

          {user && <span className="text-gray-400 text-md">{user.name}</span>}
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}
