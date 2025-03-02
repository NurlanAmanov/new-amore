import React from 'react';

function Location() {
  return (
    <section className="mb-20 mt-10">
      {/* Google Map */}
      <div id="map" className="relative h-[480px] overflow-hidden bg-cover bg-[50%] bg-no-repeat">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.838508028225!2d49.83652961792699!3d40.37856710336651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40306b2f4e1b7a35%3A0x21380cce0290b2b9!2s29%20May%20Park!5e0!3m2!1sen!2sus!4v1619524992238"
          width="100%" height="480" style={{ border: 1 }} allowFullScreen="" loading="lazy"></iframe>
      </div>

      {/* Section Title */}
      <p className='text-5xl font-medium text-center font-playfair p-6 bg-[#f2f2f2]'>
        Lokasiyalar
      </p>

      {/* Locations and Information */}
      <div className="w-[85%] mx-auto items-center flex justify-center mt-12">
      <div className="flex pt-[30px] xl:flex-nowrap flex-wrap  items-center justify-between w-full mx-auto gap-8">
            {/* Location Card: Məkan adı */}
            <div className="w-full lg:w-1/3 mb-12">
              <div className="flex items-center justify-start">
                <div className="shrink-0">
                  <i className="fa-solid fa-mug-hot" style={{ fontSize: '45px' }}></i>
                </div>
                <div className="ml-4">
                  <p className="mb-2 font-bold">Məkan adı</p>
                  <p className="text-sm text-neutral-500">Amore Coffee</p>
                </div>
              </div>
            </div>

            {/* Location Card: Address */}
            <div className="w-full lg:w-1/3 mb-12">
              <div className="flex items-center justify-start">
                <div className="shrink-0">
                  <i className="fa-sharp-duotone fa-solid fa-location-dot" style={{ fontSize: '45px' }}></i>
                </div>
                <div className="ml-4">
                  <p className="mb-2 font-bold">Address</p>
                  <p className="text-sm text-neutral-500">
                    AZ1130, Ganjlik Mall, 830-835 Fətəli Xan Xoyski, Bakı, Azerbaijan
                  </p>
                </div>
              </div>
            </div>

            {/* Location Card: Əlaqə məlumatları */}
            <div className="w-full lg:w-1/3 mb-12">
              <div className="flex items-center justify-start">
                <div className="shrink-0">
                  <i className="fa-solid fa-phone-volume" style={{ fontSize: '45px' }}></i>
                </div>
                <div className="ml-4">
                  <p className="mb-2 font-bold">Əlaqə məlumatları</p>
                  <p className="text-sm text-neutral-500">+994708009050</p>
                  <p className="text-sm text-neutral-500">Cavid.huseynovv28@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}

export default Location;
