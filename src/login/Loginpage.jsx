import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authlogin";

function LoginPage({ toggleProfile }) {
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    UserNameOrEmail: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // İstifadəçi daxil olubsa, onları dashboard səhifəsinə yönləndir və modalı bağla
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
      toggleProfile();
    }
  }, [user, navigate, toggleProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Hər cəhd edildikdə əvvəlki səhvləri təmizləyin
    try {
      const response = await login(formData);
      if (response.error) {
        setError(response.error);
      } else if (response.token) {
        navigate("/dashboard"); // İstifadəçi daxil olduqda yönləndir
        toggleProfile(); // Modalı bağlayın
      }
    } catch (err) {
      setError("Giriş zamanı xəta baş verdi! Yanlış e-mail və ya şifrə.");
    }
  };

  return (
    <div id="modal-backdrop" className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-11/12 md:w-1/3 shadow-2xl relative">
        <MdClose onClick={toggleProfile} className="text-gray-800 text-2xl cursor-pointer absolute top-3 right-3" />
        <h3 className="text-xl font-semibold text-center mb-4">Daxil olun</h3>
        <form className="space-y-4" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">E-mail və ya İstifadəçi adı:</label>
            <input
              name="UserNameOrEmail"
              type="text"
              value={formData.UserNameOrEmail}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="E-mail və ya istifadəçi adınızı daxil edin"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Şifrə:</label>
            <input
              name="Password"
              type="password"
              value={formData.Password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Şifrənizi daxil edin"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Daxil ol
          </button>
          <div className="text-center">
            <Link
              to="/qeydiyyat"
              onClick={toggleProfile} // Yalnız bu linkə klikləndikdə modalı bağla
              className="text-blue-600 hover:underline"
            >
              Qeydiyyatdan keçin
            </Link>
            <span className="mx-2">|</span>
            <Link
              to="/Forgetpassword"
              onClick={toggleProfile} // Yalnız bu linkə klikləndikdə modalı bağla
              className="text-blue-600 hover:underline"
            >
              Şifrəni unutmusunuz?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;