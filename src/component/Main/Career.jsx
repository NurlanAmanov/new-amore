import React from 'react'
import ContactForm from './Contactfomr'
import CareerForm from './CareerForm'


function Career() {
    return (
        <>
            <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-100 rounded-full -translate-x-20 -translate-y-20"></div>
                        <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-100 rounded-full translate-x-20 translate-y-20"></div>
                        <div className="absolute top-1/4 right-0 w-20 h-20 bg-indigo-200 rounded-full translate-x-10"></div>
                        
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 overflow-hidden">
                            {/* Left column - Image and Contact Info */}
                            <div className="lg:col-span-2">
                                <div className="h-full">
                                    <div className="relative h-full">
                                        <img
                                            src="https://t3.ftcdn.net/jpg/08/60/49/00/360_F_860490078_2emFlcNqj87Ew02xbYmduVboCPVRGNgp.jpg"
                                            alt="Təklif Göndər Tailwind Bölməsi"
                                            className="w-full h-full min-h-[500px] object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 to-purple-900/80"></div>
                                        
                                        {/* Content overlay */}
                                        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                                        <div className="text-center px-4">
  <h1 className="font-manrope text-white text-3xl md:text-5xl font-bold leading-tight text-shadow">
    Karyeranızın <br />
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      Növbəti Mərhələsinə Addım Atın
    </span>
  </h1>
  <p className="text-white text-lg mt-6 max-w-lg mx-auto opacity-90">
    Bacarıqlarınızı və təcrübənizi inkişaf etdirmək üçün bizə qoşulun. 
    İdeal iş fürsətləri və karyera imkanları sizi gözləyir.
  </p>
</div>

                                            
                                            <div className="mt-8">
                                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                                                    <h3 className="text-white font-semibold text-xl mb-6">Əlaqə Məlumatları</h3>
                                                    <a href="tel:+14706011911" className="flex items-center mb-6 text-white hover:text-indigo-200 transition-colors duration-300">
                                                        <div className="bg-white/10 p-3 rounded-full">
                                                            <svg
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 30 30"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <h5 className="text-base font-normal leading-6 ml-4">
                                                            +994708009050
                                                        </h5>
                                                    </a>
                                                    <a href="mailto:Pagedone1234@gmail.com" className="flex items-center mb-6 text-white hover:text-indigo-200 transition-colors duration-300">
                                                        <div className="bg-white/10 p-3 rounded-full">
                                                            <svg
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 30 30"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <h5 className="text-base font-normal leading-6 ml-4">
                                                        Cavid.huseynovv28@gmail.com
                                                        </h5>
                                                    </a>
                                                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-indigo-200 transition-colors duration-300">
                                                        <div className="bg-white/10 p-3 rounded-full">
                                                            <svg
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 30 30"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M25 12.9169C25 17.716 21.1939 21.5832 18.2779 24.9828C16.8385 26.6609 16.1188 27.5 15 27.5C13.8812 27.5 13.1615 26.6609 11.7221 24.9828C8.80612 21.5832 5 17.716 5 12.9169C5 10.1542 6.05357 7.5046 7.92893 5.55105C9.8043 3.59749 12.3478 2.5 15 2.5C17.6522 2.5 20.1957 3.59749 22.0711 5.55105C23.9464 7.5046 25 10.1542 25 12.9169Z"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                />
                                                                <path
                                                                    d="M17.5 11.6148C17.5 13.0531 16.3807 14.219 15 14.219C13.6193 14.219 12.5 13.0531 12.5 11.6148C12.5 10.1765 13.6193 9.01058 15 9.01058C16.3807 9.01058 17.5 10.1765 17.5 11.6148Z"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <h5 className="text-base font-normal leading-6 ml-4">
                                                        AZ1130, Ganjlik Mall, 830-835 Fətəli Xan Xoyski, Bakı, Azerbaijan

                                                        </h5>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right column - Contact Form */}
                            <div className="lg:col-span-3 p-8 md:p-16 relative z-10 mt-[60px]">
                            <div className="max-w-lg mx-auto">
  <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-manrope text-3xl md:text-4xl font-bold leading-tight mb-6">
    Karyeranızın Növbəti Mərhələsinə Addım Atın
  </h2>
  <p className="text-gray-600 mb-10 text-lg">
    CV-nizi və karyera məlumatlarınızı göndərin, ən qısa zamanda sizinlə əlaqə saxlayacağıq.
  </p>
  
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
 <CareerForm/>
  </div>
  
  <div className="mt-8 text-center">
    <p className="text-gray-500 text-sm">
      Göndərdiyiniz bütün məlumatlar məxfidir və təhlükəsiz şəkildə saxlanılır.
    </p>
  </div>
</div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Career