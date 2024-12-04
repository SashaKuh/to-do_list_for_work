import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../../services/auth";
import { setAuthHeader } from "../../services/api";
import * as Yup from "yup";
import { loginUser } from "../../services/api"; 

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const labelEmailId = useId();
    const labelPasswordId = useId();

    const initialValues: LoginFormValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required")
    });

    const handleSubmit = async (
        values: LoginFormValues, 
        actions: FormikHelpers<LoginFormValues>
    ) => {
        const { email, password } = values;

        const { success, data, message } = await loginUser({ email, password });

        console.log(success);
        console.log(data);
        if (success) {
            saveTokens(data.accessToken, data.refreshToken);
            setAuthHeader(data.accessToken);
            
            navigate("/todolists");
        } else {
            actions.setFieldError("password", message || "Login failed");
        }

        actions.setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <div className="mb-4">
                        <label htmlFor={labelEmailId} className="block text-gray-700 mb-2">
                            Email
                        </label>
                        <Field
                            type="email"
                            name="email"
                            id={labelEmailId}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor={labelPasswordId} className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <Field
                            type="password"
                            name="password"
                            id={labelPasswordId}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="text-blue-600 hover:underline"
                            >
                                Register here
                            </a>
                        </p>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
