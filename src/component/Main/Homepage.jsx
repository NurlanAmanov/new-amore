import React from 'react'
import CoffeeSuggestion from './CoffeeSuggestion'
import Silder from './Silder'
import Category from './Category'
import Abouthome from './Abouthome'
import Gallery from './Gallery'
import galler1 from  "../../assets/images/666.png"
import galler2 from  "../../assets/images/77.png"
import galler3 from  "../../assets/images/99.png" 
import galler4 from  "../../assets/images/9.png"
import galler5 from  "../../assets/images/11.png"
import galler6 from  "../../assets/images/10.png"
import galler7 from  "../../assets/images/555.png"
import galler8 from  "../../assets/images/8.png"
import galler9 from  "../../assets/images/888.png"
import cofe from '../../assets/icon/koffe.png'
import menu from '../../assets/icon/menu.png'
import musderi from '../../assets/icon/musderi.png'
import barista from '../../assets/icon/Barista.png'
function Homepage() {


  return (
<>
<div className='bg-[#f1ece9] '>
<section className="silder">
<Silder />
</section>

<Abouthome/>

<section id='niyebiz' className='py-[60px]'>
<div className='flex items-center justify-center gap-4'> <hr className='border-[#CFA172] w-4  ' /> <h4 className='text-[24px] text-center text-[#CFA172]'>Niyə bizi seçməlisiz?</h4>   <hr className='border-[#CFA172] w-4  ' /> </div>

<div className="content p-6 flex items-center justify-center flex-wrap gap-12">
  <div className="card flex items-start justify-center w-full flex-col lg:flex-row gap-4 lg:w-[350px]">
    <img src={musderi} alt="koffe" className='w-[70px] object-cover' />
    <p className='text-[18px] text-[#4E5562] '>Müştərilərimiz üçün sadəcə qəhvə yox, eyni zamanda isti və rahat mühit yaradırıq. Rahat interyerimiz və mehriban heyətimiz ilə özünüzü evdəki kimi hiss edəcəksiniz.</p>
  </div>
  <div className="card flex items-start justify-center w-full flex-col lg:flex-row gap-4 lg:w-[350px]">
    <img src={barista} alt="koffe" className='w-[70px] object-cover' />
    <p className='text-[18px] text-[#4E5562] '>Baristalarımız hər fincanı sevgi və diqqətlə hazırlayır. Onların təcrübəsi və ustalığı sayəsində sizə ən yaxşı qəhvə təcrübəsini təqdim edirik.</p>
  </div>

  <div className="card flex items-start justify-center w-full flex-col lg:flex-row gap-4 lg:w-[350px]">
    <img src={cofe} alt="koffe" className='w-[70px] object-cover' />
    <p className='text-[18px] text-[#4E5562] '>Müştərilərimiz üçün sadəcə qəhvə yox, eyni zamanda isti və rahat mühit yaradırıq. Rahat interyerimiz və mehriban heyətimiz ilə özünüzü evdəki kimi hiss edəcəksiniz.</p>
  </div>
  <div className="card flex items-start justify-center w-full flex-col lg:flex-row gap-4 lg:w-[350px]">
    <img src={menu} alt="koffe" className='w-[70px] object-cover' />
    <p className='text-[18px] text-[#4E5562] '>Klassik qəhvələrdən tutmuş, xüsusi reseptlərə əsaslanan içkilərə qədər geniş seçimlərimiz var. Hər zövqə uyğun bir fincan tapacağınıza əminik!</p>
  </div>
</div>

</section>
<section className='catefory py-[50px] bg-white '>
 
<Category/>
</section>



<section className='encoxsatilan bg-white' >
<div className="max-w-5xl mx-auto lg:py-16 lg:px-36 overflow-hidden">
      <div className="grid grid-cols-3 ">
        
        {/* İlk 3 şəkil */}
        <img src={galler1} alt="Soyuq Kofe" className="w-full h-full object-cover hover:scale-[1.03] duration-300"/>
        <img src={galler2}alt="Rahat Künc" className="w-full h-full object-cover duration-300"/>
        <img src={galler3} alt="Dondurmalı Kofe" className="w-full h-full object-cover hover:scale-[1.03] duration-300"/>
        <img src={galler4} alt="Dondurmalı Kofe" className="w-full h-full object-cover duration-300"/>

        {/* Mərkəzdə Başlıq */}
        <div className="flex items-center justify-center bg-gray-200 text-center text-xl font-semibold rounded-lg">
        <img src={galler5} alt="Dondurmalı Kofe" className="w-full h-full object-cover hover:scale-[1.03] duration-300"/>

        </div>

        {/* Son 5 şəkil */}
        <img src={galler6} alt="Şam və Kofe" className="w-full h-full object-cover duration-300"/>
        <img src={galler7} alt="Şam və Kofe" className="w-full h-full object-cover hover:scale-[1.03] duration-300"/>
        <img src={galler8} alt="Şam və Kofe" className="w-full h-full object-cover duration-300"/>
        <img src={galler9} alt="Şam və Kofe" className="w-full h-full object-cover hover:scale-[1.03] duration-300"/>

      

      </div>
    </div>
</section>
<section>
<CoffeeSuggestion/>
</section>
<section className='followinsta bg-white py-[50px]'>
  <p className='text-center text-[#DB9457] font-playfair'>@AmoreCoffee</p>
  <h3 className='text-5xl font-playfair font-extralight text-center p-2 pb-8'>
  Instagramda bizi izlə
</h3>

<div className="grid grid-cols-1 items-center justify-center">
  {Array(1).fill("").map((_, index) => (
       <Gallery />
  ))}
</div>


</section>
</div>
</>
  )
}

export default Homepage