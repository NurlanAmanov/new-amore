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
        ImgUrl: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });
    
    // Xəta mesajları üçün state əlavə edirik
    const [errors, setErrors] = useState({
        passwordMatch: "",
        userName: "",
        general: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
        // İstifadəçi yeni dəyər daxil etdikdə uyğun xəta mesajını təmizləyirik
        if (e.target.name === "userName") {
            setErrors({ ...errors, userName: "" });
        } else if (e.target.name === "password" || e.target.name === "confirmPassword") {
            setErrors({ ...errors, passwordMatch: "" });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Xəta mesajlarını təmizləyək
        setErrors({
            passwordMatch: "",
            userName: "",
            general: ""
        });

        if (formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, passwordMatch: "Şifrələr uyğun gəlmir!" });
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
            form.append("ImgUrl", formData.ImgUrl);

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
            navigate("/");
        } catch (error) {
            // API-dən gələn xətanın məzmununu analiz edirik
            const errorMessage = error.response?.data || "Belə bir istifadəçi artıq mövcuddur! ";
            
            // Əgər xəta mesajında "UserName" sözü varsa, istifadəçi adı ilə bağlı xətadır
            if (typeof errorMessage === 'string' && errorMessage.includes("UserName")) {
                setErrors({ ...errors, userName: "Bu istifadəçi adı artıq istifadə olunub" });
            } else {
                // Digər xətalar üçün ümumi xəta mesajı göstəririk
                setErrors({ ...errors, general: `Diqqət: ${errorMessage}` });
            }
        }
    };

    return (
        <section className="py-10 bg-gray-100 flex justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-center text-xl font-bold mb-4">Qeydiyyat</h2>
                
                {/* Ümumi xəta mesajı */}
                {errors.general && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded border border-red-300">
                        {errors.general}
                    </div>
                )}
                
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <input
                            name="name"
                            type="text"
                            placeholder="Ad"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <input
                            name="surname"
                            type="text"
                            placeholder="Soyad"
                            value={formData.surname}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <input
                            name="userName"
                            type="text"
                            placeholder="İstifadəçi adı"
                            value={formData.userName}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.userName ? "border-red-500" : ""}`}
                            required
                        />
                        {errors.userName && (
                            <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                        )}
                    </div>
                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <input
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Şifrə"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.passwordMatch ? "border-red-500" : ""}`}
                            required
                        />
                    </div>
                    <div>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Şifrəni təsdiqləyin"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.passwordMatch ? "border-red-500" : ""}`}
                            required
                        />
                        {errors.passwordMatch && (
                            <p className="text-red-500 text-sm mt-1">{errors.passwordMatch}</p>
                        )}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Qeydiyyatdan keç
                    </button>
                </form>
            </div>
        </section>
    );
}

export default RegisterPage;