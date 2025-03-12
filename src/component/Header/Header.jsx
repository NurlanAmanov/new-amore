import  { useContext, useEffect, useState } from 'react';
import Cart from '../Main/Cart';
import spotifyIcon from '../../assets/icon/spotify.png';
import { Link, useNavigate } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaUser, FaMapMarkerAlt, FaInfoCircle, FaLightbulb } from "react-icons/fa";
import { DATA } from '../../Context/Datacontext';
import Loginpage from '../../login/Loginpage';
import { BASKET } from '../../Context/BasketContext';
import { useAuth } from '../../Context/Authlogin';
import SpotifyPlayer from './ui/SpotifyPlayer/SpotifyPlayer';

function Header() {
    const { user } = useAuth();
    const { banner, logo } = useContext(DATA);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [opensebet, setOpensebet] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSpotifyModalOpened, toggleSpotifyModal] = useState(false)

    const { sebet } = useContext(BASKET);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleProfileClick = () => {
        if (user) {
            navigate("/cabinet");
        } else {
            setIsProfileOpen(true);
        }
    };

    // Scroll hadisəsini izləmək üçün
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen || isProfileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen, isProfileOpen]);

    return (
        <>
            <div
            className={`relative ${isSpotifyModalOpened ? 'z-50 opacity-100' : '-z-10 opacity-0'} transition-opacity duration-500`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            onClick={() => toggleSpotifyModal(false)}
            >
            <div
                aria-hidden="true"
                onClick={() => toggleSpotifyModal(false)}
                className="fixed inset-0 bg-[#535600]/65 transition-opacity"
            ></div>

            <div
                className="fixed inset-0 z-10 w-screen overflow-y-auto"
                onClick={() => toggleSpotifyModal(false)}
            >
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <SpotifyPlayer />
                </div>
            </div>
            </div>
            {/* Top Banner */}
            {banner && banner.map((item, i) => (
                <>
                
                <div key={i} className="flex flex-row items-center justify-center bg-gradient-to-r from-[#1a1a2e] to-[#242434] text-white px-6 h-[40px] py-2  max-sm:gap-2 text-center">
               <button onClick={() => toggleSpotifyModal(!isSpotifyModalOpened)} className="icon outline-none border-none "> <img src={spotifyIcon} className="w-[25px] h-[25px] object-contain max-sm:w-[20px] max-sm:h-[20px]" alt="Spotify icon" /></button>
                 <div className="text lg:w-[50%] flex items-center justify-center mx-auto">
                 <p className="text-[14px] font-light max-sm:text-[12px] max-sm:px-4">{item.description}</p>
                 </div>
                </div>

                </>

            ))}

            {/* Main Header */}
            <header className={`w-full  sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-[#f8f5f2]'}`}>
                <div className="container mx-auto max-w-screen-xl px-6">
                    <div className="flex items-center justify-between w-full mx-auto py-4">
                        {/* Desktop Navigation */}

                        <nav className="hidden xl:flex items-center gap-8">
                            <Link to="/" className="flex items-center justify-center ">
                                {logo.map((item, index) => (
                                    <img
                                        key={index}
                                        src={`https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
                                        alt="Logo"
                                        className={`h-[90px] w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-[50px]' : 'h-[60px]'}`}
                                    />
                                ))}
                            </Link>
                            <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-[#de9f69] text-[16px] font-medium transition-colors duration-300">

                                <span>Əsas səhifə</span>
                            </Link>
                            <Link to="/about" className="flex items-center gap-2 text-gray-700 hover:text-[#de9f69] text-[16px] font-medium transition-colors duration-300">

                                <span>Haqqımızda</span>
                            </Link>
                            <Link to="/lokasiya" className="flex items-center gap-2 text-gray-700 hover:text-[#de9f69] text-[16px] font-medium transition-colors duration-300">

                                <span>Ünvanlar</span>
                            </Link>
                            <Link to="/Allcategory" className="flex items-center gap-2 text-gray-700 hover:text-[#de9f69] text-[16px] font-medium transition-colors duration-300">

                                <span>Kateqoriyalar</span>
                            </Link>
                            <Link to="/teklif" className="flex items-center gap-2 text-gray-700 hover:text-[#de9f69] text-[16px] font-medium transition-colors duration-300">

                                <span>Bizə təklif göndər</span>
                            </Link>
                        </nav>




                        {/* Right Side Actions */}
                        <div className="xl:flex items-center gap-6 hidden ">
                            <div className="relative group">
                                <div className="p-2 rounded-full transition-colors duration-300 group-hover:bg-gray-100 cursor-pointer" onClick={() => setOpensebet(true)}>
                                    <GiShoppingCart className="text-xl text-gray-700" />
                                    {sebet.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-all duration-300 animate-pulse">
                                            {sebet.length}
                                        </span>
                                    )}
                                </div>
                                <span className="absolute z-30 -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Səbətim
                                </span>
                            </div>


                            {/* Profile Button with hover effect */}
                            <div id="profile-dropdown" className="relative group">
                                <div className="p-2 rounded-full transition-colors duration-300 group-hover:bg-gray-100 cursor-pointer" onClick={handleProfileClick}>
                                    <FaUser className={`text-lg ${user ? 'text-[#de9f69]' : 'text-gray-700'}`} />
                                </div>
                                <span className="absolute z-30 -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {user ? 'Profilim' : 'Daxil ol'}
                                </span>
                            </div>
                            <Link
                                to="Allcategory"
                                className={`rounded-full font-medium flex items-center justify-center transition-all duration-300 ${isScrolled
                                        ? 'bg-[#de9f69] text-white px-6 py-2 hover:bg-[#c48951]'
                                        : 'border-2 border-[#de9f69] text-[#de9f69] px-5 py-1.5 hover:bg-[#de9f69] hover:text-white'
                                    }`}
                            >
                                Sifariş et
                            </Link>
                            {/* Cart Button with animations */}

                            {/* Mobile Menu Button */}
                            <div className="xl:hidden relative group">
                                <div className="p-2 rounded-full transition-colors duration-300 group-hover:bg-gray-100 cursor-pointer" onClick={toggleMenu}>
                                    <IoMenu className="text-2xl text-gray-700" />
                                </div>
                            </div>
                        </div>
                        <Link to="/" className="flex items-center justify-center xl:hidden ">
                            {logo.map((item, index) => (
                                <img
                                    key={index}
                                    src={`https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
                                    alt="Logo"
                                    className={`h-[60px] w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-[50px]' : 'h-[60px]'}`}
                                />
                            ))}
                        </Link>

                        <div className="xl:hidden  items-center gap-6 justify-end flex w-full">



                            <div className="relative group">
                                <div className="p-2 rounded-full transition-colors duration-300 group-hover:bg-gray-100 cursor-pointer" onClick={() => setOpensebet(true)}>
                                    <GiShoppingCart className="text-xl text-gray-700" />
                                    {sebet.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-all duration-300 animate-pulse">
                                            {sebet.length}
                                        </span>
                                    )}
                                </div>
                                <span className="absolute z-30 -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Səbətim
                                </span>
                            </div>
                            <div id="profile-dropdown" className="relative group">

                            
                                <span className="absolute z-30 -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {user ? 'Profilim' : 'Daxil ol'}
                                </span>
                            </div>
                 
                            <div className="xl:hidden relative group">
                                <div className="p-2 rounded-full transition-colors duration-300 group-hover:bg-gray-100 cursor-pointer" onClick={toggleMenu}>
                                    <IoMenu className="text-2xl text-gray-700" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* Mobile Side Menu */}
            <div className={`fixed inset-0 bg-black bg-opacity-40 z-50 backdrop-blur-sm flex justify-end transition-opacity duration-300 
                ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`bg-gradient-to-b from-[#7a461f] to-[#de9f69] w-3/4 sm:w-1/2 md:w-1/3 h-full rounded-l-xl shadow-2xl flex flex-col transition-transform 
                    duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                    {/* Mobile Menu Header */}
                    <div className="flex justify-between items-center p-6 border-b border-[#ffffff30]">
                        {logo.length > 0 && (
                            <img
                                src={`https://finalprojectt-001-site1.jtempurl.com${logo[0].imgUrl}`}
                                alt="Logo"
                                className="h-[40px] w-auto object-contain"
                            />
                        )}
                        <IoClose className="text-3xl text-white cursor-pointer hover:rotate-90 transition-all duration-300" onClick={toggleMenu} />
                    </div>

                    {/* Mobile Menu Links */}
                    <div className="flex flex-col p-6 space-y-6 mt-4">
                        <Link to="/" className="text-white text-lg font-medium hover:text-[#f8f5f2] transition-colors flex items-center gap-3" onClick={toggleMenu}>
                            <FaMapMarkerAlt className="text-white" />
                            Lokasiyalar
                        </Link>
                        <Link to="/about" className="text-white text-lg font-medium hover:text-[#f8f5f2] transition-colors flex items-center gap-3" onClick={toggleMenu}>
                            <FaInfoCircle className="text-white" />
                            Haqqımızda
                        </Link>
                        <Link to="/teklif" className="text-white text-lg font-medium hover:text-[#f8f5f2] transition-colors flex items-center gap-3" onClick={toggleMenu}>
                            <FaLightbulb className="text-white" />
                            Bizə təklif göndər
                        </Link>

                        {/* Order Button in Mobile Menu */}
                        <Link
                                to="Allcategory"
                                className={`rounded-full font-medium flex items-center justify-center transition-all duration-300 ${isScrolled
                                        ? 'bg-[#de9f69] text-white px-6 py-2 hover:bg-[#c48951]'
                                        : 'border-2 border-[#de9f69] text-[#de9f69] px-5 py-1.5 hover:bg-[#de9f69] hover:text-white'
                                    }`}
                            >
                                Sifariş et
                            </Link>
                    </div>

                    {/* User Info Section */}
                    <div className="mt-auto p-6 border-t border-[#ffffff30]">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <FaUser className="text-[#7a461f]" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Xoş gəlmisiniz</p>
                                    <Link to="/cabinet" className="text-sm text-white underline" onClick={toggleMenu}>Profilə keçin</Link>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                                onClick={() => {
                                    setIsProfileOpen(true);
                                    setIsMenuOpen(false);
                                }}
                            >
                                <FaUser />
                                Daxil olun
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            {!user && isProfileOpen && <Loginpage toggleProfile={() => setIsProfileOpen(false)} />}

            {/* Cart Component */}
            <Cart opensebet={opensebet} setOpensebet={setOpensebet} />
        </>
    );
}

export default Header;