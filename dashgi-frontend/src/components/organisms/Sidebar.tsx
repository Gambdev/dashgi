import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-6 font-bold text-xl">DashGI</div>
      <nav className="flex flex-col gap-2 p-4">
        <Link to="/dashboard" className="hover:bg-gray-700 rounded px-3 py-2">Dashboard</Link>
        <Link to="/projects" className="hover:bg-gray-700 rounded px-3 py-2">Projects</Link>
        <Link to="/teams" className="hover:bg-gray-700 rounded px-3 py-2">Teams</Link>
        {/* Agrega más enlaces según tus módulos */}
      </nav>
    </aside>
  );
}