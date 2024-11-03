import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';

const Login = () => {
        const [isLoginSuccess, setIsLoginSuccess] = useState(false);

        const handleLoginSuccess = () => {
                setIsLoginSuccess(true);
        };

        if (isLoginSuccess) {
                return <Navigate to="/profile" replace />;
        }

        return (
                <div>
                        Login page
                        <LoginForm onSubmit={handleLoginSuccess} />
                </div>
        );
}

export default Login;
