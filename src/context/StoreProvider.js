import React from 'react';
import { useReducer , useContext, createContext } from "react";
import initialState from "./initialState";
import rootReducer from "./rootReducer";
const StoreContext = createContext();

const StoreProvider = ({children}) => 
    <StoreContext.Provider value={useReducer(rootReducer, initialState)}>
        {children}
    </StoreContext.Provider>

const useGlobalState = () => useContext(StoreContext)[0] //store
const useDispatch = () => useContext(StoreContext)[1] //dispatch

export { StoreContext , useGlobalState, useDispatch }
export default StoreProvider;
