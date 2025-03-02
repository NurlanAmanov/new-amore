import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DATA } from "../../Context/Datacontext";
import { BASKET } from "../../Context/BasketContext";
import Teklifler from "../product/Teklifler";

function ProductPage() {
  const { id } = useParams();
  const { mehsulid, fetchProductById } = useContext(DATA);
  const { bassketadd } = useContext(BASKET);
  const [count, setCount] = useState(1);

  const [selectedSize, setSelectedSize] = useState("Kiçik"); // Default olaraq Kiçik seçilib

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  // Məhsul məlumatı yüklənmədikdə loading göstəricisi
  if (!mehsulid) {
    return (
      <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
        <div className="h-48 rounded-t bg-gray-300"></div>
        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
          <div className="w-full h-6 rounded bg-gray-300"></div>
          <div className="w-full h-6 rounded bg-gray-300"></div>
          <div className="w-3/4 h-6 rounded bg-gray-300"></div>
        </div>
      </div>
    );
  }

  // Məhsul qiyməti və endirim hesablaması
  const discount = mehsulid.discount || 0;
  const price = mehsulid.price || 0;
  const finalPrice = ((discount > 0 ? mehsulid.finalPrice : price) * count).toFixed(2);

  return (
    <div className="font-[sans-serif] p-4 bg-gray-100 py-32">
      <div className="lg:max-w-6xl max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Məhsul şəkli */}
          <div className="w-full lg:sticky top-0">
            <div className="bg-white shadow p-2">
              <img src={`https://finalprojectt-001-site1.jtempurl.com${mehsulid.imgUrl}`}
                alt={mehsulid.title} className="w-full object-cover" />
            </div>
          </div>

          {/* Məhsul məlumatları */}
          <div className="w-full">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{mehsulid.title}</h3>
            <p className="text-gray-500 mt-2 text-sm">{mehsulid.about}</p>

            {/* Qiymət */}
            <div className="flex items-center flex-wrap gap-2 mt-4">
              {discount > 0 ? (
                <>
                  <p className="text-gray-500 text-base"><strike>{(price * count).toFixed(2)} ₼</strike></p>
                  <h4 className="text-[#7a461f] text-2xl sm:text-3xl font-bold">{finalPrice} ₼</h4>
                  <div className="py-1 px-2 bg-[#7a461f] text-white font-semibold">-{discount}%</div>
                </>
              ) : (
                <p className="text-xl font-semibold text-gray-900">{finalPrice} ₼</p>
              )}
            </div>

            {/* Say artırıb-azaltmaq */}
            <div className="flex items-center border mt-6 border-gray-300 bg-white px-3 py-2 w-max">
              <button onClick={() => setCount(prev => Math.max(prev - 1, 1))}
                className="border-none outline-none px-2">➖</button>
              <span className="text-gray-800 text-sm font-semibold px-3">{count}</span>
              <button onClick={() => setCount(prev => prev + 1)}
                className="border-none outline-none px-2">➕</button>
            </div>

            {/* Ölçü Seçimi (Kiçik, Orta, Böyük) */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => setSelectedSize("Kiçik")}
                className={`px-4 py-2 w-full sm:w-auto rounded-md ${selectedSize === "Kiçik" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Kiçik
              </button>
              <button
                onClick={() => setSelectedSize("Orta")}
                className={`px-4 py-2 w-full sm:w-auto rounded-md ${selectedSize === "Orta" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Orta
              </button>
              <button
                onClick={() => setSelectedSize("Böyük")}
                className={`px-4 py-2 w-full sm:w-auto rounded-md ${selectedSize === "Böyük" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Böyük
              </button>
            </div>

            {/* Şəkər səviyyəsi */}
            
            {/* Səbətə at düymələri */}
            <div className="mt-4 flex flex-wrap gap-4">
              <button className="px-4 py-3 w-[45%] border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold">
                Sevimlilərə at
              </button>
              <button
                onClick={() => {
                  bassketadd(
                    mehsulid.title,
                    mehsulid.about,
                    mehsulid.id,
                    `https://finalprojectt-001-site1.jtempurl.com${mehsulid.imgUrl}`,
                    mehsulid.description,
                    mehsulid.price,
                    mehsulid.discount,
                    mehsulid.finalPrice,
                    count,
                   
                    selectedSize // Seçilən ölçü ilə əlavə edirik
                  );
                }}
                className="px-4 py-3 w-[45%] border border-[#7a461f] bg-[#7a461f] text-white hover:bg-white hover:text-black duration-300 text-sm font-semibold"
              >
                {count} ədəd Səbətə at
              </button>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Çatdırılma və keyfiyyət barədə məlumatlar */}
            <div className="flex justify-between gap-4 mt-6">
              <div className="text-center">
                <p className="text-gray-500 text-xs sm:text-sm mt-3">✅ 100% Təzə və Keyfiyyətli Kofe</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs sm:text-sm mt-3">☕ Hər Zövqə Uyğun Dad Seçimi</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs sm:text-sm mt-3">🚚 50 AZN-dən Yuxarı Pulsuz Çatdırılma</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Təkliflər bölməsi */}
      <div className="prduct">
        <Teklifler />
      </div>
    </div>
  );
}

export default ProductPage;
