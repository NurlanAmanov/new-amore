import React, { useState, useContext } from "react";
import { ContactContext } from "../../Context/ContactContext";

function CareerForm() {
    const { sendMessage, isSubmitting, successMessage, errorMessage } = useContext(ContactContext);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
      
        message: "",
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendMessage(formData);
        setFormData({ name: "", email: "", message: "" });
    };
    
    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="w-full">
                    <label className="block font-medium mb-2 text-gray-700" htmlFor="name">
                        Ad:
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="px-4 py-3 border border-gray-300 w-full outline-none rounded-lg focus:border-indigo-500"
                        id="name"
                        placeholder="Adınız"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="w-full">
                    <label className="block font-medium mb-2 text-gray-700" htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="px-4 py-3 border border-gray-300 w-full outline-none rounded-lg focus:border-indigo-500"
                        id="email"
                        placeholder="E-poçt ünvanınız"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            
            
            
            <div className="mb-6">
                <label className="block font-medium mb-2 text-gray-700" htmlFor="message">
                    Mesaj:
                </label>
                <textarea
                    name="message"
                    className="px-4 py-3 border border-gray-300 w-full outline-none rounded-lg focus:border-indigo-500 min-h-32"
                    id="message"
                    rows="5"
                    placeholder="Mesajınızı yazın..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            
            <button
                type="submit"
                className="inline-block w-full rounded-lg bg-indigo-600 px-6 py-4 font-medium text-white hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Göndərilir..." : "Göndər"}
            </button>
            
            {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
            {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
        </form>
    );
}

export default CareerForm;