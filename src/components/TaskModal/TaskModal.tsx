import { useState } from 'react';

interface Task {
  _id: string;
  title: string;
  description: string;
  comment?: string;
  owners: { name?: string; email?: string }[];
}

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<Task>) => void;
  onDelete: () => void;
  onAssign: (id: string, email: string) => void;
}

const TaskModal = ({ task, onClose, onUpdate, onDelete, onAssign }: TaskModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showAssign, setShowAssign] = useState(false);
  const [assignEmail, setAssignEmail] = useState('');

  const handleSave = () => {
    onUpdate(task._id, {
      title: editedTask.title,
      description: editedTask.description,
      comment: editedTask.comment
    });
    setIsEditing(false);
  };

  const handleAssign = () => {
    onAssign(task._id, assignEmail);
    setShowAssign(false);
    setAssignEmail('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              rows={4}
            />
            <textarea
              value={editedTask.comment || ''}
              onChange={(e) => setEditedTask({ ...editedTask, comment: e.target.value })}
              placeholder="Add a comment"
              className="w-full p-2 border rounded mb-4"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsEditing(false)} 
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            
            {task.comment && (
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h3 className="font-semibold mb-2">Comment:</h3>
                <p>{task.comment}</p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={onDelete} 
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                <button 
                  onClick={() => setShowAssign(!showAssign)} 
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Assign
                </button>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-600 hover:bg-gray-200 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>

            {showAssign && (
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Enter email to assign"
                  value={assignEmail}
                  onChange={(e) => setAssignEmail(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={handleAssign}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Assign Task
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;
