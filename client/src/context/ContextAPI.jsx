import { useState, createContext, useContext } from 'react'

export const ContextAPI = createContext();

export function ContextAPIProvider({ children }) {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('user-info')) || null);
    const [data, setData] = useState('');

    return <ContextAPI.Provider value={{ authUser, setAuthUser, data, setData }}>
        {children}
    </ContextAPI.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useContextAPI = () => {
    return useContext(ContextAPI);
}