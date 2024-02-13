import { createContext, useEffect, useState } from "react";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import SHOP_DATA from '../shop-data.js';

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    //Transaction from shop-data.js to Firestore DB (execute only one time after comment this code)
    /*
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA)
    }, []); 
    */
   useEffect(() => {
    const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        console.log(categoryMap)
        setCategoriesMap(categoryMap)
    }
    getCategoriesMap();
   }, [])

    const value = { categoriesMap };
    return(
        <CategoriesContext.Provider value = {value}> {children} </CategoriesContext.Provider>
    )
}