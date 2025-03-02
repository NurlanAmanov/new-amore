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
  

  
  // Vaxtları azaltmaq və statusları dəyişmək
  useEffect(() => {
    if (!isInitialized) return;
    
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
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg">
            Sifariş ID: <span className="font-bold">{orderId}</span>
          </p>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {stages[currentStage].label}
          </div>
        </div>
        
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
      
      {/* Xəritə və avtomobil animasiyası */}
      <div className="relative mx-auto w-full max-w-4xl bg-gray-50 p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Canlı İzləmə</h2>
        <svg viewBox="0 0 800 300" className="w-full h-auto">
          <defs>
            {/* Daha realistik marşrut */}
            <path id="route" d="M100,250 C150,250 200,100 300,100 S450,150 500,150 S650,200 700,200" />
            
            {/* Daha detallı avtomobil */}
            <g id="car">
              <rect x="-15" y="-8" width="30" height="16" rx="3" fill="#4285F4" />
              <rect x="-12" y="-6" width="24" height="8" rx="1" fill="#A5CAF0" />
              <circle cx="-9" cy="8" r="4" fill="#333" />
              <circle cx="-9" cy="8" r="2" fill="#666" />
              <circle cx="9" cy="8" r="4" fill="#333" />
              <circle cx="9" cy="8" r="2" fill="#666" />
            </g>
            
            {/* Başlanğıc nöqtəsi */}
            <g id="startPoint">
              <circle cx="0" cy="0" r="10" fill="#4CAF50" />
              <circle cx="0" cy="0" r="5" fill="white" />
            </g>
            
            {/* Son nöqtə */}
            <g id="endPoint">
              <circle cx="0" cy="0" r="10" fill="#F44336" />
              <path d="M-5,-5 L5,5 M-5,5 L5,-5" stroke="white" strokeWidth="2" />
            </g>
          </defs>
          
          {/* Xəritə arxa planı */}
          <rect width="800" height="300" fill="#E6EAF0" rx="10" />
          
          {/* Yollar */}
          <path d="M50,50 H750" stroke="#CCC" strokeWidth="5" strokeDasharray="5,5" />
          <path d="M50,150 H750" stroke="#CCC" strokeWidth="5" strokeDasharray="5,5" />
          <path d="M50,250 H750" stroke="#CCC" strokeWidth="5" strokeDasharray="5,5" />
          <path d="M150,20 V280" stroke="#CCC" strokeWidth="5" strokeDasharray="5,5" />
          <path d="M350,20 V280" stroke="#CCC" strokeWidth="5" strokeDasharray="5,5" />
          <path d="M550,20 V280" stroke="#CCC" strokeWidth="5" strokeDasharray="5,5" />
          
          {/* Marşrut */}
          <use href="#route" fill="none" stroke="#0077CC" strokeWidth="3" strokeDasharray="10,5" />
          
          {/* Avtomobil animasiyası - mərhələyə görə hərəkət edir */}
          <use href="#car">
            <animateMotion 
              dur="10s" 
              repeatCount="indefinite" 
              keyPoints={`0;${Math.min(1, (calculateProgress() / 100))}`}
              keyTimes="0;1"
              calcMode="linear"
            >
              <mpath href="#route" />
            </animateMotion>
          </use>
          
          {/* Başlanğıc nöqtəsi */}
          <use href="#startPoint" x="100" y="250" />
          
          {/* Son nöqtə */}
          <use href="#endPoint" x="700" y="200" />
          
          {/* Mətn etiketləri */}
          <text x="80" y="280" fill="#333" fontWeight="bold" fontSize="14">Amore</text>
          <text x="700" y="230" fill="#333" fontWeight="bold" fontSize="14">Siz</text>
        </svg>
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