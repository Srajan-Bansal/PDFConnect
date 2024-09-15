import axios from 'axios';
import { useState, createContext, useContext, useEffect } from 'react';
import URL from './../config';

export const ContextAPI = createContext();

const isTokenExpired = () => {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    if (!userInfo) return true;

    const { expiryDate } = userInfo;
    const currTime = new Date().getTime();
    return currTime > expiryDate;
};

export function ContextAPIProvider({ children }) {
    const [authUser, setAuthUser] = useState(() => {
        const userInfo = JSON.parse(localStorage.getItem('user-info'));
        return userInfo && !isTokenExpired() ? userInfo : null;
    });
    const [quill, setQuill] = useState(null);
    const [isExtracted, setIsExtracted] = useState(false);

    useEffect(() => {
        const validateSession = async () => {
            const userInfo = JSON.parse(localStorage.getItem('user-info'));

            if (!userInfo || isTokenExpired()) {
                localStorage.removeItem('user-info');
                setAuthUser(null);
                return;
            }

            try {
                const { data } = await axios.get(`${URL}/user/validate-session`, {
                    withCredentials: true
                });

                if (!data.valid) {
                    localStorage.removeItem('user-info');
                    setAuthUser(null);
                }

            } catch (error) {
                console.error('Session validation error:', error);
                localStorage.removeItem('user-info');
                setAuthUser(null);
            }
        };

        validateSession();
    }, []);

    return (
        <ContextAPI.Provider value={{ authUser, setAuthUser, quill, setQuill, isExtracted, setIsExtracted }}>
            {children}
        </ContextAPI.Provider>
    );
}

export const useContextAPI = () => useContext(ContextAPI);
