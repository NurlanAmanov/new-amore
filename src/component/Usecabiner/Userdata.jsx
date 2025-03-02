import React from "react";
import { useAuth } from "../Context/Authlogin"; // 🔥 Auth kontekstini istifadə edirik

const Userdata = () => {
  const { user } = useAuth(); // 🔥 Login olmuş istifadəçi məlumatları

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">İstifadəçi Məlumatları</h2>

      {user ? (
        <div className="space-y-2">
          <p><strong>Ad:</strong> {user.firstName}</p>
          <p><strong>Soyad:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>İstifadəçi Adı:</strong> {user.username}</p>
        </div>
      ) : (
        <p className="text-gray-500">İstifadəçi məlumatları yüklənir...</p>
      )}
    </div>
  );
};

export default Userdata;
