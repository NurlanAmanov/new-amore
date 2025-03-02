import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Authlogin";
import Sifaris from "./Sifaris";
import Acountinfo from "./Accountsettings";
import Sevimli from "./Sevimli";
import { CABINETDATA } from "../../Context/CabinetContext";



function Cabinet() {


  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hesab"); // Default: "Hesabım"
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ Mobil menyunu idarə edir

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ✅ Seçim edəndə menyunu bağlayırıq (mobil üçün)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // ✅ Mobil menyunu bağla
  };

  // ✅ Seçim düyməsinə basanda hansı komponentin göstərilməsini müəyyən edirik
  const renderComponent = () => {
    switch (activeTab) {
      case "sifarishler":
        return <Sifaris />;
      
      case "sevimli":
        return <Sevimli/>;
      
      default:
        return <Acountinfo />;
    }
  };

  return (
    <div className="mx-4 py-[130px] min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <h1 className="border-b py-6 text-4xl font-semibold">Şəxsi kabinet</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">

        {/* ✅ Mobil üçün açılıb bağlanan menyu */}
        <div className="relative my-4 w-56 sm:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="flex w-full cursor-pointer rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700">
            Bölmələr seçin
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto h-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isMenuOpen && (
            <ul className="absolute w-full bg-white shadow-md rounded-lg mt-2 z-10">
              <li onClick={() => handleTabChange("hesab")} className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                Hesabım
              </li>
              <li onClick={() => handleTabChange("sifarishler")} className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                Sifarişlərim
              </li>
            
              <li onClick={() => handleTabChange("Sevimliler")} className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                Sevimlilər
              </li>
              
              <li onClick={handleLogout} className="cursor-pointer px-3 py-2 text-sm text-red-600 hover:bg-red-700 hover:text-white">
                Çıxış
              </li>
            </ul>
          )}
        </div>

        {/* ✅ Desktop üçün menyu */}
        <div className="col-span-2 hidden sm:block">
          <ul>
            <li onClick={() => setActiveTab("hesab")} className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === "hesab" ? "border-l-blue-700 text-blue-700" : "border-transparent hover:border-l-blue-700 hover:text-blue-700"}`}>
              Hesabım
            </li>
            <li onClick={() => setActiveTab("sifarishler")} className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === "sifarishler" ? "border-l-blue-700 text-blue-700" : "border-transparent hover:border-l-blue-700 hover:text-blue-700"}`}>
              Sifarişlərim
            </li>
           
            <li onClick={() => setActiveTab("sevimli")} className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === "sevimliler" ? "border-l-blue-700 text-blue-700" : "border-transparent hover:border-l-blue-700 hover:text-blue-700"}`}>
              Sevimlilər
            </li>
          
            <li onClick={handleLogout} className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold text-red-600 transition hover:border-l-red-700 hover:text-red-700">
              Çıxış
            </li>
          </ul>
        </div>

        {/* ✅ Dinamik komponentlər burada göstərilir */}
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default Cabinet;
