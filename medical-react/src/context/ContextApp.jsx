import { createContext, useContext, useState } from 'react';

const ContextApp = createContext();

export function ContextAppProvider({ children }) {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState(null);

    const setTokenLocalStorage = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    }

    const setRoleLocalStorage = (newRole) => {
        setRole(newRole);
        localStorage.setItem("role", newRole);
    }

    const setEmailLocalStorage = (newEmail) => {
        setEmail(newEmail);
        localStorage.setItem("email", newEmail);
    }


    return (
        <ContextApp.Provider value={{
            token, setTokenLocalStorage, 
            role, setRoleLocalStorage,
            email, setEmailLocalStorage
        }}>
            {children}
        </ContextApp.Provider>
    );
}

export function useContextApp() {
    return useContext(ContextApp);
}