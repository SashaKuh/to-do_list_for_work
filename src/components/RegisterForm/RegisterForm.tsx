import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup"; 
import { useId } from "react";
import { saveTokens } from "../../services/auth"; 
import { useNavigate } from "react-router-dom"; 
import { setAuthHeader } from "../../services/api";
import { registerUser } from "../../services/api"; 

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
}

const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
};

const RegisterForm = () => {
    const labelNameId = useId();
    const labelEmailId = useId();
    const labelPasswordId = useId();
    const navigate = useNavigate();

    const handleSubmit = async (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => {
        try {
            const data = await registerUser(values);

            saveTokens(data.accessToken, data.refreshToken);
            setAuthHeader(data.accessToken);

            navigate("/todolists");
        } catch (error) {
            console.error("Error occurred during registration:", error);
        }

        actions.resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="w-full max-w-sm mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
                    <div className="mb-4">
                        <label htmlFor={labelNameId} className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Field
                            name="name"
                            type="text"
                            id={labelNameId}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="name" component="span" className="text-red-500 text-xs mt-1" />
                    </div>

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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
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
            )}
        </Formik>
    );
};

export default RegisterForm;
