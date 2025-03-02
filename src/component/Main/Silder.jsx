import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Import required modules
import { Pagination, Autoplay, Navigation, EffectFade } from 'swiper/modules';
import { DATA } from '../../Context/Datacontext';
import { FaLongArrowAltRight, FaStar } from 'react-icons/fa';

function Slider() {
  const { silder } = useContext(DATA);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animasiya üçün komponentin yüklənməsindən sonra visible statusu təyin edirik
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-12 bg-[#f8f5f2]">
      {/* Dekorative elementlər */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#de9f69] opacity-5 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#de9f69] opacity-5 rounded-full translate-x-24 translate-y-24"></div>
      
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Yazı olan hissə */}
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="flex items-center mb-3">
              <div className="h-0.5 w-8 bg-[#de9f69] mr-3"></div>
              <span className="text-[#de9f69] font-medium uppercase tracking-wider text-sm">Bürcünüzü kəşf edin</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
              <span className="font-playfair block">Kofe seçiminiz</span>
              <span className="font-playfair text-[#de9f69]">ulduzlardan ilham alsın</span>
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
              Hər fincanda ulduzların enerjisi gizlidir. Bürcünüzə uyğun kofenizi seçin və 
              gününüzə fərqli bir enerji qatın!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center px-8 py-3.5 bg-[#de9f69] text-white font-medium rounded-lg transition-all hover:bg-[#c48951] hover:shadow-lg group"
              >
                <span>Keçid et</span>
                <FaLongArrowAltRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
              </a>
              
              <a 
                href="#discover" 
                className="inline-flex items-center px-8 py-3.5 border-2 border-[#de9f69] text-[#de9f69] font-medium rounded-lg transition-all hover:bg-[#de9f69] hover:text-white"
              >
                Daha çox öyrən
              </a>
            </div>
            
            {/* Rəy sayı göstəricisi */}
            <div className="flex items-center mt-8 space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="text-yellow-400 w-4 h-4" />
              ))}
              <span className="text-gray-600 ml-2 text-sm">5000+ müştəri rəyi</span>
            </div>
          </div>
          
          {/* Şəkil olan hissə */}
          <div className={`relative transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            {/* Dekorative ulduz elementləri */}
            <div className="absolute w-12 h-12 rounded-full bg-[#de9f69] opacity-20 top-10 right-10 z-10 animate-pulse"></div>
            <div className="absolute w-8 h-8 rounded-full bg-[#de9f69] opacity-20 bottom-20 left-10 z-10 animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Slider konteyner */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <Swiper
                effect="fade"
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper rounded-lg"
              >
                {silder && silder.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] w-full overflow-hidden group">
                      <img 
                        src={item.imgUrl} 
                        alt={`Slider image ${i+1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      
                      {/* Şəkil üzərindəki overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                          <h3 className="text-xl font-bold">Bürc Kəşfi</h3>
                          <p className="mt-2">Sizin üçün xüsusi hazırlanmış dadlar</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Swiper naviqasiyası üçün xüsusi dizayn (CSS class ilə) */}
              <style jsx>{`
                .swiper-button-next, .swiper-button-prev {
                  background-color: rgba(255, 255, 255, 0.8);
                  width: 40px !important;
                  height: 40px !important;
                  border-radius: 50%;
                  color: #de9f69 !important;
                }
                
                .swiper-button-next:after, .swiper-button-prev:after {
                  font-size: 18px !important;
                  font-weight: bold;
                }
                
                .swiper-pagination-bullet {
                  background: white;
                  opacity: 0.6;
                }
                
                .swiper-pagination-bullet-active {
                  background: #de9f69;
                  opacity: 1;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slider;