import { createContext, useState } from "react";
import { sendContactMessage } from "../service/contactApi";


export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const sendMessage = async (formData) => {
        setIsSubmitting(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await sendContactMessage(formData);
            setSuccessMessage("Mesajınız uğurla göndərildi!");
            return response;
        } catch (error) {
            console.error("Xəta baş verdi:", error);
            setErrorMessage("Mesaj göndərilərkən xəta baş verdi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ContactContext.Provider value={{ sendMessage, isSubmitting, successMessage, errorMessage }}>
            {children}
        </ContactContext.Provider>
    );
};
