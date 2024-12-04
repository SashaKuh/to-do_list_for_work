import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../services/api";

interface NewTodoFormValues {
    title: string;
    description?: string;
    difficulty: string;
    status: string;
    deadline?: Date | null;
}

const NewTodo = () => {
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const initialValues: NewTodoFormValues = {
        title: "",
        description: "",
        difficulty: "Easy",
        status: "in-progress",
        deadline: null,
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        difficulty: Yup.string()
            .oneOf(["Easy", "Medium", "Hard"], "Invalid difficulty")
            .required(),
        status: Yup.string()
            .oneOf(["in-progress", "done"], "Invalid status")
            .required(),
        deadline: Yup.date().nullable(),
    });

    const handleSubmit = async (
        values: NewTodoFormValues,
        actions: FormikHelpers<NewTodoFormValues>
    ) => {
        try {
            const response = await api.post("/todolists", {
                ...values,
                deadline: values.deadline ? values.deadline.toISOString() : null,
            });

            if (response.status === 201) {
                setSuccessMessage("New task created! Please refresh the page.");
                setShowModal(false);
            } else {
                console.error("Failed to create a task:", response.data.message);
            }
        } catch (error) {
            console.error("Error occurred during task creation:", error);
        } finally {
            actions.resetForm();
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 relative group"
                title="Create Task"
            >
                +
                <span className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                    Create Task
                </span>
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, values }) => (
                                <Form>
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Title
                                        </label>
                                        <Field
                                            name="title"
                                            type="text"
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        />
                                        <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <Field
                                            name="description"
                                            as="textarea"
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                                            Difficulty
                                        </label>
                                        <Field
                                            name="difficulty"
                                            as="select"
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                        </Field>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                            Status
                                        </label>
                                        <Field
                                            name="status"
                                            as="select"
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="in-progress">In Progress</option>
                                            <option value="done">Done</option>
                                        </Field>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                                            Deadline
                                        </label>
                                        <DatePicker
                                            selected={values.deadline}
                                            onChange={(date) => setFieldValue("deadline", date)}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                                    >
                                        Create Task
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}

            {successMessage && (
                <div className="mt-4 p-2 bg-yellow-100 text-yellow-700 rounded-md">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default NewTodo;
