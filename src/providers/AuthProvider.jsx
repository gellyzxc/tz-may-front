import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { privateApiInstance } from "../http-common";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null)
    const navigate = useNavigate();

    const login = async (data) => {
        setUser(data);
        localStorage.setItem('token', data.api_token)
        privateApiInstance.defaults.headers['authorization'] = `Bearer ${data.api_token}`
        window.location.reload();
    };

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};