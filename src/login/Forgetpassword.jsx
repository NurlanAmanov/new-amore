import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Forgetpassword() {
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('Email', email);
    
        try {
            const response = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/Auth/ForgotPassword', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Success:', data);
    
            // Modal göstərmək və sonra yönləndirmək
            setShowModal(true); // Modalı göstər
            setTimeout(() => {
                // Yönləndirmə
                window.location.href = "/";
            }, 1000); // 1 saniyə sonra yönləndir
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending password reset email.');
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <h1 className="text-center text-2xl font-bold mb-6">Şifrəni Unutmuşam</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            E-poçt Ünvanı
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="E-poçt ünvanınızı daxil edin"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Şifrəni Sıfırla
                    </button>
                </form>
              
            </div>
            
            {/* Modal Component */}
            {showModal && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg" role="alert">
                   
                        <span className="block text-sm sm:inline">Şifrə sıfırlama  e-poçt ünvanınıza göndərildi.!</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Forgetpassword;
