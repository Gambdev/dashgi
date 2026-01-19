import type { ReactNode } from "react";


type DashboardCardProps = {
    value: ReactNode;
    label: string;
    className?: string;
}

export default function DashboardCard({ value, label, className = "" }: DashboardCardProps) {
  return (
    <div className={`bg-white rounded shadow p-6 flex flex-col items-center ${className}`}>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}