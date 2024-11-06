import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
        return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
                        <LoginForm />
                </div>
        );
}

export default LoginPage;
