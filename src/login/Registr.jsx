import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        userName: "",
        email: "",
        dob: "",
        ImgUrl: "", // Burada imgUrl-in dəyərini avtomatik əlavə edəcəyik
        gender: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Şifrələr uyğun gəlmir!");
            return;
        }

        try {
            // Avtomatik imgUrl əlavə edirik
            const defaultImgUrl = "/Uploads/profilphoto/28a96018-5599-47df-a026-2c8584ebc1d7default-avatar-profile-icon-grey-photo-placeholder-99724602.webp";
            formData.ImgUrl = defaultImgUrl;

            const form = new FormData();
            form.append("Name", formData.name);
            form.append("Surname", formData.surname);
            form.append("UserName", formData.userName);
            form.append("Email", formData.email);
            form.append("DateOfBirth", formData.dob);
            form.append("Gender", formData.gender);
            form.append("Password", formData.password);
            form.append("ConfirmPassword", formData.confirmPassword);
            form.append("ImgUrl", formData.ImgUrl); // imgUrl əlavə edirik

            const response = await axios.post(
                "https://finalprojectt-001-site1.jtempurl.com/api/Auth/Register",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Qeydiyyat uğurla tamamlandı!");
            navigate("/"); // Qeydiyyatdan sonra ana səhifəyə yönləndirmək
        } catch (error) {
            alert(`Xəta baş verdi: ${error.response?.data || "Bilinməyən xəta"}`);
        }
    };

    return (
        <section className="py-10 bg-gray-100 flex justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-center text-xl font-bold mb-4">Qeydiyyat</h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <input
                        name="name"
                        type="text"
                        placeholder="Ad"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="surname"
                        type="text"
                        placeholder="Soyad"
                        value={formData.surname}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="userName"
                        type="text"
                        placeholder="İstifadəçi adı"
                        value={formData.userName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Cinsiyyət seçin</option>
                        <option value="Kişi">Kişi</option>
                        <option value="Qadın">Qadın</option>
                    </select>
                    <input
                        name="password"
                        type="password"
                        placeholder="Şifrə"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Şifrəni təsdiqləyin"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        Qeydiyyatdan keç
                    </button>
                </form>
            </div>
        </section>
    );
}

export default RegisterPage;
