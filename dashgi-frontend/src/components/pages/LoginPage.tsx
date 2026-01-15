import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
        setError(null);

        try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message || "Error al iniciar sesión");
            return;
        }

        // Guarda el token en localStorage (o donde prefieras)
        localStorage.setItem("token", data.token);

        // Redirige al dashboard (ajusta según tu router)
        window.location.href = "/dashboard";
        } catch (err) {
        setError("Error de red o del servidor");
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md flex flex-col gap-4 w-80"
            >
                <h1 className="text-2xl font-bold text-blue-500 mb-4 text-center">Iniciar sesión</h1>
                <label htmlFor="email" className="font-semibold">Email:</label>
                <input
                id="email"
                type="email"
                className="border rounded px-3 py-2"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                />

                <label htmlFor="password" className="font-semibold">Contraseña:</label>
                <input
                id="password"
                type="password"
                className="border rounded px-3 py-2"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                />

                <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                Login
                </button>
            </form>
        </div>
    )

};