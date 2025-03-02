import React, { useState, useContext } from 'react';
import { DATA } from '../Context/Datacontext';
import axios from 'axios';

function Qrmenu() {
  const { category, mehsul } = useContext(DATA);
  const API_BASE_URL = 'https://finalprojectt-001-site1.jtempurl.com';
  
  // Modalın açılıb-bağlanmasını idarə edən state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Seçilmiş məhsul
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState({ success: false, message: '' });
  
  // Modal açılması
  const openModal = async (product) => {
    try {
      // Məhsul məlumatlarını API-dən ətraflı alaraq yeniləyirik
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/Product/${product.id}`);
      
      if (response.data) {
        // API-dən alınan məlumatlarla əvvəlki məlumatları birləşdiririk
        setSelectedProduct({ ...product, ...response.data });
        console.log("Seçilmiş məhsul:", { ...product, ...response.data });
      } else {
        setSelectedProduct(product);
        console.log("Alternativ məhsul:", product);
      }
      
      setIsModalOpen(true);
    } catch (error) {
      console.error('Məhsul məlumatları yüklənmədi:', error);
      // Xəta olsa da mövcud məlumatları göstəririk
      setSelectedProduct(product);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };
  
  // Modal bağlanması
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setOrderStatus({ success: false, message: '' });
  };

  const handleOrderSubmit = async () => {
    if (!selectedProduct) {
      setOrderStatus({
        success: false,
        message: 'Məhsul məlumatları tam deyil. Yenidən cəhd edin.'
      });
      return;
    }
    
    // Məhsul ID-ni əldə etməyə cəhd edirik
    const productId = String(selectedProduct.id);
    
    if (!productId) {
      console.error('Məhsul ID tapılmadı:', selectedProduct);
      setOrderStatus({
        success: false,
        message: 'Məhsul ID-si tapılmadı. Məhsul məlumatları tam deyil.'
      });
      return;
    }
    
    console.log('Sifariş göndərilir, productId:', productId);
    
    try {
      setLoading(true);
      
      // FormData yaradırıq
      const formData = new FormData();
      formData.append('ProductIds', productId); // Nəzərə alın ki "ProductIds" istifadə edilir, "ProductId" yox
      formData.append('TableId', 'abc5204f-8742-4927-b33b-dc8e52f9e8a1');
      
      console.log('Göndərilən formData:', {
        ProductIds: productId,
        TableId: 'abc5204f-8742-4927-b33b-dc8e52f9e8a1'
      });
      
      const response = await axios.post(
        `${API_BASE_URL}/api/Order/create-qr-order`,
        formData,
        {
          headers: {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log('API cavabı:', response.data);
      
      // Uğurlu cavab alındıqda
      setOrderStatus({
        success: true,
        message: 'Sifariş uğurla verildi!'
      });
      
      // 2 saniyə sonra modal bağlanır
      setTimeout(() => {
        closeModal();
      }, 2000);
      
    } catch (error) {
      console.error('Sifariş göndərmək mümkün olmadı:', error);
      console.error('Xəta detalları:', error.response?.data);
      
      setOrderStatus({
        success: false,
        message: 'Sifariş göndərmək mümkün olmadı. Xəta: ' + (error.response?.data?.message || error.message || 'Bilinməyən xəta')
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="qrmenu-container block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        <div className="qrhead py-5 w-full">
          <div className="menu-category scrolbar py-2 flex items-center justify-start px-2 gap-2 overflow-x-scroll max-w-[95%] overflow-hidden">
            {/* Kategoriya düymələri */}
            {category.map((item, i) => (
              <button
                key={i}
                className="w-[40%] p-2 shadow-md border rounded-xl flex items-center justify-center"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="qr-main w-full">
          <div className="qr-main-title p-2 mt-4 bg-slate-100">
            <h3 className="text-[25px] font-bold uppercase">Kateqoriya Adı</h3>
            {mehsul.map((item, i) => (
              <div
                key={i}
                className="card my-12 bg-white w-full p-4 flex items-center justify-between gap-4"
                onClick={() => openModal(item)}
              >
                <div className="text w-[60%]">
                  <p className="text-[15px] font-bold uppercase">{item.title}</p>
                  {item.discount > 0 && (
                    <p className="text-[15px] font-bold bg-blue-600 text-white rounded-md text-center w-12 my-4 uppercase">
                      {item.discount} %
                    </p>
                  )}
                  {item.discount > 0 ? (
                    <>
                      <span className="text-blue-500 text-[15px] font-poppins font-semibold">
                        {item.finalPrice}₼
                      </span>
                      <span className="line-through text-gray-400 ml-2 text-[15px]">{item.price}₼</span>
                    </>
                  ) : (
                    <span className="text-blue-500 text-[15px] font-poppins font-bold">{item.price}₼</span>
                  )}
                  <p className="about text-gray-500 break-words font-medium text-sm">
                    Kateqoriya: {item.categoryName}
                  </p>
                </div>
                <div className="img w-[40%]">
                  <img
                    src={`${API_BASE_URL}${item.imgUrl}`}
                    alt={item.title}
                    className="w-[100%] h-[100px] object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="modal-overlay px-3 fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white px-3 p-8 rounded-xl w-[400px] relative">
            {/* X düyməsi */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-xl font-bold text-gray-500"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              X
            </button>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <h3 className="text-[25px] font-bold uppercase">{selectedProduct.title}</h3>
                <img
                  src={`${API_BASE_URL}${selectedProduct.imgUrl}`}
                  alt={selectedProduct.title}
                  className="w-full h-[200px] object-cover rounded-md my-4"
                />
                <p className="text-[18px] text-gray-400 mt-4"> {selectedProduct.description}</p>
                {selectedProduct.discount > 0 ? (
                  <>
                    <span className="text-blue-500 text-[20px] font-poppins font-semibold">
                      {selectedProduct.finalPrice}₼
                    </span>
                    <span className="line-through text-gray-400 ml-2 text-[20px]">{selectedProduct.price}₼</span>
                  </>
                ) : (
                  <span className="text-blue-500 text-[20px] font-poppins font-bold">
                    {selectedProduct.price}₼
                  </span>
                )}
                {selectedProduct.discount > 0 && (
                  <p className="text-[18px] text-red-500 mt-4">Endirim: {selectedProduct.discount}%</p>
                )}

                {orderStatus.message && (
                  <div className={`my-3 p-2 rounded-md ${orderStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {orderStatus.message}
                  </div>
                )}

                <button 
                  onClick={handleOrderSubmit} 
                  disabled={loading}
                  className={`w-full bg-blue-500 text-white py-3 px-4 rounded-md mt-4 font-semibold
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                  {loading ? 'Gözləyin...' : 'Sifariş ver'}
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