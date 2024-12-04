import { useEffect, useState } from "react";
import {
    getTasks,
    setAuthHeader,
    updateTask,
    deleteTask,
    assignTask,
} from "../../services/api";
import TaskModal from "../../components/TaskModal/TaskModal";
import NewTodo from "../../components/NewTodo/NewTodo";
import { getAccessToken } from "../../services/auth";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    owners: { name?: string; email?: string }[];
    comment?: string;
}

const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        const token = getAccessToken();

        if (!token) {
            setError("You are not authenticated.");
            setLoading(false);
            return;
        }

        setAuthHeader(token);
                
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const data: Task[] = await getTasks();
                setTasks(data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch tasks.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const moveTask = async (taskId: string, newStatus: string) => {
        try {
            const updatedTask = await updateTask(taskId, { status: newStatus });
            setTasks((prev) =>
                prev.map((task) => task._id === taskId ? updatedTask : task)
            );
        } catch (err) {
            console.log(err);
            alert("Failed to update task status.");
        }
    };

    const getLastOwner = (owners: { name?: string; email?: string }[]) => {
        const lastOwner = owners?.[owners.length - 1];
        return lastOwner ? lastOwner.name || lastOwner.email || "No Owner" : "No Owner";
    };

    const handleUpdateTask = async (id: string, data: Partial<Task>) => {
        try {
            const updatedTask = await updateTask(id, data);
            setTasks((prev) =>
                prev.map((task) => (task._id === id ? updatedTask : task))
            );
            setSelectedTask(null);
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Tasks</h1>

            <div className="grid grid-cols-2 gap-8">
                {["in-progress", "done"].map((status) => (
                    <div
                        key={status}
                        className="bg-white rounded-xl shadow-lg p-6"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const taskId = e.dataTransfer.getData("text/plain");
                            moveTask(taskId, status);
                        }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold capitalize text-gray-700">
                                {status.replace("-", " ")}
                            </h2>
                            {status === "in-progress" && <NewTodo />}
                        </div>

                        {tasks
                            .filter((task) => task.status === status)
                            .map((task) => (
                                <div
                                    key={task._id}
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData("text/plain", task._id);
                                    }}
                                    onClick={() => setSelectedTask(task)}
                                    className="p-4 mb-4 bg-gray-100 border-2 border-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition"
                                >
                                    <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
                                    <p className="text-gray-600 mt-2">{task.description}</p>
                                    <div className="mt-4 p-2 bg-gray-300 rounded text-sm text-gray-700">
                                        Owner: {getLastOwner(task.owners)}
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            </div>

            {selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onUpdate={handleUpdateTask}
                    onDelete={() => {
                        setDeleteConfirm(selectedTask._id);
                    }}
                    onAssign={(id, email) => {
                        assignTask(id, email).then(() => alert(`Task assigned to ${email}`));
                    }}
                />
            )}

            {deleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl">
                        <p className="text-lg mb-4">Are you sure you want to delete this task?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setDeleteConfirm(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => {
                                    deleteTask(deleteConfirm);
                                    setTasks((prev) => prev.filter((task) => task._id !== deleteConfirm));
                                    setDeleteConfirm(null);
                                    setSelectedTask(null);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
