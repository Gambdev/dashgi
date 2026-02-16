import  { useEffect, useState } from "react";
import MainLayout from "../templates/MainLayout";
import Modal from "../molecules/Modal";

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

    const [editProject, setEditProject] = useState<Project | null>(null);
    const [editForm, setEditForm] = useState({ name: "", description: "", status: "Not Started", startDate: "", endDate: "" });
    const [updating, setUpdating] = useState(false);

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
  const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Error deleting project");
            setProjects(prev => prev.filter(p => p._id !== id));
        } catch (err: any) {
            setError(err.message);
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
        <Modal open={showForm} onClose={() => setShowForm(false)}>
            <form onSubmit={handleCreate} className="mb-6 bg-white p-4 rounded shadow flex flex-col gap-2">
            <h3 className="text-lg font-bold mb-2">Create Project</h3>
              <label htmlFor="name" className="font-semibold">Project Name:</label>
              <input
                id="name"
                type="text"
                placeholder="Nombre"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
                className="border rounded px-3 py-2"
              />
              <label htmlFor="description" className="font-semibold">Description:</label>
              <input
                id="description"
                type="text"
                placeholder="Descripción"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                required
                className="border rounded px-3 py-2"
              />
              <label htmlFor="status" className="font-semibold">Status:</label>
              <select
                id="status"
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="border rounded px-3 py-2"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <label htmlFor="startDate" className="font-semibold">Start Date:</label>
              <input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                className="border rounded px-3 py-2"
              />
              <label htmlFor="endDate" className="font-semibold">End Date:</label>
              <input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                className="border rounded px-3 py-2"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={creating}
              >
                {creating ? "Creando..." : "Crear"}
              </button>
              </form>
        </Modal>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full bg-white rounded shadow mt-4">
        <thead>
            <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Start Date</th>
            <th className="py-2 px-4 text-left">End Date</th>
            <th className="py-2 px-4 text-left">Actions</th>
            </tr>
        </thead>
        <tbody>
            {projects.map(project => (
            <tr key={project._id} className="border-b">
                <td className="py-2 px-4">{project.name}</td>
                <td className="py-2 px-4">{project.status}</td>
                <td className="py-2 px-4">{project.startDate ? new Date(project.startDate).toLocaleDateString() : "-"}</td>
                <td className="py-2 px-4">{project.endDate ? new Date(project.endDate).toLocaleDateString() : "-"}</td>
                <td className="py-2 px-4 flex gap-2">
                <button
                className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                onClick={() => {
                    setEditProject(project);
                    setEditForm({
                    name: project.name,
                    description: project.description,
                    status: project.status,
                    startDate: project.startDate ? new Date(project.startDate).toISOString().split("T")[0] : "",
                    endDate: project.endDate ? new Date(project.endDate).toISOString().split("T")[0] : "",
                    });
                }}
                >
                Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded text-sm" 
                onClick={() => handleDelete(project._id)}>Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        <Modal open={!!editProject} onClose={() => setEditProject(null)}>
            <form
                onSubmit={async e => {
                e.preventDefault();
                if (!editProject) return;
                setUpdating(true);
                try {
                    const token = localStorage.getItem("token");
                    const res = await fetch(`/api/projects/${editProject._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(editForm),
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message || "Error updating project");
                    setProjects(prev =>
                    prev.map(p => (p._id === editProject._id ? data : p))
                    );
                    setEditProject(null);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setUpdating(false);
                }
                }}
                className="flex flex-col gap-4"
            >
                <label htmlFor="edit-name" className="font-semibold">Project Name:</label>
                <input
                id="edit-name"
                type="text"
                value={editForm.name}
                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                required
                className="border rounded px-3 py-2"
                />
                <label htmlFor="edit-description" className="font-semibold">Description:</label>
                <input
                id="edit-description"
                type="text"
                value={editForm.description}
                onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                required
                className="border rounded px-3 py-2"
                />
                <label htmlFor="edit-status" className="font-semibold">Status:</label>
                <select
                id="edit-status"
                value={editForm.status}
                onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}
                className="border rounded px-3 py-2"
                >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                </select>
                <label htmlFor="edit-startDate" className="font-semibold">Start Date:</label>
                <input
                id="edit-startDate"
                type="date"
                value={editForm.startDate}
                onChange={e => setEditForm(f => ({ ...f, startDate: e.target.value }))}
                className="border rounded px-3 py-2"
                />
                <label htmlFor="edit-endDate" className="font-semibold">End Date:</label>
                <input
                id="edit-endDate"
                type="date"
                value={editForm.endDate}
                onChange={e => setEditForm(f => ({ ...f, endDate: e.target.value }))}
                className="border rounded px-3 py-2"
                />
                <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                disabled={updating}
                >
                {updating ? "Updating..." : "Update"}
                </button>
            </form>
        </Modal>




      {/* Aquí puedes agregar formularios y botones para crear/editar/eliminar */}
    </MainLayout>
    );
}