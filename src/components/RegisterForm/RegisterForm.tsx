import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";


const initialValues = {
        email: '',
        password: '',
        password_check: ''
};

const RegisterForm = () => {
        const labelEmailId = useId();
        const labelPasswordId = useId();
        const labelPasswordCheckId = useId();

        const handleSubmit = (values, actions) => {
                alert(JSON.stringify(values, null, 2));
                actions.resetForm();
        }

        return (
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form className="w-full max-w-sm mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
                                <div className="mb-4">
                                        <label htmlFor={labelEmailId} className="block text-sm font-medium text-gray-700">
                                                Email
                                        </label>
                                        <Field
                                                name="email"
                                                type="email"
                                                id={labelEmailId}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage name="email" component="span" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className="mb-4">
                                        <label htmlFor={labelPasswordId} className="block text-sm font-medium text-gray-700">
                                                Password
                                        </label>
                                        <Field
                                                name="password"
                                                type="password"
                                                id={labelPasswordId}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage name="password" component="span" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className="mb-4">
                                        <Field
                                                name="password_check"
                                                type="password"
                                                id={labelPasswordCheckId}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage name="password_check" component="span" className="text-red-500 text-xs mt-1" />
                                </div>

                                <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                        Sign Up
                                </button>

                                <div className="mt-4 text-center">
                                        <p className="text-sm text-gray-600">
                                                You have an account?{" "}
                                                <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                        Login here
                                                </a>
                                        </p>
                                </div>
                        </Form>
                </Formik>
        );
}

export default RegisterForm;
