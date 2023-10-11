import React, { useEffect, useState } from 'react';
import s from './styles.module.scss'
import { Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addData, setModal } from "../../store/expense/file-slice";
const Addmodal: React.FC<any> = ({ id }) => {
    const modal = useSelector((state: any) => state.FileSlice.modal)
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()

    const handleOk = (e: any) => {
        setLen('');
        setStatus(0);
        setWkt('LINESTRING(50.32489718460863 40.3897112495751,50.32500619720577 40.39007045577375)');
        dispatch(addData({ id, len, wkt, status, geoType: wkt.split("(")[0] }))
        dispatch(setModal(false))
    };

    const [len, setLen] = useState<string>('');
    const [status, setStatus] = useState<number>(0);
    const [wkt, setWkt] = useState<string>('LINESTRING(50.32489718460863 40.3897112495751,50.32500619720577 40.39007045577375)');

    const handleCancel = () => {
        dispatch(setModal(false))
    };
    const handleChange = (value: number) => {
        setStatus(value)
    };
    useEffect(() => {
    }, [modal])
    return (
        <section >
            <Modal title="Başlıq" open={modal} onOk={handleOk} onCancel={handleCancel}>
                <div className={`${s.modal}`}>
                    <div className={`${s.modal__container}`}>
                        <label htmlFor="lenData" className={`${s.modal__container_text}`}>Len təyin et</label>
                        <input
                            type="number"
                            id="lenData"
                            value={len}
                            onChange={(e) => setLen(e.target.value)}
                            className={`${s.modal__container_values}`}
                        />
                    </div>
                    <div className={`${s.modal__container}`}>
                        <label htmlFor="WKT" className={`${s.modal__container_text}`}>WKT təyin et</label>
                        <small>geo type gore error verirdi statik deyer verdim </small>
                        <input
                            type="text"
                            id="wktData"
                            value={wkt}
                            onChange={(e) => setWkt(e.target.value)}
                            className={`${s.modal__container_values}`}
                        />
                    </div>
                    <div className={`${s.modal__container}`}>
                        <label htmlFor="statusData" className={`${s.modal__container_text}`}>Status təyin et</label>
                        <Select
                            defaultValue={0}
                            value={status}
                            style={{ width: '100%' }}
                            className={`${s.modal__container_values}`}
                            onChange={handleChange}
                            allowClear
                            options={[
                                { value: 0, label: '0' },
                                { value: 1, label: '1' },
                                { value: 2, label: '2' },
                            ]}
                        />
                    </div>
                </div>
            </Modal>
        </section>
    )
}

export default Addmodal;
