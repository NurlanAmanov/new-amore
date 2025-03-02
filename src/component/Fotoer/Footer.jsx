import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import fb from '../../assets/icon/facebook.png';
import insta from '../../assets/icon/instagram.png';
import linkedin from '../../assets/icon/linkedin.png';
import twlogo from '../../assets/icon/twlogo.png';
import { DATA } from '../../Context/Datacontext';

function Footer() {
  const { socailmedia } = useContext(DATA);

  return (
    <>
      <footer className="bg-[#333333] p-5">
        <div className="footer-conent flex items-center justify-between p-3 xl:flex-row flex-col gap-2">
          <div className="social flex items-center justify-center gap-3">
            {socailmedia &&
              socailmedia.map((item, i) => (
                <React.Fragment key={i}>
                  <a href={item.facebookUrl}>
                    <img src={fb} className="w-[30px] object-cover" alt="facebook" />
                  </a>
                  <a href={item.instagramUrl}>
                    <img src={insta} className="w-[30px] object-cover" alt="instagram" />
                  </a>
                  <a href={item.linkedinUrl}>
                    <img src={linkedin} className="w-[30px] object-cover" alt="linkedin" />
                  </a>
                  <a href={item.twitterUrl}>
                    <img src={twlogo} className="w-[30px] object-cover" alt="twitter" />
                  </a>
                </React.Fragment>
              ))}
          </div>
          <div className="text">
            <ul className="text-white flex items-center justify-center gap-4">
              <li className="relative group">
                <a href="#" className="transition-colors duration-300 group-hover:text-[#db9457]">
                  Məxfilik siyasəti
                </a>
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a href="#" className="transition-colors duration-300 group-hover:text-[#db9457]">
                  Karyer
                </a>
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a href="#" className="transition-colors duration-300 group-hover:text-[#db9457]">
                  Əlaqə
                </a>
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
