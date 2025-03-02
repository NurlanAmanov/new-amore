import axios from "axios";


async function GetCategory() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Category");
    return res.data;
}

async function GetProduct() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Product");
    return res.data;
}
async function GetProductById(id) {

        const res = await axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Product/${id}`);
        return res.data; 
  
}

async function Getbanner() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/HeadBanners")
    return res.data;

}
async function Getsilder() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Slider")
    return res.data;

}
async function Getslogan() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Slogan")
    return res.data;

}
async function GetSocialMedia() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/SocialMedia")
    return res.data;

}

async function GetLogo() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Logo")
    return res.data;

}
async function GetLocation() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Location")
    return res.data;

}
async function GetAuth() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Auth")
    return res.data;

}



export { GetCategory, GetProduct, Getbanner,GetSocialMedia,GetLogo,Getslogan,Getsilder,GetLocation,GetProductById,GetAuth }