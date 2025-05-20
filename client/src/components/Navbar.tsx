import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-neutral-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-around">
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Questions
          </Link>
        </div>
        <div className="text-white text-xl font-bold">Wilderness</div>
      </div>
    </nav>
  );
}
