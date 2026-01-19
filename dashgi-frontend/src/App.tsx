import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import ProjectsPage from './components/pages/ProjectsPage';

import './App.css'

function App() {
   return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Agrega aquí otras rutas, como dashboard, registro, etc. */}
        <Route path="/projects" element={<ProjectsPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<LoginPage />} /> {/* Redirige cualquier ruta desconocida al login */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
