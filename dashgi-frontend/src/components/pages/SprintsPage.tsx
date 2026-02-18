import  { useEffect, useState } from "react";
import MainLayout from "../templates/MainLayout";
import Modal from "../molecules/Modal";

type Project = {
  _id: string;
  name: string;
};
type Sprint = {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    project: Project | string;
};
export default function SprintsPage() {
    const [sprints, setSprints] = useState<Sprint[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editSprint, setEditSprint] = useState<Sprint | null>(null);
    const [editForm, setEditForm] = useState({
        name: "",
        startDate: "",
        endDate: "",
        projectId: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [loadingSprints, setLoadingSprints] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [form, setForm] = useState({
        name: "",
        startDate: "",
        endDate: "",
        projectId: "",
    });


    const [projects, setProjects] = useState<Project[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);


    useEffect(() => {
        const fetchProjects = async () => {
        setLoadingProjects(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/projects", {
            headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) setProjects(data);
        } finally {
            setLoadingProjects(false);
        }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        const fetchSprintsByProject = async () => {
            if (!selectedProjectId) {
                setSprints([]);
                return;
            }
            setLoadingSprints(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`/api/sprints/project/${selectedProjectId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Error fetching sprints");
                setSprints(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoadingSprints(false);
            }
        };
        fetchSprintsByProject();
    }, [selectedProjectId]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const validation = validateSprintDates(editForm.startDate, editForm.endDate);
        if (validation) {
            setError(validation);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/sprints/${editSprint?._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: editForm.name,
                startDate: editForm.startDate,
                endDate: editForm.endDate,
                project: editForm.projectId,
            }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error updating sprint");

            setSprints((prev) => prev.map((s) => (s._id === data._id ? data : s)));
            setEditSprint(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this sprint?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/sprints/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Error deleting sprint");
            setSprints((prev) => prev.filter((s) => s._id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };


    const validateSprintDates = (startDate: string, endDate: string) => {
        if (!startDate || !endDate) return "Both dates are required.";
        if (new Date(endDate) < new Date(startDate)) {
            return "End date must be after start date.";
        }
        return null;
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/sprints/project/${form.projectId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: form.name,
                    startDate: form.startDate,
                    endDate: form.endDate,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error creating sprint");
            setSprints((prev) => [...prev, data]);
            setSelectedProjectId(form.projectId);
            setForm({ name: "", startDate: "", endDate: "", projectId: "" });
            setShowForm(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setCreating(false);
        }
    };

    return (
        <MainLayout>
            <h1 className="text-2xl font-bold mb-4">Sprints</h1>
            <div className="mb-4">
                <label htmlFor="filter-project" className="block text-sm font-medium text-gray-700">
                    Filter by project
                </label>
                <select
                    id="filter-project"
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    disabled={loadingProjects}
                    className="border rounded px-3 py-2 w-full max-w-md"
                >
                    <option value="">
                        {loadingProjects ? "Loading projects..." : "Select a project"}
                    </option>
                    {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowForm(true)}
                >
                Create Sprint
            </button>

            {error && <p className="mb-4 text-red-500">{error}</p>}

            {loadingSprints && <p className="mb-4 text-gray-500">Loading sprints...</p>}
            {!loadingSprints && selectedProjectId && sprints.length === 0 && (
                <p className="mb-4 text-gray-500">No sprints for this project yet.</p>
            )}
            {!loadingSprints && sprints.length > 0 && (
                <div className="mb-6 overflow-x-auto">
                    <table className="w-full bg-white rounded shadow">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Start Date</th>
                                <th className="py-2 px-4 text-left">End Date</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sprints.map((sprint) => (
                                <tr key={sprint._id} className="border-b">
                                    <td className="py-2 px-4">{sprint.name}</td>
                                    <td className="py-2 px-4">
                                        {sprint.startDate ? new Date(sprint.startDate).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="py-2 px-4">
                                        {sprint.endDate ? new Date(sprint.endDate).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="py-2 px-4 flex gap-2">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                            onClick={() => {
                                            setEditSprint(sprint);
                                            setEditForm({
                                                name: sprint.name,
                                                startDate: sprint.startDate?.split("T")[0] || "",
                                                endDate: sprint.endDate?.split("T")[0] || "",
                                                projectId: typeof sprint.project === "string" ? sprint.project : sprint.project._id,
                                            });
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                            onClick={() => handleDelete(sprint._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>


                                </tr>
                                
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        <Modal open={showForm} onClose={() => setShowForm(false)}>
            <h1 className="text-xl font-bold mb-4">Create Sprint</h1>
            <form
                onSubmit={handleCreate}
                className="space-y-4"
            >
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Sprint Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        required
                        value={form.startDate}
                        onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
                        className="border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        required
                        value={form.endDate}
                        onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
                        className="border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                        Project
                    </label>
                    <select
                        id="project"
                        name="project"
                        required
                        value={form.projectId}
                        onChange={(e) => setForm((prev) => ({ ...prev, projectId: e.target.value }))}
                        disabled={loadingProjects}
                        className="border rounded px-3 py-2"
                    >
                        <option value="" disabled>
                            {loadingProjects ? "Loading projects..." : "Select a project"}
                        </option>
                        {projects.map((project) => (
                            <option key={project._id} value={project._id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={creating}
                    >
                        {creating ? "Creating..." : "Create Sprint"}
                    </button>
                </div>
            </form>
        </Modal>
        <Modal open={!!editSprint} onClose={() => setEditSprint(null)}>
            <form onSubmit={handleUpdate} className="space-y-4 flex flex-col">
                <h3 className="text-lg font-bold">Edit Sprint</h3>
                <label htmlFor="editName" className="block text-sm font-medium text-gray-700">
                    Sprint Name
                </label>
                <input
                type="text"
                id="editName"
                value={editForm.name}
                onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                className="border rounded px-3 py-2"
                />

                <label htmlFor="editStartDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                </label>
                <input
                type="date"
                id="editStartDate"
                value={editForm.startDate}
                onChange={(e) => setEditForm((f) => ({ ...f, startDate: e.target.value }))}
                className="border rounded px-3 py-2"
                />

                <label htmlFor="editEndDate" className="block text-sm font-medium text-gray-700">
                    End Date
                </label>
                <input
                type="date"
                id="editEndDate"
                value={editForm.endDate}
                onChange={(e) => setEditForm((f) => ({ ...f, endDate: e.target.value }))}
                className="border rounded px-3 py-2"
                />

                <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
                Update Sprint
                </button>
            </form>
        </Modal>





        </MainLayout>

    )

};