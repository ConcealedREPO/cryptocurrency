import React, { createContext,useContext, useState, useEffect } from 'react'


const CryptoContext = createContext();

const ContextAPI = ({children}) => {

    // Setting the currency denomination
    const [currency, setCurrency] = useState('USD');
    const [cur_symbol, setCurrSymbol] = useState('$');


    useEffect(() => {
        if (currency === 'USD') { setCurrSymbol('$'); }
        else { setCurrSymbol('RM'); }
    }, [currency])

  return <CryptoContext.Provider value = {{currency, cur_symbol, setCurrency}} > {children} </CryptoContext.Provider>
}

export default ContextAPI
export const CryptoState = () => { return useContext(CryptoContext); }