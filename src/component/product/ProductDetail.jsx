import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoStarSharp, IoStarOutline } from "react-icons/io5"; // Ulduz ikonları
import { CiHeart } from "react-icons/ci";
import { BASKET } from "../../Context/BasketContext";
import Coment from "../Main/Coment";

const ProductDetail = () => {
  const { id } = useParams(); // Məhsulun ID-si
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Orta");
  const [quantity, setQuantity] = useState(1);
  const { bassketadd } = useContext(BASKET);
  const [commentsCount, setCommentsCount] = useState(0); // Şərhlərin sayını saxlamaq üçün state
  const [averageRating, setAverageRating] = useState(0);  // Orta reytinq

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Məhsul məlumatlarını çəkir
        const productResponse = await axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Product/${id}`);
        setProduct(productResponse.data);
        if (productResponse.data && productResponse.data.sizes && productResponse.data.sizes.length > 0) {
          setSelectedSize(productResponse.data.sizes[0]);
        }

        // Şərhlərin sayını çəkir
        const reviewCountResponse = await axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Review/${id}`);
        setCommentsCount(reviewCountResponse.data.length);

        // Orta reytinqi çəkir
        const ratingResponse = await axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Review/${id}/average`);
        setAverageRating(ratingResponse.data.averageRating); // Orta reytinqi alırıq
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };

    fetchData();
  }, [id]);

  // Reytinqi ulduzlarla göstərmək üçün funksiya
  const renderStars = (rating) => {
    let stars = [];
    const fullStars = Math.floor(rating); // Tam ulduzları göstər
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Yarım ulduz varsa
    const emptyStars = 5 - fullStars - halfStars; // Boş ulduzların sayı

    // Dolu ulduzları göstər
    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStarSharp key={i} className="text-yellow-500" />);
    }

    // Yarım ulduz varsa göstər
    if (halfStars === 1) {
      stars.push(<IoStarSharp key="half" className="text-yellow-500" />);
    }

    // Boş ulduzları göstər
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<IoStarOutline key={`empty-${i}`} className="text-gray-400" />);
    }

    return stars;
  };

  if (!product) {
    return <div>Loading product...</div>;
  }
  const handleLikeClick = (e) => {
    e.stopPropagation(); // Kartın yönləndirməsini əngəlləyir
    // toggleLike funksiyasını çağıraraq məhsulu sevimlilərə əlavə / çıxar edirik
    toggleLike({
      id: product.id,
      title: product.title,
      about: product.about,
      imgUrl: `https://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`,
      description: product.description,
      price: product.price,
      finalPrice: product.finalPrice,
    });
  };
  return (
    <div className="xl:max-w-12xl w-[95%] mx-auto py-4 xl:p-6 mt-20">
      <div className="flex gap-10 xl:flex-row flex-col w-full justify-center items-center">
        <div className="xl:w-1/3 w-[90%] mx-auto relative">
          <img
            src={`http://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`}
            alt={product.title}
            className="lg:w-[504px] w-[90%] mx-auto lg:h-[589px] object-cover rounded-lg"
          />
        </div>
        <div className="xl:w-2/3 w-[95%] mx-auto">
{product.discount > 0 ? (
 <span className="bg-red-500 text-white text-[15px] font-playfair px-4 py-1">{product.discount} % </span>
) : ''
}
          <h1 className="text-5xl font-light font-playfair mt-[10px]">{product.title}</h1>
          <div className="flex items-center mt-6 mb-3">
            {renderStars(averageRating)}  {/* Orta reytinqi ulduzlarla göstər */}
            <span className="text-gray-500 text-[14px] ml-3 font-poppins font-light">
              <u>{commentsCount}</u> reviews
            </span>
          </div>
          <hr />
          <div className="mt-2 text-lg font-semibold">
{
  product.discount > 0 ? (
<>
    <span className="text-black text-3xl font-poppins font-normal">{product.finalPrice}₼</span>
    <span className="line-through text-gray-400 ml-2 text-xl">{product.price}₼</span>
</>
  
  ) :
  (    <span className="text-black text-3xl font-poppins font-normal">{product.price}₼</span>)

}
          </div>
          <p className="text-gray-600 mt-6 mb-6 text-[16px] font-medium">{product.description}</p>
          <hr />
          <div className="mt-4 flex lg:flex-row flex-col justify-start my-6 lg:my-2 lg:justify-between items-center lg:w-[400px]">
            <div className="text-lg font-medium">Ölçü:</div>
            <div className="flex mt-2">
              {product.productVariants.map(variant => (
                <button
                  key={variant.variantId}
                  onClick={() => setSelectedSize(variant.variant.name)}
                  className={`p-3 px-10 py-2 border text-sm font-light text-[20px] font-poppins ${selectedSize === variant.variant.name ? 'bg-[#DB9457] text-white' : 'bg-white text-black border-gray-400'}`}
                >
                  {variant.variant.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => {
                const totalPrice = product.finalPrice * quantity;
                bassketadd(
                  product.title,
                  product.description,
                  product.id,
                  `https://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`,
                  product.price,
                  product.discount,
                  totalPrice,
                  selectedSize,
                  quantity
                );
              }}
              className="font-extralight tracking-wider bg-black text-white px-5 py-2 font-poppins hover:bg-[#DB9457] hover:text-white transition-all duration-600"
            >
           Səbətə at
            </button>
            
            <button    onClick={handleLikeClick} className="text-3xl border py-1 px-2 hover:bg-[#DB9457] hover:text-white transition-all duration-600">
              <CiHeart className="text-black" />
            </button>
          </div>
          <div className="text-gray-500 text-sm mt-12 font-inter font-light text-[14px] tracking-wider">
            Category: <span className="text-red-500">{product.categoryName}</span>
          </div>
          <div className="text-gray-500 text-sm font-inter font-light text-[14px] tracking-wider">
            Tags: {product.tags.map((tag, index) => (
              <span key={index} className="text-red-500">
                # {tag.tag.name}{index < product.tags.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Coment productId={id} />
    </div>
  );
};

export default ProductDetail;
