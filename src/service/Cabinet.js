import axios from "axios";

async function GetCabinet(){
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Product")
    return res.data
}
export {GetCabinet}