import  { useEffect, useState } from "react";
import MainLayout from "../templates/MainLayout";
import Modal from "../molecules/Modal";


export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return(
        <MainLayout>
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>

        </MainLayout>
    )

};