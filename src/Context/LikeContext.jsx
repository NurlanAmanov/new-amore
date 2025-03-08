import React, { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const LIKESDATA = createContext(null);

function LikeContext({ children }) {
  const cook = new Cookies();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // **Cookie-dən sevimliləri götür, əgər boşdursa `[]` qoy**
  const [likedItems, setLikedItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  // **Səhifə yüklənəndə cookiedən `likedItems` oxu**
  useEffect(() => {
    const storedLikes = cook.get("likes");
    if (storedLikes && Array.isArray(storedLikes)) {
      setLikedItems(storedLikes);
    }
  }, []);

  // **Məhsulu Sevimlilərə əlavə et və ya çıxar**
  function toggleLike(product) {
    if (!token) {
      // Set the alert message
      setAlertMessage("Sevimlilərə məhsul əlavə etmək üçün əvvəlcə daxil olun!");
      
      // Set a timeout to redirect after 3 seconds
      setTimeout(() => {
        setAlertMessage(null); // Clear the alert message
        navigate("/login"); // Navigate to login page after 3 seconds
      }, 3000);
      
      return;
    }

    setLikedItems((prevLikes) => {
      let updatedLikes;

      const existingProductIndex = prevLikes.findIndex((item) => item.id === product.id);
      if (existingProductIndex !== -1) {
        updatedLikes = prevLikes.filter((item) => item.id !== product.id);
      } else {
        updatedLikes = [...prevLikes, product];
        // API-a məhsulun ID-ni göndər
        fetch('https://finalprojectt-001-site1.jtempurl.com/api/FavoriteProduct/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId: product.id })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Məhsul sevimlilərə əlavə edildi:', data);
        })
        .catch((error) => {
          console.error('Xəta baş verdi:', error);
        });
      }

      cook.set("likes", updatedLikes, {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000),
      });

      return updatedLikes;
    });
  }

  // **Məhsulu sevimlilərdən çıxarma funksiyası**
  function likeRemove(id) {
    setLikedItems((prevLikes) => {
      const updatedLikes = prevLikes.filter((item) => item.id !== id);
      cook.set("likes", updatedLikes, { path: "/" });
      return updatedLikes;
    });
  }

  console.log("Cari sevimlilər:", likedItems); // ✅ Konsolda sevimlilərin içini yoxla

  return (
    <LIKESDATA.Provider value={{ likedItems, toggleLike, likeRemove, alertMessage }}>
      {alertMessage && (
              <div className="p-4 absolute top-[40%] left-[40%] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Əziz istifadəçi</span> {alertMessage}
            </div>
      )}
      {children}
    </LIKESDATA.Provider>
  );
}

export default LikeContext;