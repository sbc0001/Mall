import {configureStore, createSlice} from '@reduxjs/toolkit'
import {legacy_createStore as createStore} from 'redux'

const store=configureStore({
    reducer:{
        products:{createSlice({name:pdt, initialState:{}, reducers:{data load}})},
        cartList:...,
    }
})

function reducer(){
    
}
const store=createStore(reducer);

export default store;