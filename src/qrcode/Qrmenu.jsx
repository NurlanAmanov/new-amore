import { useState, useContext } from "react";
import { DATA } from "../Context/Datacontext";
import axios from "axios";
import { useSearchParams } from "react-router-dom"; // Link komponentini import et
// import { QRCodeCanvas } from 'qrcode.react';

function Qrmenu() {
  const [searchParams] = useSearchParams();

  const { category, mehsul } = useContext(DATA);

  const tableId = searchParams.get("tableId");

  const API_BASE_URL = "https://finalprojectt-001-site1.jtempurl.com";

  // Modalın açılıb-bağlanmasını idarə edən state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Seçilmiş məhsul
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState({
    success: false,
    message: "",
  });
  // const [tableId, setTableId] = useState(null); // Yaradılan masa ID-sini saxlayır

  // Masa yaratma funksiyası
  // const createTable = async () => {
  //   try {
  //     // Masa nömrəsini təsadüfi olaraq seçirik (1-6)
  //     const tableName = Math.floor(Math.random() * 6) + 1;

  //     const response = await axios.post(
  //       `${API_BASE_URL}/api/Table`,
  //       { Name: tableName.toString() },  // Masa nömrəsi burada
  //       {
  //         headers: {
  //           'Authorization': 'Bearer YOUR_TOKEN',  // Token ilə autentifikasiya
  //           'Content-Type': 'multipart/form-data',
  //         }
  //       }
  //     );

  //     if (response.data && response.data.id) {
  //       // Masa yaradılıb, ID alındı
  //       console.log("Masa yaradıldı, ID:", response.data.id);
  //       setTableId(response.data.id); // Masa ID-ni saxlayırıq
  //     }
  //   } catch (error) {
  //     console.error("Masa yaratmaqda xəta:", error);
  //   }
  // };

  // Modal açılması
  const openModal = async (product) => {
    try {
      setLoading(true);
      // Yeni masa yaratmaq üçün ID alınır
      // await createTable();  // Masa yaratmaq üçün funksiyanı çağırırıq
      setSelectedProduct(product);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Məhsul məlumatları yüklənmədi:", error);
    } finally {
      setLoading(false);
    }
  };

  // Modal bağlanması
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setOrderStatus({ success: false, message: "" });
  };

  const handleOrderSubmit = async () => {
    if (!selectedProduct) {
      setOrderStatus({
        success: false,
        message: "Məhsul məlumatları tam deyil. Yenidən cəhd edin.",
      });
      return;
    }

    // Məhsul ID-ni əldə etməyə cəhd edirik
    const productId = String(selectedProduct.id);

    if (!productId) {
      console.error("Məhsul ID tapılmadı:", selectedProduct);
      setOrderStatus({
        success: false,
        message: "Məhsul ID-si tapılmadı. Məhsul məlumatları tam deyil.",
      });
      return;
    }

    console.log("Sifariş göndərilir, productId:", productId);

    try {
      setLoading(true);

      // FormData yaradırıq
      const formData = new FormData();
      formData.append("ProductIds", productId); // Nəzərə alın ki "ProductIds" istifadə edilir, "ProductId" yox
      formData.append("TableId", tableId); // Yaradılan Table ID burada istifadə edilir

      console.log("Göndərilən formData:", {
        ProductIds: productId,
        TableId: tableId,
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/Order/create-qr-order`,
        formData,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API cavabı:", response.data);

      // Uğurlu cavab alındıqda
      setOrderStatus({
        success: true,
        message: "Sifariş uğurla verildi!",
      });

      // 2 saniyə sonra modal bağlanır
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Sifariş göndərmək mümkün olmadı:", error);
      console.error("Xəta detalları:", error.response?.data);

      setOrderStatus({
        success: false,
        message:
          "Sifariş göndərmək mümkün olmadı. Xəta: " +
          (error.response?.data?.message || error.message || "Bilinməyən xəta"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="qrmenu-container block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        <div className="qr-main w-full">
          <div className="qr-main-title pb-4 bg-gray-50">
            <div className="sticky top-0 pt-4 bg-gray-50 z-50 px-4">
              <h3 className="text-xl font-bold">Bütün məhsullar</h3>
              <div className="qrhead w-full">
                <div className="menu-category scrolbar py-2 flex gap-2 overflow-x-scroll">
                  {/* Kategoriya düymələri */}
                  {category.map((item, i) => (
                    <button
                      key={i}
                      className="px-6 py-2 shadow-md flex-shrink-0 border rounded-xl flex items-center justify-center truncate"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-2 px-4">
              {mehsul.map((item, i) => (
                <div
                  key={i}
                  className="card bg-white w-full p-4 grid grid-cols-5 gap-4 rounded-lg shadow-lg"
                  onClick={() => openModal(item)}
                >
                  <div className="text col-span-3 flex flex-col justify-between relative">
                    <p className="text-[15px] font-bold uppercase">
                      {item.title}
                    </p>
                    {item.discount > 0 ? (
                      <div>
                        <span className="text-blue-500 text-xl font-poppins font-semibold">
                          {item.finalPrice} AZN
                        </span>
                        <span className="line-through text-gray-400 ml-2 text-xl">
                          {item.price} AZN
                        </span>
                      </div>
                    ) : (
                      <span className="text-blue-500 text-xl font-poppins font-bold">
                        {item.price} AZN
                      </span>
                    )}
                    <p className="about text-gray-500 break-words font-medium text-sm">
                      Kateqoriya: {item.categoryName}
                    </p>
                  </div>
                  <div className="img col-span-2 relative w-full">
                    {item.discount > 0 && (
                      <span className="text-xs absolute right-2 bottom-2 font-bold bg-blue-600 text-white rounded-md text-center px-1 py-[2px] uppercase">
                        {item.discount} %
                      </span>
                    )}
                    <img
                      src={`${API_BASE_URL}${item.imgUrl}`}
                      alt={item.title}
                      className="w-full h-[150px] rounded-lg"
                    />
                  </div>
                  {/* QR kodunu canvas formatında göstəririk */}
                  {/* <div className="qr-code">
                  <QRCodeCanvas value={`http://localhost:5173/qrmenu/${item.id}`} size={100} renderAs="canvas" />
                  <Link to={`/qrmenu/${item.id}`}>Masa {item.title}</Link>
                </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="modal-overlay px-4 fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-4 rounded-xl max-w-[400px] relative">
            {/* X düyməsi */}
     
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
              <div className="flex justify-between">  
                <h3 className="text-xl font-bold uppercase mt-2">
                  {selectedProduct.title}
                </h3>

              <button
              onClick={closeModal}
              className="font-bold text-gray-500 bg-gray-100 w-10 h-10 text-sm mb-2 rounded-full"
            >
              X
            </button>

              </div>
              
                <img
                  src={`${API_BASE_URL}${selectedProduct.imgUrl}`}
                  alt={selectedProduct.title}
                  className="aspect-[calc(4*3+1)/10] w-full object-cover rounded-md my-4"
                />
                <p className="text-[18px] text-gray-400 mt-2">
                  {selectedProduct.description}
                </p>
                {selectedProduct.discount > 0 ? (
                  <>
                    <span className="text-blue-500 text-[20px] font-poppins font-semibold">
                      {selectedProduct.finalPrice} AZN
                    </span>
                    <span className="line-through text-gray-400 ml-2 text-[20px]">
                      {selectedProduct.price} AZN
                    </span>
                  </>
                ) : (
                  <span className="text-blue-500 text-[20px] font-poppins font-bold">
                    {selectedProduct.price} AZN
                  </span>
                )}
                {selectedProduct.discount > 0 && (
                  <p className="text-[18px] text-red-500 mt-4">
                    Endirim: {selectedProduct.discount}%
                  </p>
                )}

                {orderStatus.message && (
                  <div
                    className={`my-3 p-2 rounded-md ${
                      orderStatus.success
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {orderStatus.message}
                  </div>
                )}

                <button
                  onClick={handleOrderSubmit}
                  disabled={loading}
                  className={`w-full bg-blue-500 text-white py-3 px-4 rounded-md mt-4 font-semibold
                    ${
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-blue-600"
                    }`}
                >
                  {loading ? "Gözləyin..." : "Sifariş ver"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Qrmenu;
