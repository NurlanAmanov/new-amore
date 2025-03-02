import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    // ✅ URL-dən email və tokeni götür
    const emailFromUrl = queryParams.get('email');
    const tokenFromUrl = queryParams.get('token');

    // 🔹 State-lər
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // ✅ Tokeni decode etmək və State-ə yazmaq
    useEffect(() => {
        if (emailFromUrl && tokenFromUrl) {
            setEmail(emailFromUrl);
            setToken(decodeURIComponent(tokenFromUrl)); // 🔥 Token decode edilir
        }
    }, [emailFromUrl, tokenFromUrl]);

    // ✅ Şifrə dəyişmə formunu idarə edən funksiya
    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        if (name === 'newPassword') setNewPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
    };

    // ✅ Şifrəni yeniləmək üçün API çağırışı
    const handleSubmit = async (event) => {
        event.preventDefault();

        // 🔹 Şifrələri yoxlayırıq
        if (newPassword !== confirmPassword) {
            setError('Şifrəni təsdiq edin!');
            return;
        }

        try {
            // ✅ `fetch` vasitəsilə API çağırışı
            const response = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/Auth/ResetPassword', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    token,
                    newPassword,
                    confirmPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('🚨 Server Xətası:', errorData);
                throw new Error(errorData.message || 'Şifrə sıfırlanarkən xəta baş verdi.');
            }

            const data = await response.json();
            console.log('✅ Şifrə sıfırlandı:', data);
            setSuccess('Şifrə uğurla sıfırlandı! İndi yenidən daxil olun.');
            setError('');

            // 🔥 3 saniyə sonra `login` səhifəsinə yönləndiririk
            setTimeout(() => {
                navigate('/login');
            }, 3000);
            
        } catch (error) {
            console.error('🚨 Xəta:', error);
            setError(`Xəta baş verdi: ${error.message}`);
            setSuccess('');
        }
    };

    return (
        <div className="min-h-screen py-[100px] bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <h1 className="text-center text-2xl font-bold mb-6">Şifrəni Sıfırlayın</h1>
                
                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
                {success && <div className="mb-4 text-green-500 text-center">{success}</div>}
                
                <form onSubmit={handleSubmit}>
                    {/* 🔹 Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            type="email"
                            value={email}
                            readOnly
                            required
                        />
                    </div>

                    {/* 🔹 Token */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Token</label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            type="text"
                            value={token}
                            readOnly
                            required
                        />
                    </div>

                    {/* 🔹 Yeni Şifrə */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Yeni Şifrə</label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            type="password"
                            name="newPassword"
                            placeholder="Yeni şifrənizi daxil edin"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    {/* 🔹 Şifrəni Təsdiq Et */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Şifrəni Təsdiq Edin</label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            type="password"
                            name="confirmPassword"
                            placeholder="Şifrənizi təsdiq edin"
                            value={confirmPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    {/* 🔹 Göndər düyməsi */}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Şifrəni Sıfırlayın
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
