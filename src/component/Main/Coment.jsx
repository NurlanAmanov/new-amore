import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoStar, IoStarOutline, IoTrash } from "react-icons/io5"; // Ulduz və silmə ikonları
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function Coment({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");

  // 🔹 İstifadəçi məlumatlarını `Auth/profile` API-dən çəkmək
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          setUserName(response.data.userName);
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error("İstifadəçi məlumatları yüklənmədi:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  // 🔹 Məhsulun `ID`-sinə görə `Review` API-dən şərhləri çəkmək
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://finalprojectt-001-site1.jtempurl.com/api/Review/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setReviews(response.data);
      } catch (error) {
        setError("Şərhləri yükləmək mümkün olmadı.");
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  // 🔹 Yeni şərh əlavə etmək
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !token || !userInfo) {
      setError("Şərh yazmaq üçün daxil olun.");
      return;
    }

    const formDataPayload = new FormData();
    formDataPayload.append("ProductId", productId);
    formDataPayload.append("UserId", userInfo.id);
    formDataPayload.append("UserName", userName);
    formDataPayload.append("Rating", rating);
    formDataPayload.append("Comment", comment);

    try {
      const response = await axios.post(
        "https://finalprojectt-001-site1.jtempurl.com/api/Review",
        formDataPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setReviews([...reviews, response.data]);
      setComment("");
      setRating(5);
      setSuccessMessage("Şərh uğurla əlavə edildi!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Review post error:", error.response?.data || error.message);
      setError("Şərh əlavə edilərkən xəta baş verdi.");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  // 🔹 Şərhi silmək
  // Diqqət: Swagger-ə əsasən => DELETE /api/Review/{reviewId}/{userName}
  const handleDeleteComment = async (reviewId, reviewUserName) => {
    if (!token) {
      setError("Şərh silmək üçün daxil olun.");
      return;
    }

    try {
      await axios.delete(
        `https://finalprojectt-001-site1.jtempurl.com/api/Review/${reviewId}/${reviewUserName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReviews(reviews.filter(review => review.id !== reviewId));
      setSuccessMessage("Şərh uğurla silindi!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Şərh silinmədi:", error);
      setError("Şərh silinərkən xəta baş verdi.");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h2 className="text-3xl font-light tracking-wider text-center font-playfair">Rəylər</h2>

      {userName && (
        <form className="mt-4 mb-12" onSubmit={handleCommentSubmit}>
          <h3 className="text-lg font-light font-playfair">Şərh əlavə et</h3>

          <textarea
            className="w-full border p-2 mt-2 rounded-lg"
            placeholder="Rəy əlavə et"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex items-center mt-1">
            <button
              type="submit"
              className="mt-2 border border-black text-black px-8 py-2 hover:bg-[#DB9457] hover:text-white transition-all duration-600"
            >
              Göndər
            </button>

            <div className="flex ml-5 mt-3">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="focus:outline-none"
                >
                  {i < rating ? (
                    <IoStar className="text-yellow-500 text-2xl" />
                  ) : (
                    <IoStarOutline className="text-gray-400 text-2xl" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </form>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.id}
            className="border-b pb-2 mt-2 flex items-start justify-start flex-col sm:flex-row"
          >
            {/* Profil şəkli və istifadəçi adı */}
            <div className="flex flex-col lg:items-center justify-start w-full sm:w-auto sm:mr-4">
              {review.imgUrl ? (
                <img
                  src={`https://finalprojectt-001-site1.jtempurl.com${review.imgUrl}`}
                  alt="Profile"
                  className="w-[70px] h-[70px] object-cover rounded-full"
                />
              ) : userInfo && userInfo.imgUrl ? (
                <img
                  src={`https://finalprojectt-001-site1.jtempurl.com${userInfo.imgUrl}`}
                  alt="Profile"
                  className="w-[70px] h-[70px] object-cover rounded-full"
                />
              ) : (
                <img
                  src="/default-profile.png"
                  alt="Default Profile"
                  className="w-[70px] h-[70px] object-cover rounded-full"
                />
              )}

              {/* İsim kısmı fotoğrafın altına yerleştirildi */}
              <p className="font-semibold mt-2 mr-3">{review.userName}</p>
            </div>
            {/* Rəy, reytinq ulduzları və silmə düyməsi */}
            <div className="flex flex-col w-full sm:w-[calc(100%-60px)]">
              <div className="flex justify-between items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) =>
                    i < review.rating ? (
                      <IoStar key={i} className="text-yellow-500" />
                    ) : (
                      <IoStarOutline key={i} className="text-gray-400" />
                    )
                  )}
                </div>
                
                {/* Sil düyməsi - yalnız öz şərhini silə bilsin deyə yoxlama */}
                {userInfo && userInfo.userName === review.userName && (
                  <button
                    onClick={() => handleDeleteComment(review.id, review.userName)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    title="Şərhi sil"
                  >
                    <MdDelete size={18} />
                  </button>
                )}
              </div>

              <p className="text-gray-700 mt-1">{review.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Bu məhsula hələ şərh yazılmayıb.</p>
      )}
    </div>
  );
}

export default Coment;
