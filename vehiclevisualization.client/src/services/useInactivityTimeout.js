import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const useInactivityTimeout = (timeout = 600000) => {
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            localStorage.removeItem('Bearer ');
            localStorage.removeItem('RefreshToken');
            navigate('/401');
        }, timeout);
    };

    useEffect(() => {
        const handleActivity = () => {
            resetTimeout();
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('scroll', handleActivity);

        resetTimeout();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('scroll', handleActivity);
        };
    }, [navigate, timeout]);
};

export default useInactivityTimeout;