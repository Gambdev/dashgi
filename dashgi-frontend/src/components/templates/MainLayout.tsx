import Sidebar from "../organisms/Sidebar";
import type { ReactNode } from "react";


type MainLayoutProps = {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
}