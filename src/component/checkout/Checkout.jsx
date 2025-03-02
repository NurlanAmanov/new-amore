import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASKET } from '../../Context/BasketContext';
import axios from "axios";

function Checkout() {
  const { sebet } = useContext(BASKET);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    city: "",
    streetAddress: "",
    apartment: "",
  });

  const [selectedAddress, setSelectedAddress] = useState("");
  const [shippingInfo, setShippingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveAddress, setSaveAddress] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // İstifadəçi məlumatını və ünvanlarını yüklə
    async function fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log("Token yoxdur, istifadəçi giriş etməyib");
          setLoading(false);
          return;
        }

        // İstifadəçi məlumatlarını əldə et
        const userResponse = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (userResponse.status === 200) {
          setCurrentUser(userResponse.data);
          console.log("İstifadəçi məlumatları:", userResponse.data);
          
          // Əgər istifadəçinin ünvanları varsa, onları əlavə et
          if (userResponse.data.shippingInfos && userResponse.data.shippingInfos.length > 0) {
            setShippingInfo(userResponse.data.shippingInfos);
          }
        }
      } catch (error) {
        console.error("Məlumatları yükləmə xətası:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    const selected = e.target.value;
    setSelectedAddress(selected);

    if (selected) {
      const selectedShipping = shippingInfo.find(item => item.id === selected);
      setFormData({
        name: selectedShipping.name,
        surname: selectedShipping.surname,
        email: selectedShipping.email,
        city: selectedShipping.city,
        streetAddress: selectedShipping.streetAdress, // API-dən gələn property adını düzəldirik
        apartment: selectedShipping.apartment,
      });
    } else {
      // Əgər "Yeni ünvan daxil edin" seçilirsə formu təmizlə
      setFormData({
        name: "",
        surname: "",
        email: "",
        city: "",
        streetAddress: "",
        apartment: "",
      });
    }
  };

  const saveFormData = async () => {
    try {
      // İstifadəçi ID-si yoxdursa, əvvəlcə onu əldə et
      if (!currentUser) {
        const token = localStorage.getItem('token');
        
        const userResponse = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (userResponse.status !== 200) {
          alert('İstifadəçi məlumatları alına bilmədi!');
          return false;
        }
        
        setCurrentUser(userResponse.data);
      }
      
      if (!currentUser || !currentUser.id) {
        alert('İstifadəçi ID-si tapılmadı!');
        return false;
      }
      
      const token = localStorage.getItem('token');
      const form = new FormData();
      
      form.append("AppUserId", currentUser.id);
      form.append("Name", formData.name);
      form.append("Surname", formData.surname);
      form.append("Email", formData.email);
      form.append("City", formData.city);
      form.append("StreetAdress", formData.streetAddress); // API-də "StreetAdress" yazılışı var
      form.append("Apartment", formData.apartment);

      console.log("Göndərilən AppUserId:", currentUser.id);

      const response = await fetch("https://finalprojectt-001-site1.jtempurl.com/api/ShippingInfo", {
        method: "POST",
        headers: {
          "accept": "*/*",
          "Authorization": `Bearer ${token}`
        },
        body: form,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Məlumatlar uğursuz oldu!");

      console.log("✅ Ünvan məlumatları uğurla göndərildi:", result);
      
      // Ödənişi aktivləşdirmək
      return activatePayment(result.id);
    } catch (error) {
      console.error("❌ Məlumatları göndərmə xətası:", error);
      alert("Məlumatları göndərmək mümkün olmadı: " + error.message);
      return false;
    }
  };

  const activatePayment = async (shippingInfoId = null) => {
    try {
      console.log("Ödəniş aktivləşdirilir...");
  
      const totalPrice = sebet.reduce((total, item) => total + item.quantity * (item.discount > 0 ? item.finalPrice : item.price), 0);
      console.log(totalPrice, 'Total Price');
      console.log(sebet, 'Basket');
      
      // İstifadəçi ID-si yoxdursa, əvvəlcə onu əldə et
      if (!currentUser) {
        const token = localStorage.getItem('token');
        
        const userResponse = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (userResponse.status !== 200) {
          alert('İstifadəçi məlumatları alına bilmədi!');
          return false;
        }
        
        setCurrentUser(userResponse.data);
      }
      
      if (!currentUser || !currentUser.id) {
        alert('İstifadəçi ID-si tapılmadı!');
        return false;
      }
      
      const token = localStorage.getItem('token');
      const createOrderFormData = new FormData();
      createOrderFormData.append("AppUserId", currentUser.id);
      createOrderFormData.append("ProductIds", sebet.map(item => item.id));
      
      // Əgər shippingInfoId varsa, onu əlavə et
      if (shippingInfoId) {
        createOrderFormData.append("ShippingInfoId", shippingInfoId);
      } else if (!saveAddress) {
        // Əgər save address seçilməyibsə, amma ünvan məlumatları doldurulubsa,
        // bu məlumatları birbaşa əlavə etmək lazımdır (API-nin dəstəkləməsi lazımdır)
        createOrderFormData.append("Name", formData.name);
        createOrderFormData.append("Surname", formData.surname);
        createOrderFormData.append("Email", formData.email);
        createOrderFormData.append("City", formData.city);
        createOrderFormData.append("StreetAddress", formData.streetAddress);
        createOrderFormData.append("Apartment", formData.apartment);
      }
      
      console.log("Sifariş yaradılır, AppUserId:", currentUser.id);
      
      const createdOrder = await axios.post('https://finalprojectt-001-site1.jtempurl.com/api/Order/create-delivery-order', createOrderFormData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => res.data).catch(err => {
        console.error("Sifariş yaradılma xətası:", err.response ? err.response.data : err);
        throw err;
      });
  
      if (!createdOrder || !createdOrder.orderId) {
        alert('Sifariş yaradılmadı!');
        return false;
      }
  
      console.log(createdOrder, 'Created Order');
      navigate('/order?orderId=' + createdOrder.orderId);
      return true;
    } catch (error) {
      console.error("Ödəniş aktivləşdirmə xətası:", error);
      alert("Ödəniş aktivləşdirmə xətası baş verdi: " + (error.response ? error.response.data : error.message));
      return false;
    }
  };

  const proceedToOrder = async () => {
    if (selectedAddress) {
      // Əgər mövcud ünvan seçilibsə, birbaşa sifarişə keç
      const success = await activatePayment(selectedAddress);
      if (success) {
        console.log("Mövcud ünvanla sifariş uğurla yaradıldı");
      }
    } else if (isFormValid) {
      // Əgər yeni ünvan daxil edilibsə
      if (saveAddress) {
        // Ünvanı saxla və sifarişə keç
        const success = await saveFormData();
        if (success) {
          alert("Ünvan uğurla saxlandı və sifariş yaradıldı!");
        }
      } else {
        // Ünvanı saxlamadan birbaşa sifarişə keç
        const success = await activatePayment();
        if (success) {
          console.log("Ünvanı saxlamadan sifariş uğurla yaradıldı");
        }
      }
    } else {
      alert("Zəhmət olmasa, bütün məlumatları doldurun!");
    }
  };

  const isFormValid = formData.name && formData.surname && formData.email && formData.city && formData.streetAddress && formData.apartment;

  // Calculate order summary
  const totalItems = sebet.reduce((total, item) => total + item.quantity, 0);
  const subtotal = sebet.reduce((total, item) => total + item.quantity * (item.discount > 0 ? item.finalPrice : item.price), 0);
  const shipping = 2; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Sifariş Məlumatları</h1>
          <p className="mt-2 text-lg text-gray-600">Son addım - məlumatlarınızı təsdiqləyin</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Shipping info */}
          <div className="lg:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="p-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Çatdırılma Məlumatları</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ünvanınızı seçin</label>
                  <div className="relative">
                    <select 
                      value={selectedAddress} 
                      onChange={handleAddressChange} 
                      className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md transition-colors"
                    >
                      <option value="">Yeni ünvan daxil edin</option>
                      {shippingInfo.map(address => (
                        <option key={address.id} value={address.id}>
                          {address.name} {address.surname} - {address.city}, {address.streetAdress}
                        </option>
                      ))}
                    </select>
                    
                  </div>
                </div>
                
                {!selectedAddress && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Yeni Ünvan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Adınız"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                        <input
                          type="text"
                          name="surname"
                          value={formData.surname}
                          onChange={handleChange}
                          placeholder="Soyadınız"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-poçt</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="E-poçt ünvanınız"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Şəhər</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Şəhər"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Küçə ünvanı</label>
                        <input
                          type="text"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleChange}
                          placeholder="Küçə ünvanı"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mənzil/Bina</label>
                        <input
                          type="text"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleChange}
                          placeholder="Mənzil/Bina"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={saveAddress}
                          onChange={() => setSaveAddress(!saveAddress)}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded transition"
                        />
                        <span className="ml-3 text-sm text-gray-600">Bu ünvanı gələcək sifarişlər üçün yadda saxla</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side - Order summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Sifariş Detalları</h2>
                
                <div className="space-y-4 mb-6">
                  {sebet.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                        {item.imgUrl && (
                          <img 
                            src={item.imgUrl} 
                            alt={item.title} 
                            className="h-full w-full object-cover rounded-md"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.quantity} x {item.discount > 0 ? item.finalPrice : item.price} ₼</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {(item.quantity * (item.discount > 0 ? item.finalPrice : item.price)).toFixed(2)} ₼
                      </div>
                    </div>
                  ))}
                  
                  {sebet.length > 3 && (
                    <div className="text-sm text-gray-500 italic">
                      + {sebet.length - 3} digər məhsul
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 py-4 border-t border-b">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Məhsullar ({totalItems})</p>
                    <p className="text-sm font-medium text-gray-900">{subtotal.toFixed(2)} ₼</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Çatdırılma</p>
                    <p className="text-sm font-medium text-gray-900">{shipping.toFixed(2)} ₼</p>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <p className="text-base font-semibold text-gray-900">Cəmi</p>
                  <p className="text-base font-semibold text-gray-900">{total.toFixed(2)} ₼</p>
                </div>
              </div>
              
              <div className="p-6">
                <button 
                  type="button" 
                  onClick={proceedToOrder} 
                  disabled={!isFormValid && !selectedAddress} 
                  className={`w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all ${(!isFormValid && !selectedAddress) ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  Sifarişi Təsdiq Et
                </button>
                
                <p className="mt-4 text-center text-sm text-gray-500">
                  Təsdiq etməklə şərtləri və qaydaları qəbul edirsiniz
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;