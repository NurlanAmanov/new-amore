import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LIKESDATA } from '../../Context/LikeContext';

function Sevimli() {
  const [likedItems, setLikedItems] = useState([]);
  
  // Sevimli məhsulları çəkir
  const fetchFavoriteItems = async () => {
    try {
      const profileResponse = await axios.get(
        'https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const favorites = profileResponse.data.favoriteProducts || [];

      // Bütün məhsulları alırıq
      const productsResponse = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Product');
      const allProducts = productsResponse.data || [];

      // Yalnız sevimli məhsulları filtr edirik
      const filteredFavorites = allProducts.filter(product =>
        favorites.some(fav => fav.productId === product.id)
      );

      setLikedItems(filteredFavorites);
    } catch (error) {
      console.error('Sevimli məhsulları yükləmək xətası:', error);
    }
  };

  // Sevimli məhsulları komponent yüklənəndə çəkirik
  useEffect(() => {
    fetchFavoriteItems();
  }, []);

  // Toggle favorite: bu funksiya məhsul id-si əsasında API-ə müraciət edir
  const handleToggleFavorite = async (productId) => {
    try {
      const response = await axios.post(
        'https://finalprojectt-001-site1.jtempurl.com/api/FavoriteProduct/toggle',
        { productId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Product toggled:', response.data);
      // API cavabına əsasən, məhsul artıq sevimlilərdən çıxarılıbsa,
      // lokal likedItems state-dən də həmin məhsulu çıxarırıq
      setLikedItems(prev => prev.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Favorite toggle xətası:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Sevimlilər
      </h2>

      {likedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {likedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg w-full max-w-xs mx-auto shadow-md overflow-hidden p-4">
              <img
                src={`https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
                alt={item.title}
                className="w-full h-52 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
              <button
                onClick={() => handleToggleFavorite(item.id)}
                className="bg-red-500 text-white py-2 mt-2 w-full rounded-lg hover:bg-red-600 transition duration-200"
              >
                ❌ Sevimlilərdən sil
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg font-semibold text-center">
          Sevimlilərdə məhsul yoxdur.
        </p>
      )}
    </div>
  );
}

export default Sevimli;
