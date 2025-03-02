
  import img from '../../assets/images/1.jpg'
  import img2 from '../../assets/images/2.jpg'
  import img3 from '../../assets/images/3.jpg'
  import img4 from '../../assets/images/4.jpg'
  import img5 from '../../assets/images/5.jpg'
  

  export default function Gallery() {
    return (
    
        <a 
           
            href="https://www.instagram.com/Cavid.Huseynovvv/" 
            target="_blank" 
            rel="noopener noreferrer"
             className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center justify-center"
          >
            <img
              src={img}
              alt="Sekiller"
              className="w-full h-[220px] hover:-translate-y-4 duration-300 ease-in object-cover"
            />
            <img
              src={img2}
              alt="Sekiller"
              className="w-full h-[220px] hover:-translate-y-4 duration-300 ease-in object-cover"
            />
            <img
              src={img3}
              alt="Sekiller"
              className="w-full h-[220px] hover:-translate-y-4 duration-300 ease-in object-cover"
            />
            <img
              src={img4}
              alt="Sekiller"
              className="w-full h-[220px] hover:-translate-y-4 duration-300 ease-in object-cover"
            />
            <img
              src={img4}
              alt="Sekiller"
              className="w-full h-[220px] hover:-translate-y-4 duration-300 ease-in object-cover"
            />
            <img
              src={img5}
              alt="Sekiller"
              className="w-full h-[220px] hover:-translate-y-4 duration-300 ease-in object-cover"
            />
          </a>
    );
  }
  