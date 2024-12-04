import TaskCard from "../TaskCard/TaskCard";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  owners: { name?: string; email?: string }[];
  comment?: string;
}

interface TaskListProps {
  status: string;
  tasks: Task[];
  moveTask: (taskId: string, newStatus: string) => void;
  onTaskClick: (task: Task) => void;
}

const TaskList = ({ status, tasks, moveTask, onTaskClick }: TaskListProps) => (
  <div
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
    </div>

    {tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <TaskCard key={task._id} task={task} onClick={() => onTaskClick(task)} />
      ))}
  </div>
);

export default TaskList;
