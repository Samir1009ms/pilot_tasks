import React, { useEffect, useState } from 'react';
import s from './styles.module.scss'
import { Modal, Select } from "antd";

const Qeydmodal: React.FC<any> = ({ onDataSubmit, modalStatus, editModalClose, editData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = (e: any) => {
        onDataSubmit({ len, status }, false);
        setLen('');
        setStatus(0);
        setIsModalOpen(false)
    };

    const [len, setLen] = useState<any>();
    const [status, setStatus] = useState<any>();
    const handleCancel = () => {
        setIsModalOpen(false)
        editModalClose(false)
    };
    const handleChange = (value: number) => {
        setStatus(value)
    };
    useEffect(() => {
        setIsModalOpen(modalStatus)
        setLen(editData.len)
        setStatus(editData.status)
    }, [modalStatus, editData])

    return (
        <section >
            <Modal title="Başlıq" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                            defaultValue={status}
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
