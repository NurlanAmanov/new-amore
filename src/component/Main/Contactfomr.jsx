import React, { useState, useContext } from "react";
import { ContactContext } from "../../Context/ContactContext";


function ContactForm() {
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
        <form onSubmit={handleSubmit} className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-full lg:px-6">
            <div className="mb-3 w-full">
                <label className="block font-medium mb-[2px] text-teal-700" htmlhtmlFor="name">
                    Ad:
                </label>
                <input
                    type="text"
                    name="name"
                    className="px-2 py-2 border w-full outline-none rounded-md"
                    id="name"
                    placeholder="Ad"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3 w-full">
                <label className="block font-medium mb-[2px] text-teal-700" htmlhtmlFor="email">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    className="px-2 py-2 border w-full outline-none rounded-md"
                    id="email"
                    placeholder="E-poçt ünvanınız"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3 w-full">
                <label className="block font-medium mb-[2px] text-teal-700" htmlhtmlFor="message">
                    Mesaj:
                </label>
                <textarea
                    name="message"
                    className="px-2 py-2 border rounded-[5px] w-full outline-none"
                    id="message"
                    placeholder="Mesajınızı yazın..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                className="mb-6 inline-block w-full rounded bg-teal-400 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-teal-500"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Göndərilir..." : "Göndər"}
            </button>

            {successMessage && <p className="text-green-600">{successMessage}</p>}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </form>
    );
}

export default ContactForm;
