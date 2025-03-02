import React, { useContext } from 'react'
import { DATA } from '../../Context/Datacontext'
import { Link } from 'react-router-dom'

function Abouthome() {
const {slogan}=useContext(DATA)
  return (
    <>
    
    
    <section className='about py-[50px] bg-[#f7f7f7]'>
<p className='text-3xl font-[600] text-center'>Haqqımızda</p>
<hr className='h-[50px] w-[3px] my-6 mx-auto bg-[#db9457]'/>
<div className="content text-center">
<p className="text-gray-700 text-lg leading-relaxed text-center px-4 lg:px-0 xl:w-[50%] mx-auto font-playfair font-light">
       {slogan && slogan.map((item)=>{
        return(
            <span>{item.description}</span>
        )
       })}
      </p>
      <Link to="/about" className=' text-black rounded-lg hover:text-[#de9f69] duration-300 mx-auto w-[150px]  py-3 block mt-12'>Daha çox öyrən....</Link>
</div>
</section>
    </>
  )
}

export default Abouthome