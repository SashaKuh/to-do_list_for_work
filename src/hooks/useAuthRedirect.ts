import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../services/auth';

const useAuthRedirect = () => {
        const navigate = useNavigate();
        const location = useLocation();

        useEffect(() => {
                const token = getAccessToken();
                const isAuthPage = ['/login', '/register'].includes(location.pathname);

                if (token && isAuthPage) {
                        navigate('/todolists');
                }

                if (!token && !isAuthPage) {
                        navigate('/login');
                }
        }, [navigate, location.pathname]);
};

export default useAuthRedirect;
