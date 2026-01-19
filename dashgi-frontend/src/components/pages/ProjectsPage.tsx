import  { useEffect, useState } from "react";
import MainLayout from "../templates/MainLayout";


type Project = {
    _id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: string;
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: "", description: "", status: "Not Started", startDate: "", endDate: "" });
    const [creating, setCreating] = useState(false);

    const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al crear proyecto");
      setProjects(prev => [...prev, data]);
      setForm({ name: "", description: "", status: "Not Started", startDate: "", endDate: "" });
      setShowForm(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };


    useEffect(() => {
        const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try { // Por defecto si hago un fetch a Api, sin "method" y sin "body", es GET
            const token = localStorage.getItem("token");
            const res = await fetch("/api/projects", {
            headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error in Project Request");
            setProjects(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };
        fetchProjects();
    }, []);

    return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <button
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowForm(!showForm)}
        >
            {showForm ? "Cancel" : "Create Project"}
        </button>
        {showForm && (
            <form onSubmit={handleCreate} className="mb-6 bg-white p-4 rounded shadow flex flex-col gap-2">
            <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
                className="border rounded px-3 py-2"
            />
            <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                required
                className="border rounded px-3 py-2"
            />
            <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="border rounded px-3 py-2"
            >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <input type="date" 
                
                value={form.startDate}
                onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                className="border rounded px-3 py-2"
            />
            <input type="date"
                value={form.endDate}
                onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                className="border rounded px-3 py-2"
            />
            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={creating}
            >
                {creating ? "Creating..." : "Create"}
            </button>
            </form>
        )}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {projects.map(project => (
          <li key={project._id} className="mb-2 p-2 bg-white rounded shadow">
            <strong>{project.name}</strong> - {project.status}
            <div className="text-gray-500">{project.description}</div>
          </li>
        ))}
      </ul>
      {/* Aquí puedes agregar formularios y botones para crear/editar/eliminar */}
    </MainLayout>
    );
}