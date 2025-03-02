import axios from "axios";

const BASE_URL = "https://finalprojectt-001-site1.jtempurl.com/api/Auth";

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/Register`,
            {
                Name: formData.name,
                Surname: formData.lname,
                UserName: formData.userName,
                Email: formData.email,
                DateOfBirth: formData.dob,
                Gender: formData.gender,
                Password: formData.password,
                ConfirmPassword: formData.cpassword,
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || "Xəta baş verdi!" };
    }
};
