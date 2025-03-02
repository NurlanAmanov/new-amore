import React, { useContext } from 'react'
import { DATA } from '../../Context/Datacontext';
import { Link } from 'react-router-dom';
function Allcategory() {
    const { category } = useContext(DATA);
  return (
    <>
  <section className='py-[110px]'>
<h3 className='text-xl font-semibold text-center text-black'>Bütün kateqoriyalar</h3>
  <div className="grid px-2 pt-[50px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
      {category.slice(0, 4).map((item, i) => (
        <Link
          key={i}
          to={`/Product?category=${encodeURIComponent(item.name)}`}
          className="relative bg-gray-100 p-4 rounded-xl group overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-gray-300"
        >
          {/* 📌 Məhsul şəkli */}
          <div className="w-full h-[250px] overflow-hidden rounded-lg">
            <img
              src={`https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
              alt={item.name}
              className="w-full h-[220px] object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* 📌 Məhsulun adı (Şəkilin altına əlavə olunub) */}
          <div className="bg-gray-700 text-white text-center py-2 ">
            <h3 className="text-md font-semibold">{item.name}</h3>
          </div>
        </Link>
      ))}

    
    </div>
  </section>
    </>
  )
}

export default Allcategory