import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/Loginauth";


const AuthContextLogin = createContext();

export const CustomAuthProvider = ({ children }) => {  // ✅ Yeni ad: CustomAuthProvider
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token });
        } else {
          
        }
    }, []);

    const login = async (formData) => {
        try {

            
            const data = await loginUser(formData);
    
            if (data) {
                localStorage.setItem("token", data);
                setUser({ token: data });
              
                navigate("/");
            } else {
                throw new Error("Token qayt-arılmadı!");
            }
        } catch (error) {

            alert("Giriş zamanı xəta baş verdi!");
        }
    };
    
    const logout = () => {
        localStorage.removeItem("token"); // Tokeni sil
        setUser(null); // İstifadəçi məlumatını sıfırla
 
        navigate("/"); // Ana səhifəyə yönləndir
    };

    return (
        <AuthContextLogin.Provider value={{ user, login, logout }}>
            {children || <></>}
        </AuthContextLogin.Provider>
    );
};

// 🔥 `useAuth()` Hook-u
export const useAuth = () => {
    return useContext(AuthContextLogin);
};
