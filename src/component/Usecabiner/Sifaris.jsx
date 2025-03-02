import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sifaris() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' - təzədən köhnəyə, 'asc' - köhnədən təzəyə
    
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        async function fetchData() {
            try {
                // First get user profile
                const userResponse = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                const userId = userResponse.data.id;
                console.log('UserID:', userId);
                
                // Fetch orders
                const ordersResponse = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Order/my-orders', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                // Ordersların içində tarix varsa, ona görə sıralayırıq
                // Əgər orders obyektlərinin içində createdAt və ya date kimi sahə varsa
                // API-dan gələn datanın strukturuna uyğun olaraq dəyişdirin
                const sortedOrders = [...ordersResponse.data].sort((a, b) => {
                    // Burada createdAt və ya başqa bir tarix sahəsi olduğunu fərz edirik
                    // Bu sahəni API-nızın qaytardığı məlumatın strukturuna uyğun dəyişin
                    const dateA = new Date(a.createdAt || a.date || 0);
                    const dateB = new Date(b.createdAt || b.date || 0);
                    
                    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                });
                
                setOrders(sortedOrders);
                setLoading(false);
            } catch (error) {
                console.error("API çağırışında xəta:", error);
                setError(error.response ? error.response.data : 'Xəta baş verdi');
                setLoading(false);
            }
        }
        
        fetchData();
    }, [token, sortOrder]);

    // Function to combine identical products in an order
    const combineIdenticalProducts = (orderProducts) => {
        if (!orderProducts || !Array.isArray(orderProducts)) return [];
        
        const combinedProducts = {};
        
        orderProducts.forEach(item => {
            if (!item.product) return;
            
            const productId = item.product.id;
            
            if (combinedProducts[productId]) {
                combinedProducts[productId].quantity += item.quantity || 1;
            } else {
                combinedProducts[productId] = {
                    ...item,
                    quantity: item.quantity || 1
                };
            }
        });
        
        return Object.values(combinedProducts);
    };

    // Pagination funksiyaları
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Tarix mövcud deyil';
        const date = new Date(dateString);
        return date.toLocaleDateString('az-AZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <p>Məlumatlar yüklənir...</p>;
    }
    
    if (error) {
        return <p>Xəta: {JSON.stringify(error)}</p>;
    }
    
    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Sifariş Detalları</h2>
                <button 
                    onClick={toggleSortOrder}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {sortOrder === 'desc' ? 'Köhnədən təzəyə sırala' : 'Təzədən köhnəyə sırala'}
                </button>
            </div>
            
            {currentOrders.length > 0 ? (
                <div>
                    {currentOrders.map(order => {
                        const combinedProducts = combineIdenticalProducts(order.orderProducts);
                        
                        return (
                            <div key={order.id} className="mb-8 border p-4 rounded-lg shadow-sm">
                                <div className="mb-2 text-sm text-gray-600">
                                  
                                    <p>Tarix: {formatDate(order.createdAt || order.date)}</p>
                                    {order.status && <p>Status: {order.status}</p>}
                                </div>
                                
                                <table className="min-w-full border mb-4">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-4 text-left text-sm font-semibold text-black">Məhsullar</th>
                                            <th className="p-4 text-left text-sm font-semibold text-black">Qiymət</th>
                                            <th className="p-4 text-left text-sm font-semibold text-black">Endirim</th>
                                            <th className="p-4 text-left text-sm font-semibold text-black">Son Qiymət</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {combinedProducts.map((orderItem) => (
                                            <tr key={orderItem.id}>
                                                <td className="p-4 text-sm">
                                                    {orderItem.product && (
                                                        <div className="flex items-center">
                                                            <img
                                                                src={`https://finalprojectt-001-site1.jtempurl.com${orderItem.product.imgUrl}`}
                                                                alt={orderItem.product.title}
                                                                className="w-10 h-10 object-cover mr-2"
                                                            />
                                                            <p>{orderItem.product.title} x {orderItem.quantity}</p>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-4 text-sm">
                                                    {orderItem.product ? 
                                                        (orderItem.product.price * orderItem.quantity).toFixed(2) : 0} ₼
                                                </td>
                                                <td className="p-4 text-sm">
                                                    {orderItem.product ? 
                                                        `${orderItem.product.discount}%` : '0%'}
                                                </td>
                                                <td className="p-4 text-sm">
                                                    {orderItem.product ? 
                                                        (orderItem.product.finalPrice * orderItem.quantity).toFixed(2) : 0} ₼
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-50">
                                            <td colSpan="3" className="p-4 text-sm font-semibold text-right">Ümumi Məbləğ:</td>
                                            <td className="p-4 text-sm font-semibold">
                                                {combinedProducts.reduce((total, item) => 
                                                    total + (item.product?.finalPrice * item.quantity || 0), 0).toFixed(2)} ₼
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                    
                    {/* Pagination */}
                    <div className="flex justify-center mt-6">
                        <nav className="flex items-center">
                            <button 
                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 mr-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}
                            >
                                Əvvəlki
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`px-3 py-1 mx-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            
                            <button 
                                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 ml-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}
                            >
                                Növbəti
                            </button>
                        </nav>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Sifariş məlumatları mövcud deyil.</p>
            )}
        </div>
    );
}

export default Sifaris;