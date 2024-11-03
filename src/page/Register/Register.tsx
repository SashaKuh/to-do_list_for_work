import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';

const Register = () => {
        const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

        const handleRegisterSuccess = () => {
                setIsRegisterSuccess(true)
        }

        if (isRegisterSuccess) {
                return <Navigate to='/profile' replace />
        }

        return (
                <div>
                        Register page
                        <RegisterForm onSubmit={handleRegisterSuccess}/>
                </div>
        );
}

export default Register;
