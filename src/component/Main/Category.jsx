import React, { useContext, useEffect, useState } from 'react';
import { DATA } from "../../Context/Datacontext";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCoffee } from "react-icons/fa";

function Category() {
  // DATA kontekstindən kateqoriyalar və məhsullar alınır
  const { category, mehsul } = useContext(DATA);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Komponent yükləndikdən 300ms sonra animasiya üçün visible statusu təyin edilir
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Section başlıq */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-3">
            <span className="h-px w-6 bg-[#de9f69]"></span>
            <span className="mx-3 text-[#de9f69] font-medium">KATEQORİYALAR</span>
            <span className="h-px w-6 bg-[#de9f69]"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sevimli Kofeleriniz</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Ən məşhur kofe növlərimizi kəşf edin. Sizin üçün xüsusi seçilmiş kofe kateqoriyalarımız.
          </p>
        </div>

        {/* Kateqoriyalar grid */}
        <div 
          className={`grid px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {category.slice(0, 4).map((item, i) => {
            // Hər bir kateqoriya üçün məhsulların sayını hesablayırıq
            const productCount = mehsul.filter(
              product => product.categoryName === item.name
            ).length;
            return (
              <Link
                key={i}
                to={`/Product?category=${encodeURIComponent(item.name)}`}
                className="group"
              >
                <div className="relative bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
                  {/* İkon overlay */}
                  <div className="absolute top-4 right-4 bg-white text-[#de9f69] w-10 h-10 rounded-full flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                    <FaCoffee className="text-lg" />
                  </div>

                  {/* Şəkil */}
                  <div className="w-full h-[240px] bg-gray-50 overflow-hidden">
                    <img
                      src={`https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
                      alt={item.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Kateqoriya adı və CTA */}
                  <div className="p-4 bg-white border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{productCount} məhsul</span>
                      <span className="text-[#de9f69] text-sm font-medium inline-flex items-center group-hover:underline">
                        Kəşf et
                        <FaArrowRight className="ml-1 text-xs opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </span>
                    </div>
                  </div>
                  
                  {/* Rəngli overlay border effekti */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#de9f69] rounded-xl transition-all duration-300 pointer-events-none"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bütün kateqoriyalar düyməsi */}
        <div className="flex justify-center mt-14">
          <Link 
            to="Allcategory" 
            className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 border-2 border-[#de9f69] text-[#de9f69] font-medium rounded-md transition-all duration-300 hover:text-white group"
          >
            <span className="relative z-10">Bütün kateqoriyalara göz atın</span>
            <span className="absolute inset-0 bg-[#de9f69] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
            <FaArrowRight className="ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Category;
