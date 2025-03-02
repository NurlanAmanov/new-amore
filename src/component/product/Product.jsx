import React, { useContext, useState, useEffect, useCallback } from "react";
import { DATA } from "../../Context/Datacontext";
import { BASKET } from "../../Context/BasketContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LIKESDATA } from "../../Context/LikeContext";

function Product() {
  const { mehsul } = useContext(DATA);
  const { bassketadd } = useContext(BASKET);
  const { toggleLike } = useContext(LIKESDATA);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const categoryName = searchParams.get("category");

  // Filter məhsulları
  useEffect(() => {
    const filtered = mehsul.filter((item) => {
      return (!categoryName || item.categoryName === categoryName) &&
             (!minPrice || Number(item.price) >= Number(minPrice)) &&
             (!maxPrice || Number(item.price) <= Number(maxPrice));
    });
    
    setFilteredProducts(filtered);
  }, [mehsul, categoryName, minPrice, maxPrice]);

  const handleFilter = useCallback(() => {
    console.log("Filter applied:", { minPrice, maxPrice });
    // Burada əlavə əməliyyatlar yer ala bilər
  }, [minPrice, maxPrice]);

  return (
    <>
      <div className="bg-[#F2F2F2] flex items-center justify-center h-[90px] pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-medium text-center text-black mb-10 font-playfair tracking-widest">
            {categoryName || "Bütün Kateqoriyalar"}
          </h2>
        </div>
      </div>

      <div className="container mx-auto mt-20">
        <div className="flex flex-col xl:flex-row">
          <div className="xl:w-3/12 w-full p-4">
            <div className="mb-4">
              <label className="block font-medium text-lg">Qiymət ▼</label>
              <div className="flex gap-5">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="mt-2 block w-full p-2 border rounded" 
                  value={minPrice} 
                  onChange={(e) => setMinPrice(e.target.value)} 
                />
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="mt-2 block w-full p-2 border rounded" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(e.target.value)} 
                />
              </div>
              <button 
                className="w-full mt-3 bg-[#d9d9d9] text-black py-2 rounded hover:bg-[#DB9457] hover:text-[#f7f7f7] transition-colors duration-500" 
                onClick={handleFilter}
              >
                Filter
              </button>
            </div>
          </div>

          <ProductList
            filteredProducts={filteredProducts}
            toggleLike={toggleLike}
            bassketadd={bassketadd}
            navigate={navigate}
          />
        </div>
      </div>
    </>
  );
}

function ProductList({ filteredProducts, bassketadd, toggleLike, navigate }) {
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder]);

  const sortedProducts = React.useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOrder === "low-to-high") {
        return a.price - b.price;
      } else if (sortOrder === "high-to-low") {
        return b.price - a.price;
      }
      return 0;
    });
  }, [filteredProducts, sortOrder]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleProductClick = useCallback((id) => {
    navigate(`/ProductDetail/${id}`);
  }, [navigate]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  if (filteredProducts.length === 0) {
    return (
      <div className="xl:w-9/12 w-full p-4">
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">Bu filtrlərə uyğun məhsul tapılmadı.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:w-9/12 w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          {filteredProducts.length} məhsul tapıldı
        </div>
        <select
          className="text-black p-2 rounded-md border border-gray-950"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          aria-label="Məhsulları sırala"
        >
          <option value="default">Varsayılan</option>
          <option value="low-to-high">Azdan Çoxa</option>
          <option value="high-to-low">Çoxdan Aza</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto xl:grid-cols-3 gap-4">
        {paginatedProducts.map((item) => (
          <ProductCard 
            key={item.id}
            item={item}
            onProductClick={handleProductClick}
            onToggleLike={toggleLike}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

function ProductCard({ item, onProductClick, onToggleLike }) {
  const { likedItems } = useContext(LIKESDATA);
  const isLiked = likedItems.some(like => like.id === item.id);
  
  const handleLikeClick = (e) => {
    e.stopPropagation(); // Kartın yönləndirməsini əngəlləyir
    const product = {
      id: item.id,
      title: item.title,
      about: item.about,
      imgUrl: `https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`,
      description: item.description,
      price: item.price,
      finalPrice: item.finalPrice
    };
    onToggleLike(product);
  };

  return (
    <div className="relative bg-[#b5b5b5] rounded-lg shadow-md overflow-hidden lg:w-[280px] hover:shadow-lg transition-shadow duration-300">
      <div 
        className="relative w-full h-[330px] cursor-pointer" 
        onClick={() => onProductClick(item.id)}
      >
        {item.discount && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-[15px] font-[Playfair Display] px-2 py-1 rounded-br-lg z-10">
            %{item.discount}
          </div>
        )}
        <img
          src={`https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
          alt={item.title}
          className="absolute top-0 left-0 w-full lg:w-[280px] lg:h-[330px] h-full object-cover"
          loading="lazy"
        />
        <button
          onClick={handleLikeClick}
          className={`absolute top-[10px] right-[10px] shadow-lg p-1 pr-3 pl-3 rounded-full border-2 border-white transition-all duration-300 z-10 ${
            isLiked ? "bg-red-500 text-white" : "bg-transparent text-white hover:bg-[#DB9457]"
          }`}
          style={{ fontSize: "20px" }}
          aria-label="Sevimlilərə əlavə et"
        >
          ♥
        </button>
      </div>
      <div className="relative w-full p-2 text-center">
        <h2
          className="text-lg font-normal text-black tracking-wide"
          style={{ fontFamily: 'Playfair Display' }}
        >
          {item.title}
        </h2>
        <div className="text-[#fff] text-lg font-medium text-center">
          {item.finalPrice}₼
        </div>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#333] text-white hover:bg-[#555]"}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Əvvəlki səhifə"
      >
        ←
      </button>
      
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded-md ${currentPage === page + 1 ? "bg-[#DB9457] text-white" : "bg-[#333] text-white hover:bg-[#555]"}`}
          onClick={() => onPageChange(page + 1)}
          aria-label={`Səhifə ${page + 1}`}
        >
          {page + 1}
        </button>
      ))}
      
      <button
        className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[#333] text-white hover:bg-[#555]"}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Növbəti səhifə"
      >
        →
      </button>
    </div>
  );
}

export default Product;
