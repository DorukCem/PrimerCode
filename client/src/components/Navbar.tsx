import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="bg-neutral-800 p-4 shadow-md text-lg">
      <div className="mx-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/questions" className="text-gray-300 hover:text-white font-medium">
            Questions
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-white font-medium"
          >
            About
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user && <span className="text-gray-400 text-md">{user.name}</span>}
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}
