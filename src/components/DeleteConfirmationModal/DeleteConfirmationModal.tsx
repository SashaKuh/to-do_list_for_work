interface DeleteConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({ onCancel, onConfirm }: DeleteConfirmationModalProps) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl">
            <p className="text-lg mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end space-x-4">
                <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={onConfirm}
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
);

export default DeleteConfirmationModal;
