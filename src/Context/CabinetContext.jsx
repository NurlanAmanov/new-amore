import React, { createContext, useEffect, useState } from 'react'
import { GetCabinet } from '../service/Cabinet'
import { GetAuth } from '../service/api'


export const CABINETDATA = createContext([])
function CabinetDatam({ children }) {
    const [cabinetmehsul, setcabinetmehsul] = useState([])
    const [autcontent, setAuthcontent] = useState([])

    useEffect(() => {
        GetCabinet().then(res =>setcabinetmehsul(res))
        GetAuth().then(res =>setAuthcontent(res))
    },[]);

    return (
        <CABINETDATA.Provider value={{cabinetmehsul,autcontent }}>
            {children}
        </CABINETDATA.Provider>
    )
}

export default CabinetDatam