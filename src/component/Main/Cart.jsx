import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BASKET } from "../../Context/BasketContext";

function Cart({ opensebet, setOpensebet }) {
  const { sebet,removeFromBasket  } = useContext(BASKET);

  // ✅ Eyni məhsulları toplayırıq (id əsasən qruplaşdırırıq)
  const groupedBasket = sebet.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.count += item.count; // ✅ Say artır
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const totalPrice = groupedBasket.reduce((total, item) => {
    const effectivePrice = item.discount > 0 ? (isNaN(item.finalPrice) ? item.price : item.finalPrice) : item.price;
    const effectiveQuantity = item.quantity || 0;  // Quantity yoxlanır
    return total + effectiveQuantity * effectivePrice;
  }, 0);
  


  return (
    <section className="relative">
      <div className={`${opensebet ? "block" : "hidden"} sebet-container fixed z-50`}>
        <div className="fixed inset-0 w-full h-full before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-sans">
          <div className="w-full max-w-lg bg-white shadow-lg relative ml-auto h-screen">
            <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
              {/* Başlıq */}
              <div className="flex items-center gap-4 text-gray-800">
                <h3 className="text-2xl font-bold flex-1">Səbət</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                  onClick={() => setOpensebet(false)}
                  viewBox="0 0 320.591 320.591"
                >
                  <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                  <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
                </svg>
              </div>

              {/* Məhsullar */}
              {groupedBasket.length > 0 ? (
  groupedBasket.map((item, i) => (
    <div key={i} className="space-y-4 mt-6 border-b pb-4">
      <div className="grid grid-cols-3 items-start gap-4">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-24 h-24 bg-gray-100 p-2 rounded-md">
            <img
              src={item.imgUrl}
              className="w-full h-full object-contain"
              alt={item.title}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-gray-800">{item.title}</h3>
            <p className="text-xs font-semibold text-gray-500">Ölçü: {item.selectedSize}</p>
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <div className="flex items-center">
            <h4 className="text-base font-bold text-gray-800">
              {item.discount > 0 ? item.finalPrice.toFixed(2) : item.price.toFixed(2)} ₼
            </h4>
            <svg 
  xmlns="http://www.w3.org/2000/svg" 
  className="w-5 h-5 cursor-pointer fill-gray-500 hover:fill-red-500"
  onClick={() => removeFromBasket(item.id)}
  viewBox="0 0 24 24"
>
  <path d="M3 6h18v2H3V6m2 3v11c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V9h-2v11H7V9H5Z"/>
  <path d="M8 4.5C8 4.22 8.22 4 8.5 4h7c.28 0 .5.22.5.5V6H8V4.5Z"/>
  <path d="M10 10h1v8h-1v-8zm3 0h1v8h-1v-8z"/>
</svg>
          </div>
          <p className="text-xs text-gray-500">({item.quantity} ədəd)</p>
        </div>
      </div>
    </div>
  ))
) : (
  <p className="text-center text-gray-500 mt-6">Səbət boşdur.</p>
)}

            </div>

            {/* Alt Panel */}
            <div className="p-4 absolute bottom-0 w-full border-t bg-white">
              <ul className="text-gray-800 divide-y">
                <li className="flex flex-wrap gap-4 text-lg font-bold">
                  Toplam: <span className="ml-auto">{totalPrice.toFixed(2)} ₼</span>
                </li>
              </ul>
              <Link to={"/Check"} onClick={() => setOpensebet(false)}>
                <button className="mt-6 text-sm font-semibold px-4 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md tracking-wide">
                  Ödəniş səhifəsinə keç
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;