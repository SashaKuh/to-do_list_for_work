import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, removeTokens } from '../../services/auth';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = getAccessToken(); 

    const handleLogout = () => {
        removeTokens();
        navigate('/login'); 
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Task Manager</div>
            {token && (
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                >
                    Logout
                </button>
            )}
        </header>
    );
};

export default Header;
