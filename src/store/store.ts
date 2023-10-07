import {configureStore} from "@reduxjs/toolkit";
import fileSlice from "./expense/file-slice";

const fileStore=configureStore({
    reducer:{
        FileSlice:fileSlice
    }
})

export  default fileStore;