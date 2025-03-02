import { createContext, useContext, useState } from "react";
import { registerUser as apiRegisterUser } from "../service/authApi"; // API faylından import edirik

const AuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // 🔥 Qeydiyyat funksiyası
    const registerUser = async (formData) => {
        try {
            const result = await apiRegisterUser(formData); // API-dən qeydiyyat çağırışı

            if (result.success) {
                setUser(result.data); // İstifadəçini context-ə yazırıq

                // 🔥 Əgər token varsa, yadda saxla
                if (result.data.token) {
                    localStorage.setItem("token", result.data.token);
                }

                return { success: true, message: "Qeydiyyat uğurla tamamlandı!" };
            } else {
                return { success: false, message: result.message || "Qeydiyyat zamanı xəta baş verdi!" };
            }
        } catch (error) {
            console.error("Qeydiyyat xətası:", error);
            return { success: false, message: "Şəbəkə xətası və ya server problemi!" };
        }
    };

    return (
        <AuthContext.Provider value={{ user, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// 🔥 `useAuth` Hook-u
export const useAuth = () => {
    return useContext(AuthContext);
};
