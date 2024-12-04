interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    owners: { name?: string; email?: string }[];
    comment?: string;
}

interface TaskCardProps {
    task: Task;
    onClick: () => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
    const getLastOwner = (owners: { name?: string; email?: string }[]) => {
        const lastOwner = owners?.[owners.length - 1];
        return lastOwner ? lastOwner.name || lastOwner.email || "No Owner" : "No Owner";
    };

    return (
        <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", task._id)}
            onClick={onClick}
            className="p-4 mb-4 bg-gray-100 border-2 border-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition"
        >
            <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <div className="mt-4 p-2 bg-gray-300 rounded text-sm text-gray-700">
                Owner: {getLastOwner(task.owners)}
            </div>
        </div>
    );
};

export default TaskCard;
