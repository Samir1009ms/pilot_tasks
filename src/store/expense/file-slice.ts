import { createSlice } from "@reduxjs/toolkit";


const File = createSlice({
    name: 'file',
    initialState: {
        tableData: [],
        chartData: null || {},
        modal: false,
        wkt: '',
    },
    reducers: {
        setFile: (state, action) => {
            // console.log(action.payload)
            const data = action.payload
            data.sort((a: any, b: any) => b.id - a.id)
            state.tableData = data;
            state.tableData.filter((item: any) => item.id !== action.payload)
        },
        setModal: (state, action) => {
            state.modal = action.payload
        },
        status: (state, action) => {
            state.chartData = action.payload
        },
        setWTK: (state, action) => {
            state.wkt = action.payload
        }
    },
})

export const { setFile, setModal, status, setWTK } = File.actions;
export default File.reducer;