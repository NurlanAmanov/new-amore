import React, { createContext, useEffect, useState } from 'react';
import { Getbanner, GetCategory, GetLogo, GetProduct, GetProductById, Getsilder, Getslogan, GetSocialMedia } from '../service/api';

export const DATA = createContext([]);

function Datacontext({ children }) {
    const [category, setCategory] = useState([]);
    const [mehsul, setMehsul] = useState([]);
    const [mehsulid, setMehsulid] = useState(null); // ID ilə məhsulu saxlayan state
    const [banner, setbanner] = useState([]);
    const [slogan, setSlogan] = useState([]);
    const [logo, setLogo] = useState([]);
    const [silder, setSilder] = useState([]);
    const [socailmedia, setMedia] = useState([]);

    useEffect(() => {
        GetCategory().then(res => setCategory(res));
        GetProduct().then(res => setMehsul(res));
        Getbanner().then(res=>setbanner(res))
        Getslogan().then(res=>setSlogan(res))
        GetLogo().then(res=>setLogo(res))
        GetSocialMedia().then(res=>setMedia(res))
        Getsilder().then(res=>setSilder(res))
    }, []);

    // ID ilə məhsulu gətirmək üçün funksiya
    const fetchProductById = async (id) => {
        try {
            const res = await GetProductById(id);
            setMehsulid(res);
        } catch (error) {
            console.error("Məhsul tapılmadı:", error);
        }
    };

    return (
        <DATA.Provider value={{ category, mehsul,banner, mehsulid, fetchProductById,slogan,logo,socailmedia,silder }}>
            {children}
        </DATA.Provider>
    );
}

export default Datacontext;