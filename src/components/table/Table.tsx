import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ReactTabulator } from "react-tabulator";
import { status, setModal, setWTK } from "../../store/expense/file-slice";
import s from './styles.module.scss'
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';

import Qeydmodal from "../modal/Qeydmodal";
import { Button } from 'antd';
import BarCharts from '../charts/BarCharts';
import PieCharts from '../charts/PieCharts';
import { IData, ITableData } from '../../model/Model';

const Table: React.FC = () => {
    const dispatch = useDispatch()
    const data = useSelector((state: any) => state.FileSlice.tableData)
    const [state, setState] = useState<ITableData>([]);
    const [barChartStatus, setBarChartStatus] = useState<boolean>(false)
    const [pieChartStatus, setPieChartStatus] = useState<boolean>(false)
    const [id, setId] = useState<number>()

    const columns: any = [
        {
            title: "id",
            field: "id",
            headerFilter: true,
            headerFilterPlaceholder: "ID axtar",
            width: 100,
        },
        {
            title: "len",
            field: "len",
            headerFilter: true,
            headerFilterPlaceholder: "Len axtar",
        },
        {
            title: "WKT",
            field: "wkt",
            headerFilter: true,
            headerFilterPlaceholder: "WKT axtar",
        },
        {
            title: "Status",
            field: "status",
            headerFilter: true,
            headerFilterPlaceholder: "Status axtar",
            width: 110
        },
        {
            title: "geo type",
            field: "geoType",
            headerFilter: true,
            headerFilterPlaceholder: "Geotype axtar",
            width: 100,
        },
        {
            title: "",
            formatter: function (cell: any, formatterParams: any, onRendered: any) {
                var content = "🗺️";
                cell.getElement().textContent = content;
                cell.getElement().style.textAlign = "center";
                cell.getElement().style.cursor = "pointer";
                return content
            },
            width: 30,
            cellClick: function (e: any, cell: any) {
                console.log(cell.getRow().getData().wkt);
                dispatch(setWTK(cell.getRow().getData().wkt)
                )
            },
        },
        {
            title: "",
            formatter: "buttonCross",
            width: 20,
            cellClick: function (e: any, cell: any) {
                cell.getRow().delete();
                const idToDelete = cell.getRow().getData().id;
                const updatedData = state.filter((item: IData) => item.id !== idToDelete);
                setState(updatedData);
            },
        },
        {
            title: "",
            field: "edit",
            headerSort: false,
            formatter: "buttonTick",
            width: 20,
            cellClick: (e: any, cell: any) => {
                handleModalChange()
                setId(cell.getRow().getData().id)
                // console.log(cell.getRow().getData());
                // cell.getRow().getData().len = newData.len
                // cell.getRow().getData().status = newData.status
            },
            formatterParams: {
                edit: "edit",
            },
        },
    ]
    useEffect(() => {
        const transformedData = data.map((item: IData) => ({ ...item }));
        setState(transformedData);
        dispatch(setWTK(transformedData[0]?.wkt))
    }, [data, dispatch]);

    useEffect(() => {
        const newChartData: Record<number, number> = {};
        state.forEach((item: IData) => {
            const status: number = item.status;
            newChartData[status] = (newChartData[status] || 0) + 1;
        });
        dispatch(status(newChartData));
    }, [state, dispatch]);

    const handleModalChange = () => {
        dispatch(setModal(true));
    };

    const handleDataSubmit = (data: { len: string, status: string }) => {
        setState((prevState: ITableData) =>
            prevState.map((item: IData) => {
                if (item.id === id) {
                    return { ...item, len: +data.len, status: +data.status };
                }
                return item;
            })
        );
    };

    return (
        <section className={`${s.table}`}>
            <ReactTabulator
                data={state}
                columns={columns}
                layout={"fitColumns"}
                pagination={"local"}
                paginationSize={2}
                paginationSizeSelector={[4, 10, true]}
            ></ReactTabulator>
            <Qeydmodal onDataSubmit={handleDataSubmit} />
            <div style={{ display: 'flex', columnGap: '7px', width: "100%" }}>
                <div style={{ width: '50%' }}>
                    <Button type="primary" size={"middle"} onClick={() => setBarChartStatus(!barChartStatus)}>
                        Bar Charts Analiz
                    </Button>
                    {barChartStatus && <BarCharts />}
                </div>
                <div style={{ width: '50%' }}>
                    <Button type="primary" size={"middle"} onClick={() => setPieChartStatus(!pieChartStatus)}>
                        Pie Charts Analiz
                    </Button>
                    {pieChartStatus && <PieCharts />}
                </div>
            </div>
        </section>
    )
}
export default Table;