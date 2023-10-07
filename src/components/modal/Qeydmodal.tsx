import React, { useEffect, useState } from 'react';
import s from './styles.module.scss'
import { Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../store/expense/file-slice";
const Qeydmodal: React.FC<any> = ({ onDataSubmit }) => {
    const modal = useSelector((state: any) => state.FileSlice.modal)
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()
    // const showModal = () => {
    //     // setIsModalOpen(true);
    //     dispatch(setModal(true))
    // };

    const handleOk = (e: any) => {
        // setIsModalOpen(false);
        // console.log(e.target.value);
        onDataSubmit({ len, status });
        setLen('');
        setStatus(0);
        dispatch(setModal(false))
    };

    const [len, setLen] = useState<string>('');
    const [status, setStatus] = useState<number>(0);

    const handleCancel = () => {
        // setIsModalOpen(false);
        dispatch(setModal(false))
    };
    const handleChange = (value: number) => {
        // console.log(`selected ${value}`);
        setStatus(value)
    };
    useEffect(() => {
        // console.log(modal)
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

export default Qeydmodal;
