import axios from "axios";

const BASE_URL = "https://finalprojectt-001-site1.jtempurl.com/api/Contact";

export const sendContactMessage = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("Name", formData.name);
    formDataToSend.append("Email", formData.email);
    formDataToSend.append("Comment", formData.message);

    try {
        const response = await axios.post(BASE_URL, formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data", // Backend multipart gözlədiyi üçün
            },
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("API ilə əlaqə qurulmadı.");
    }
};
