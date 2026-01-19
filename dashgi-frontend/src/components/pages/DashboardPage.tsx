import MainLayout from "../templates/MainLayout";
import DashboardCard from "../molecules/DashboardCard";
export default function DashboardPage() {
  return (
    <MainLayout>
   <h1 className="text-3xl font-bold mb-6">Bienvenido al Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard value={0} label="Proyectos activos" />
        <DashboardCard value={0} label="Tareas pendientes" />
        <DashboardCard value={0} label="Miembros en tu equipo" />
      </div>
      <div className="mt-8 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Próximos eventos</h2>
        <p className="text-gray-500">Aquí aparecerán tus reuniones y deadlines.</p>
      </div>
    </MainLayout>
  );
}