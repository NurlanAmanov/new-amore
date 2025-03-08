import React, { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BASKET = createContext(null);

function BasketContext({ children }) {
  const cook = new Cookies();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [sebet, setSebet] = useState([]);
  const [userId, setUserId] = useState(null);
  const [orderMessage, setOrderMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null); // Add state for alert message

  // 🔹 **İstifadəçi ID-ni `Auth/profile` API-dən çəkmək və yadda saxlamaq**
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data && response.data.id) {
          setUserId(response.data.id);
        } else {
          throw new Error("İstifadəçi ID tapılmadı!");
        }
      } catch (error) {
        console.error("İstifadəçi məlumatı yüklənmədi:", error);
      }
    };

    if (token) {
      fetchUserId();
    }
  }, [token]);

  // 🔹 **Sebeti cookie-dən oxumaq**
  useEffect(() => {
    const storedSebet = cook.get("sebet");
    if (storedSebet) {
      setSebet(storedSebet);
    }
  }, []);

  // 🔹 **Səbəti `Order/create` API-yə göndərir və Order ID alır.**
  const sendToOrderAPI = async () => {
    if (!userId || sebet.length === 0) {
      setOrderMessage("❌ İstifadəçi ID tapılmadı və ya səbət boşdur!");
      return null;
    }

    setLoading(true);

    const productIds = sebet.map((item) => item.id);

    const orderData = new FormData();
    orderData.append("ImgUrl", "string"); // Əgər real img URL varsa, onu yaz
    orderData.append("Title", "string"); // Məhsul başlığını uyğunlaşdıra bilərik
    orderData.append("Price", sebet.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0));
    orderData.append("Discount", "0");
    orderData.append("AppUserId", userId); // Burada user ID istifadə edirik

    // **Məhsul ID-lərini FormData-ya əlavə etmək**
    productIds.forEach((id) => orderData.append("ProductIds", id));

    try {
      const response = await axios.post(
        "https://finalprojectt-001-site1.jtempurl.com/api/Order/create",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Səbət Order API-yə uğurla göndərildi:", response.data);
      setOrderMessage(`✅ Order yaradıldı! Order ID: ${response.data.id}`);

      // 🔹 **Səbəti təmizlə**
      clearBasket();

      return response.data.id;
    } catch (error) {
      console.error("❌ Order API-yə məhsul göndərərkən xəta:", error);
      setOrderMessage("❌ Order göndərilmədi, xahiş olunur təkrar yoxlayın!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 **Səbətə məhsul əlavə etmək**
  function bassketadd(title, about, id, imgUrl, price, discount, finalPrice, selectedSize, quantity) {
    if (!token) {
      // Set the alert message
      setAlertMessage("Səbətə məhsul əlavə etmək üçün əvvəlcə daxil olun!");
      
      // Set a timeout to redirect after 3 seconds
      setTimeout(() => {
        setAlertMessage(null); // Clear the alert message
        navigate("/login"); // Navigate to login page after 3 seconds
      }, 3000);
      
      return;
    }

    setSebet((prevSebet) => {
      let newSebet = [...prevSebet];

      const existingProductIndex = newSebet.findIndex((item) => item.id === id);
      if (existingProductIndex !== -1) {
        newSebet[existingProductIndex] = {
          ...newSebet[existingProductIndex],
          quantity: newSebet[existingProductIndex].quantity + quantity,
        };
      } else {
        newSebet.push({ title, about, id, imgUrl, price, discount, finalPrice, selectedSize, quantity });
      }

      cook.set("sebet", newSebet, {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000),
      });

      return newSebet;
    });
  }

  // BasketContext.js faylında əlavə ediləcək funksiya
  function removeFromBasket(id) {
    setSebet((prevSebet) => {
      const newSebet = prevSebet.filter((item) => item.id !== id);
      
      // Cookie-ni yeniləyirik
      if (newSebet.length > 0) {
        cook.set("sebet", newSebet, {
          path: "/",
          expires: new Date(Date.now() + 86400 * 1000),
        });
      } else {
        cook.remove("sebet", { path: "/" });
      }
      
      return newSebet;
    });
  }

  // 🔹 **Səbəti təmizləmək**
  function clearBasket() {
    setSebet([]);
    cook.remove("sebet", { path: "/" });
  }

  return (
    <BASKET.Provider value={{ sebet, bassketadd, sendToOrderAPI, clearBasket, orderMessage, loading, removeFromBasket, alertMessage }}>
      {alertMessage && (
        <div className="p-4 absolute top-[40%] left-[40%] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">Əziz istifadəçi</span> {alertMessage}
        </div>
      )}
      {children}
    </BASKET.Provider>
  );
}

export default BasketContext;