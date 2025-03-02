import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASKET } from '../../Context/BasketContext';

function Order() {
  const navigate = useNavigate();
  const { sebet, basketRemove } = useContext(BASKET);

  // Konfiqurasiya
  const API_BASE_URL = 'https://finalprojectt-001-site1.jtempurl.com';
  const token = localStorage.getItem("token");

  // State-lər
  const [userId, setUserId] = useState('');
  const [promocode, setPromocode] = useState('');
  const [promocodeInput, setPromocodeInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalTotalPrice, setOriginalTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [consolidatedProducts, setConsolidatedProducts] = useState([]);
  const [availablePromocodes, setAvailablePromocodes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ödəniş formu üçün inputlar
  const [formData, setFormData] = useState({
    cvv: '',
    cardholderName: '',
    paymentMethod: 'Card',
    cardNumber: '',
    expDate: '',
    paymentToken: 'tok_visa',
  });

  // --- KÖMƏKÇİ FUNKSİYALAR ---
  const showNotification = (message, isError = false) => {
    if (isError) {
      console.error(`❌ ${message}`);
      setError(message);
      setSuccessMessage('');
    } else {
      console.log(`✅ ${message}`);
      setSuccessMessage(message);
      setError('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Səbətdəki məhsulları qruplaşdırırıq (əgər eyni ID-lər çoxdursa, quantity artır)
  const consolidateBasketProducts = () => {
    if (!sebet || sebet.length === 0) return [];

    const productMap = new Map();

    sebet.forEach(item => {
      const productId = item.id;
      if (productMap.has(productId)) {
        const existing = productMap.get(productId);
        existing.quantity += 1;
        existing.totalPrice += item.price;
      } else {
        productMap.set(productId, {
          id: productId,
          title: item.title,
          imgUrl: item.imgUrl,
          price: item.price,
          quantity: 1,
          totalPrice: item.price,
        });
      }
    });

    return Array.from(productMap.values());
  };

  // Səbətdəki ümumi məbləği hesablayır
  const calculateBasketTotalPrice = (discountValue = discount) => {
    if (!sebet || sebet.length === 0) {
      setOriginalTotalPrice(0);
      setTotalPrice(0);
      return;
    }

    let total = sebet.reduce((acc, item) => acc + item.price, 0);
    setOriginalTotalPrice(total);

    if (discountValue > 0) {
      const discountAmount = (total * discountValue) / 100;
      total -= discountAmount;
    }

    setTotalPrice(total);
  };

  // Sifarişin yaradılması (səbətdəki məhsullar əsasında)
  const createOrderFromBasket = async () => {
    try {
      if (!userId) {
        showNotification("İstifadəçi girişi etməlisiniz!", true);
        return;
      }
      if (!sebet || sebet.length === 0) {
        showNotification("Səbətiniz boşdur!", true);
        return;
      }

      setLoading(true);
      const orderFormData = new FormData();

      orderFormData.append('AppUserId', userId);
      sebet.forEach(item => {
        orderFormData.append('ProductIds', item.id);
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/Order/create-delivery-order`,
        orderFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data && response.data.id) {
        showNotification('Sifariş uğurla yaradıldı!');
        // Sifariş yaradıldıqdan sonra səbəti təmizləyirik
        sebet.forEach(item => basketRemove(item.id));
        // İstifadəçini kabinetə yönləndiririk (və ya istədiyiniz səhifəyə)
        navigate('/cabinet');
      }
    } catch (err) {
      console.error('Order creation error:', err);
      let errorMessage = 'Sifariş yaradılarkən xəta baş verdi!';
      if (err.response?.data) {
        errorMessage = typeof err.response.data === 'string'
          ? err.response.data
          : (err.response.data.message || errorMessage);
      }
      showNotification(errorMessage, true);
    } finally {
      setLoading(false);
    }
  };

  // Ödəniş prosesi
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        showNotification("İstifadəçi girişi etməlisiniz!", true);
        return;
      }
      if (!sebet || sebet.length === 0) {
        showNotification("Səbətiniz boşdur!", true);
        return;
      }

      setLoading(true);
      const paymentFormData = new FormData();

      // Payment üçün lazım olan sahələr
      Object.entries({
        CardholderName: formData.cardholderName,
        CardNumber: formData.cardNumber,
        EXP: formData.expDate,
        CVV: formData.cvv,
        PaymentMethod: "tok_visa",
        PaymentToken: "tok_visa",
        AppUserId: userId,
        TotalPrice: totalPrice,
        Promocode: promocode || ''
      }).forEach(([key, value]) => {
        paymentFormData.append(key, value);
      });

      // Ödəniş
      const paymentResponse = await axios.post(
        `${API_BASE_URL}/api/Checkout/process-payment`,
        paymentFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (paymentResponse.data) {
        showNotification('Ödəniş uğurla tamamlandı!');

        navigate('/tracing');
        await createOrderFromBasket();
      }
    } catch (err) {
      console.error('Payment error:', err);
      let errorMessage = 'Ödəniş zamanı xəta baş verdi!';
      if (err.response?.data) {
        errorMessage = typeof err.response.data === 'string'
          ? err.response.data
          : (err.response.data.message || errorMessage);
      }
      showNotification(errorMessage, true);
    } finally {
      setLoading(false);
    }
  };

  // Promokodları çəkmək
  const fetchAvailablePromocodes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Promocode/available-promocodes`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        setAvailablePromocodes(response.data);
      }
    } catch (error) {
      console.error("Mövcud promokodlar yüklənə bilmədi:", error);
    }
  };

  // Promokod tətbiq etmək
  const applyPromocode = async () => {
    if (!promocodeInput.trim()) {
      showNotification("Zəhmət olmasa promokodu daxil edin", true);
      return;
    }
    if (!userId) {
      showNotification("İstifadəçi girişi etməlisiniz!", true);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/Promocode/use-promocode?userId=${userId}&promocodeCode=${promocodeInput}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "*/*"
          },
        }
      );

      if (response.status === 200 && response.data) {
        const promoData = response.data;
        setPromocode(promoData.code);
        setDiscount(promoData.discountPercentage);
        // Səbətin qiymətini yenidən hesabla
        calculateBasketTotalPrice(promoData.discountPercentage);
        showNotification(`Promokod "${promoData.code}" uğurla tətbiq edildi! (${promoData.discountPercentage}% endirim)`);
      }
    } catch (err) {
      console.error("Error applying promocode:", err);
      let errorMessage = "Promokod tətbiq edilə bilmədi!";
      if (err.response) {
        if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.status === 400) {
          errorMessage = "Promokod etibarsızdır və ya artıq istifadə edilib";
        }
      }
      showNotification(errorMessage, true);
    } finally {
      setLoading(false);
    }
  };

  // İstifadəçi məlumatlarını çəkmək
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${API_BASE_URL}/api/Auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (resp.data && resp.data.id) {
        setUserId(resp.data.id);
        // Əgər promokodlar varsa, ilk promokodu götürürük
        if (resp.data.userPromocodes?.length) {
          const firstPromo = resp.data.userPromocodes[0].promocode;
          setPromocode(firstPromo.code);
          setDiscount(firstPromo.discount);
        }
        // Mövcud promokodları da çəkək
        fetchAvailablePromocodes();
      }
    } catch (err) {
      console.error('Profil yükləmə xətası:', err);
      showNotification('Profil məlumatları yüklənmədi!', true);
    } finally {
      setLoading(false);
    }
  };

  // --- USE EFFECT-lər ---
  useEffect(() => {
    // Token varsa istifadəçi məlumatlarını çəkirik
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  // Səbət dəyişdikcə məhsulları yenidən konsolidasiya edirik
  useEffect(() => {
    setConsolidatedProducts(consolidateBasketProducts());
    calculateBasketTotalPrice();
  }, [sebet]);

  // Promokod dəyəri dəyişəndə yenidən hesablanma
  useEffect(() => {
    if (discount > 0) {
      calculateBasketTotalPrice(discount);
    }
  }, [discount]);

  // --- RENDER FUNKSİYASI: Məhsulları göstərmək ---
  const renderProducts = () => {
    if (!consolidatedProducts.length) {
      return <p className="text-gray-500 mb-4">Səbətdə məhsul yoxdur.</p>;
    }

    return (
      <ul className="mt-4 space-y-4">
        {consolidatedProducts.map((prod) => (
          <li
            key={prod.id}
            className="flex items-center border rounded-md bg-gray-50 overflow-hidden"
          >
            <img
              src={
                prod.imgUrl.startsWith('http')
                  ? prod.imgUrl
                  : `${API_BASE_URL}${prod.imgUrl}`
              }
              alt={prod.title}
              className="w-24 h-24 object-cover mr-4"
            />
            <div className="flex-grow p-4">
              <h3 className="font-semibold text-lg">{prod.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600">
                  <span className="font-medium">{prod.price} ₼</span> × {prod.quantity}
                </p>
                <p className="font-bold text-lg">{prod.totalPrice} ₼</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // --- RETURN (JSX) ---
  return (
    <div className='py-[160px]'>
      <div className="max-w-[1200px] px-5 mx-auto">
        <h1 className="text-2xl font-bold mb-6">Sifariş Təsdiqi</h1>

        {loading && (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-md mb-6">
            Məlumatlar yüklənir, zəhmət olmasa gözləyin...
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Qiymət məlumatları və Promokod hissəsi */}
        {sebet && sebet.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Ödəniş məlumatı</h2>
            <div className="space-y-2 border-b pb-4 mb-4">
              <p>
                <strong>Əsas Qiymət:</strong> {originalTotalPrice.toFixed(2)} ₼
              </p>
              {discount > 0 && (
                <p>
                  <strong>Endirim:</strong> {discount}%
                  ({(originalTotalPrice * discount / 100).toFixed(2)} ₼)
                </p>
              )}
              <p className="text-lg font-bold">
                <strong>Yekun Qiymət:</strong> {totalPrice.toFixed(2)} ₼
              </p>
            </div>

            {/* Promokod bölməsi */}
            <div className="mt-6">
              <h3 className="font-medium mb-2">Promokod</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={promocodeInput}
                  onChange={(e) => setPromocodeInput(e.target.value)}
                  placeholder="Promokodu daxil edin"
                  className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={applyPromocode}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Yüklənir...' : 'Tətbiq et'}
                </button>
              </div>

              {/* Mövcud promokodları seçim üçün Dropdown */}
              {availablePromocodes.length > 0 && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Və ya mövcud promokodlardan seçin:
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={promocodeInput}
                      onChange={(e) => setPromocodeInput(e.target.value)}
                      className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Promokod seçin</option>
                      {availablePromocodes.map((promo) => (
                        <option key={promo.id} value={promo.code}>
                          {promo.code} ({promo.discountPercentage}% endirim)
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={applyPromocode}
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                      disabled={loading}
                    >
                      {loading ? 'Yüklənir...' : 'Seç'}
                    </button>
                  </div>
                </div>
              )}

              {promocode && (
                <p className="mt-2 text-green-600">
                  Aktiv promokod: <strong>{promocode}</strong> ({discount}% endirim)
                </p>
              )}
            </div>
          </div>
        )}

        {/* Məhsulların siyahısı */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Səbətinizdəki Məhsullar
          </h2>
          {renderProducts()}
        </div>

        {/* Ödəniş formu */}
        {sebet && sebet.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ödəniş məlumatları</h2>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">
                  Kart Sahibinin Adı
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Kart Nömrəsi</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">
                    Bitmə Tarixi
                  </label>
                  <input
                    type="text"
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleInputChange}
                    required
                    placeholder="MM/YY"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="w-1/3">
                  <label className="block text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    placeholder="XXX"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 w-full bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors mt-4"
                disabled={loading}
              >
                {loading ? 'Yüklənir...' : 'Ödənişi Tamamla'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
