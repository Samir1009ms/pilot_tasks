import { createSlice } from "@reduxjs/toolkit";


const File = createSlice({
    name: 'file',
    initialState: {
        tableData: [],
        chartDataStatus: null || {},
        chartDataLen: null || {},
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
            state.chartDataStatus = action.payload
        },
        len: (state, action) => {
            state.chartDataLen = action.payload
        },
        setWTK: (state, action) => {
            state.wkt = action.payload
        },
        addData(state: any, action: { payload: any }) {
            const data = state.tableData
            data.push(action.payload)
            data.sort((a: any, b: any) => b.id - a.id)
            state.tableData = data
        }
    },
})

export const { setFile, setModal, status, setWTK, addData, len } = File.actions;
export default File.reducer;