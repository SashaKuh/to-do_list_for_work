import RegisterForm from '../../components/RegisterForm/RegisterForm';

const RegisterPage = () => {
        return (
                 <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Register</h1>
                        <RegisterForm />
                </div>
        );
}

export default RegisterPage;
