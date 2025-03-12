import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Tracing() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // URL query string-dən orderId-ni götürürük
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId') || 'N/A';
  
  // Sifarişin statusları və vaxtlar üçün state
  const [currentStage, setCurrentStage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    preparing: 0,
    shipping: 0,
    delivering: 0,
    completed: 0
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [addressData, setAddressData] = useState(null);
  
  // Mərhələlər
  const stages = [
    { id: 'preparing', label: 'Hazırlanır', icon: '📦', completed: false },
    { id: 'shipping', label: 'Yolda', icon: '🚚', completed: false },
    { id: 'delivering', label: 'Çatdırılır', icon: '🔔', completed: false },
    { id: 'completed', label: 'Tamamlandı', icon: '✅', completed: false }
  ];

  // Təsadüfi vaxtlar təyin etmək üçün funksiya
  const generateRandomTimes = () => {
    // Hər mərhələ üçün təsadüfi dəqiqələr (3-10 dəqiqə arası)
    const preparingTime = Math.floor(Math.random() * 8) + 3;
    const shippingTime = Math.floor(Math.random() * 8) + 5;
    const deliveringTime = Math.floor(Math.random() * 5) + 3;
    
    return {
      preparing: preparingTime * 60, // saniyəyə çeviririk
      shipping: shippingTime * 60,
      delivering: deliveringTime * 60,
      completed: 10 // tamamlanmış statusu üçün kiçik bir vaxt
    };
  };

  // Vaxtları yenidən təyin etmək və başlatmaq
  useEffect(() => {
    if (!isInitialized) {
      // Başlanğıcda təsadüfi vaxtları təyin et
      const randomTimes = generateRandomTimes();
      setTimeRemaining(randomTimes);
      setIsInitialized(true);
    }
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const currentStageId = stages[currentStage].id;
        const newTimes = { ...prev };
        
        if (newTimes[currentStageId] > 0) {
          newTimes[currentStageId] -= 1;
        }
        
        // Cari mərhələnin vaxtı bitdikdə
        if (newTimes[currentStageId] === 0 && currentStage < stages.length - 1) {
          // Cari mərhələni tamamla
          const updatedStages = [...stages];
          updatedStages[currentStage].completed = true;
          
          // Növbəti mərhələyə keç
          setCurrentStage(currentStage + 1);
          
          // Yeni təsadüfi vaxtları təyin et
          const newRandomTimes = generateRandomTimes();
          setTimeRemaining(newRandomTimes);
        }
        
        return newTimes;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isInitialized, currentStage, stages]);
  
  // Zaman formatını düzgün formatda göstərmək üçün
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  // Progress hesablamaq
  const calculateProgress = () => {
    // Ümumi vaxt
    const totalTime = Object.values(timeRemaining).reduce((a, b) => a + b, 0);
    const elapsedTime = 
      (timeRemaining.preparing === 0 ? stages[0].completed ? (generateRandomTimes().preparing) : 0 : 0) +
      (timeRemaining.shipping === 0 ? stages[1].completed ? (generateRandomTimes().shipping) : 0 : 0) +
      (timeRemaining.delivering === 0 ? stages[2].completed ? (generateRandomTimes().delivering) : 0 : 0) +
      (generateRandomTimes().preparing - (timeRemaining.preparing === 0 ? 0 : timeRemaining.preparing)) +
      (currentStage > 0 ? (generateRandomTimes().shipping - (timeRemaining.shipping === 0 ? 0 : timeRemaining.shipping)) : 0) +
      (currentStage > 1 ? (generateRandomTimes().delivering - (timeRemaining.delivering === 0 ? 0 : timeRemaining.delivering)) : 0);
    
    return Math.min(100, Math.max(0, Math.floor((elapsedTime / (totalTime + elapsedTime)) * 100)));
  };
  
  const handleGoToCabinet = () => {
    navigate('/cabinet');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-6">Sifarişinizin İzləmə Səhifəsi</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        
        {/* Mərhələlərin progress barı */}
        <div className="relative flex items-center justify-between mb-8">
          {stages.map((stage, index) => {
            const isActive = index <= currentStage;
            const isCurrentStage = index === currentStage;
            
            return (
              <div key={stage.id} className="flex flex-col items-center relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg mb-2 ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                } ${isCurrentStage ? 'ring-4 ring-blue-200' : ''}`}>
                  {stage.icon}
                </div>
                <span className={`text-sm ${isActive ? 'font-medium text-blue-800' : 'text-gray-500'}`}>
                  {stage.label}
                </span>
                {isCurrentStage && timeRemaining[stage.id] > 0 && (
                  <span className="absolute -bottom-6 text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {formatTime(timeRemaining[stage.id])}
                  </span>
                )}
              </div>
            );
          })}
          
          {/* Xətt bağlantıları */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          <div 
            className="absolute top-6 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-300" 
            style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        {/* Təxmini çatdırılma vaxtı */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <p className="text-blue-800">
            <span className="font-bold">Təxmini çatdırılma vaxtı:</span> 
            {currentStage === stages.length - 1 ? ' Çatdırıldı' : 
              ` ${formatTime(
                timeRemaining.preparing + 
                timeRemaining.shipping + 
                timeRemaining.delivering
              )}`
            }
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to={'/cabinet'}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Kabinetə qayıt
        </Link>
        
        <Link className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
          Dəstək ilə əlaqə
        </Link>
      </div>
    </div>
  );
}

export default Tracing;
