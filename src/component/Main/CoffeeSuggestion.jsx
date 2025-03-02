import React, { useState } from "react";

const CoffeeSuggestion = () => {
  const [zodiac, setZodiac] = useState("");
  const [gender, setGender] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [showModal, setShowModal] = useState(false);

  const coffeeSuggestions = {
    aries: {
      male: {
        text: "Qoç kişisi üçün Espresso - enerjili başlanğıc!",
        image: "/api/placeholder/150/150?text=Espresso",
      },
      female: {
        text: "Qoç qadını üçün Macchiato - güclü və özünə güvənən.",
        image: "/api/placeholder/150/150?text=Macchiato",
      },
    },
    taurus: {
      male: {
        text: "Buğa kişisi üçün Cold Brew - təravətli və sərbəst.",
        image: "/api/placeholder/150/150?text=Cold+Brew",
      },
      female: {
        text: "Buğa qadını üçün Mocha - şirin və romantik.",
        image: "/api/placeholder/150/150?text=Mocha",
      },
    },
    gemini: {
      male: {
        text: "Əkizlər kişisi üçün Americano - sadə və güclü.",
        image: "/api/placeholder/150/150?text=Americano",
      },
      female: {
        text: "Əkizlər qadını üçün Iced Latte - yüngül və sərin.",
        image: "/api/placeholder/150/150?text=Iced+Latte",
      },
    },
    cancer: {
      male: {
        text: "Xərçəng kişisi üçün Latte - isti və yumşaq.",
        image: "/api/placeholder/150/150?text=Latte",
      },
      female: {
        text: "Xərçəng qadını üçün Cappuccino - şirin və rahat.",
        image: "/api/placeholder/150/150?text=Cappuccino",
      },
    },
    leo: {
      male: {
        text: "Şir kişisi üçün Black Coffee - sadə və güclü.",
        image: "/api/placeholder/150/150?text=Black+Coffee",
      },
      female: {
        text: "Şir qadını üçün Mocha - şirin və zərif.",
        image: "/api/placeholder/150/150?text=Mocha",
      },
    },
    virgo: {
      male: {
        text: "Qız kişisi üçün Flat White - ciddi və balanslı.",
        image: "/api/placeholder/150/150?text=Flat+White",
      },
      female: {
        text: "Qız qadını üçün Cappuccino - zarif və balanslı.",
        image: "/api/placeholder/150/150?text=Cappuccino",
      },
    },
    libra: {
      male: {
        text: "Tərəzi kişisi üçün Iced Coffee - sərin və yüngül.",
        image: "/api/placeholder/150/150?text=Iced+Coffee",
      },
      female: {
        text: "Tərəzi qadını üçün Macchiato - mükəmməl harmoniya.",
        image: "/api/placeholder/150/150?text=Macchiato",
      },
    },
    scorpio: {
      male: {
        text: "Əqrəb kişisi üçün Turkish Coffee - dərin və sirli.",
        image: "/api/placeholder/150/150?text=Turkish+Coffee",
      },
      female: {
        text: "Əqrəb qadını üçün Caramel Latte - şirin və gizli.",
        image: "/api/placeholder/150/150?text=Caramel+Latte",
      },
    },
    sagittarius: {
      male: {
        text: "Oxatan kişisi üçün Cold Brew - sərbəst və sərt.",
        image: "/api/placeholder/150/150?text=Cold+Brew",
      },
      female: {
        text: "Oxatan qadını üçün Flat White - rahat və təravətli.",
        image: "/api/placeholder/150/150?text=Flat+White",
      },
    },
    capricorn: {
      male: {
        text: "Oğlaq kişisi üçün Espresso - ciddi və güclü.",
        image: "/api/placeholder/150/150?text=Espresso",
      },
      female: {
        text: "Oğlaq qadını üçün Black Coffee - balanslı və məqsədyönlü.",
        image: "/api/placeholder/150/150?text=Black+Coffee",
      },
    },
    aquarius: {
      male: {
        text: "Dolça kişisi üçün Iced Latte - fərqli və yüngül.",
        image: "/api/placeholder/150/150?text=Iced+Latte",
      },
      female: {
        text: "Dolça qadını üçün Latte Macchiato - yumşaq və stilist.",
        image: "/api/placeholder/150/150?text=Latte+Macchiato",
      },
    },
    pisces: {
      male: {
        text: "Balıqlar kişisi üçün Caramel Coffee - şirin və romantik.",
        image: "/api/placeholder/150/150?text=Caramel+Coffee",
      },
      female: {
        text: "Balıqlar qadını üçün Caramel Latte - şirin və xəyalpərəst.",
        image: "/api/placeholder/150/150?text=Caramel+Latte",
      },
    },
  };

  const handleSuggestion = () => {
    if (!zodiac || !gender) {
      setSuggestion("Zəhmət olmasa, burcunuzu və cinsinizi seçin.");
      return;
    }
  
    const selectedCoffee = coffeeSuggestions[zodiac][gender];
    setSuggestion(selectedCoffee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (  
    <section className="py-12 px-6 bg-[#f7f7f7] text-center shadow-2xl">
      <h2 className="font-extrabold xl:text-4xl 2xl:text-4xl text-xl text-gray-800 mb-6 drop-shadow-lg">
        🌟 Burcunu Seç və Kofeni Tap! 🌟
      </h2>
      <p className="text-gray-800 text-lg sm:text-xl mb-8 font-light drop-shadow-md">
        Burcuna və zövqünə uyğun kofe təklifini kəşf et! 🎉
      </p>

      <div className="selecet-list flex items-center justify-center gap-4 xl:flex-row 2xl:flex-row flex-col lg:flex-row md:flex-row">
        <div className="mb-8">
          <label htmlFor="zodiac" className="block text-lg font-medium text-gray-800 mb-3">
            🔮 Burcunuzu seçin:
          </label>
          <select
            id="zodiac"
            className="w-full max-w-xs mx-auto border-none rounded-full px-6 py-3 text-base text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all"
            value={zodiac}
            onChange={(e) => setZodiac(e.target.value)}
          >
            <option value="">Burcunuzu seçin</option>
            {Object.keys(coffeeSuggestions).map((key) => (
              <option value={key} key={key}>
                {key[0].toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label htmlFor="gender" className="block text-lg font-medium text-gray-800 mb-3">
            🚻 Cinsinizi seçin:
          </label>
          <select
            id="gender"
            className="w-full max-w-xs mx-auto border-none rounded-full px-6 py-3 text-base text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Cinsinizi seçin</option>
            <option value="female">Qadın</option>
            <option value="male">Kişi</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSuggestion}
        className="bg-white text-pink-600 font-semibold py-3 px-8 rounded-full shadow-xl hover:bg-pink-600 hover:text-white transition-all transform hover:scale-110"
      >
        ✨ Kofeni Tap ✨
      </button>

      {showModal && suggestion && suggestion.text && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex items-center pb-3 border-b border-gray-300">
              <h3 className="text-gray-800 text-xl font-bold flex-1">☕ {suggestion.text}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                viewBox="0 0 320.591 320.591"
                onClick={closeModal}
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>

            <div className="my-6 flex flex-col items-center">
              <img 
                src={suggestion.image} 
                alt={suggestion.text.split('-')[0]} 
                className="w-32 h-32 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 text-sm leading-relaxed">
                Kofe təklifiniz hazırdır! Bu kofe növü sizin şəxsiyyətinizlə harmoniya yaradır.
              </p>
            </div>

            <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
              <button 
                type="button" 
                className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                onClick={closeModal}
              >
                Bağla
              </button>
              <button 
                type="button" 
                className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
              >
                Səbətə at
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoffeeSuggestion;