import { useState, createContext, useContext } from 'react'

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('user-info')) || null);

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
}
