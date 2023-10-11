import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ReactTabulator } from "react-tabulator";
import { status, setModal, setWTK, len } from "../../store/expense/file-slice";
import s from './styles.module.scss'
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';

import Qeydmodal from "../modal/Qeydmodal";
import { Button } from 'antd';
import BarCharts from '../charts/BarCharts';
import PieCharts from '../charts/PieCharts';
import { IData, ITableData } from '../../model/Model';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { set } from 'ol/transform';
import Addmodal from '../modal/Addmodal';

const Table: React.FC = () => {
    const dispatch = useDispatch()
    const data = useSelector((state: any) => state.FileSlice.tableData)
    const [filteredData, setFilteredData] = useState<any>([])
    const [state, setState] = useState<ITableData>([]);
    const [barChartStatus, setBarChartStatus] = useState<boolean>(false)
    const [pieChartStatus, setPieChartStatus] = useState<boolean>(false)
    const [id, setId] = useState<number>()

    const swalOptions: SweetAlertOptions = {
        title: 'Diqqət!!!',
        text: 'Silmək istədiyinizə əminsiniz?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Bəli',
        cancelButtonText: 'Xeyr'
    };
    const [editData, setEditData] = useState<any>({})

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
            width: 110,
            headerFilterFunc: function (headerValue: any, rowValue: any, rowData: any, filterParams: any) {
                if (headerValue === null) {
                    // console.log(rowData);
                }
                setFilteredData(filteredData.filter((item: any) => item.status === +headerValue))
                return rowValue === +headerValue
            },
            onFilter: function (filters: any) {
                if (Object.keys(filters).length === 0) {
                }
            }
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
                const idToDelete = cell.getRow().getData().id;
                //! swal alert boolean deyer olacaq
                Swal.fire(swalOptions).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Məlumat silindi', '', 'success');
                        cell.getRow().delete();
                        const updatedData = state.filter((item) => item.id !== idToDelete);
                        setState(updatedData);
                    } else {
                        Swal.fire('Məlumat silinmədi', '', 'error');
                    }
                    setTimeout(() => {
                        Swal.close();
                    }, 1500);
                });

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
                const data = cell.getRow().getData()
                setId(data.id)
                setEditData({ len: data.len, status: data.status })

            },
            formatterParams: {
                edit: "edit",
            },
        },
        {
            title: "",
            field: "add",
            headerSort: false,
            formatter: function (cell: any, formatterParams: any, onRendered: any) {
                var content = "➕";
                cell.getElement().textContent = content;
                cell.getElement().style.textAlign = "center";
                cell.getElement().style.cursor = "pointer";
                return content
            },
            width: 20,
            cellClick: (e: any, cell: any) => {
                handleModalChange()
                //! data updatee olacaq
                setAddId(state[0].id + 1)
            },
            formatterParams: {
                add: "add",
            },
        },
    ]
    const [addId, setAddId] = useState<number>(0)
    useEffect(() => {
        const transformedData = data.map((item: IData) => ({ ...item }));
        setState(transformedData);
        dispatch(setWTK(transformedData[0]?.wkt))
        setFilteredData(transformedData)
    }, [data, dispatch]);

    useEffect(() => {
        const newChartDataStatus: Record<number, number> = {};
        const newChartDataLen: Record<number, number> = {};
        filteredData.forEach((item: IData) => {
            const status: number = +item.status;
            newChartDataStatus[status] = (newChartDataStatus[status] || Number(item.len)) + Number(item.len);
        });
        filteredData.forEach((item: IData) => {
            const status: number = +item.status;
            newChartDataLen[status] = (newChartDataLen[status] || 0) + 1;
        });
        dispatch(status(newChartDataStatus));
        dispatch(len(newChartDataLen));
    }, [filteredData, dispatch]);

    const [modalStatus, setModalStatus] = useState<boolean>(false)
    const handleModalChange = () => {
        dispatch(setModal(true));

    };
    const handleEditModalChange = (e: boolean) => {
        setModalStatus(e)
    }

    const handleDataSubmit = (data: { len: string, status: string }, open: boolean) => {
        setModalStatus(open)
        setState((prevState: ITableData) =>
            prevState.map((item: IData) => {
                if (item.id === id) {
                    return { ...item, len: +data.len, status: +data.status };
                }
                return item;
            })
        );
    };
    const tableRef = useRef<any>(undefined);
    // ****** table filter silmek ucun yeniden qurmaq ucundur ****** // 
    // const [tableKey, setTableKey] = useState(Date.now());
    function filterDelete() {
        setFilteredData(state)
        // setTableKey(Date.now())
    }

    return (
        <section className={`${s.table}`}>
            <ReactTabulator
                data={state}
                // key={tableKey}
                ref={tableRef}
                columns={columns}
                layout={"fitColumns"}
                pagination={"local"}
                paginationSize={2}
                paginationSizeSelector={[4, 10, true]}
            ></ReactTabulator>
            <Qeydmodal editModalClose={handleEditModalChange} onDataSubmit={handleDataSubmit} modalStatus={modalStatus} editData={editData} />
            <Addmodal id={addId} />
            <div style={{ display: 'flex', columnGap: '7px', width: "100%" }}>
                <div>
                    <Button type="primary" size={"middle"} onClick={() => filterDelete()}>
                        Filter sil
                    </Button>
                </div>
                <div style={{ width: '50%' }}>
                    <Button type="primary" size={"middle"} onClick={() => setBarChartStatus(!barChartStatus)}>
                        Bar Charts Analiz Status
                    </Button>
                    {barChartStatus && <BarCharts />}
                </div>
                <div style={{ width: '50%' }}>
                    <Button type="primary" size={"middle"} onClick={() => setPieChartStatus(!pieChartStatus)}>
                        Pie Charts Analiz Len
                    </Button>
                    {pieChartStatus && <PieCharts />}
                </div>
            </div>
        </section>
    )
}
export default Table;