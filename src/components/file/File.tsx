import React, { useRef } from 'react';
import s from './styles.module.scss'
import { Button } from "antd";
import * as XLSX from "xlsx";
import { setFile } from "../../store/expense/file-slice";
import { useDispatch } from "react-redux";
const File: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const dispatch = useDispatch()
    const handleButtonClick = () => {
        fileInputRef.current!.click()
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                const fileData = jsonData.slice(1).map((row: any) => {
                    return {
                        id: row[0],
                        len: row[1],
                        wkt: row[2],
                        status: row[3],
                        geoType: row[2].split("(")[0]
                    };
                });
                dispatch(setFile(fileData))
            };
            reader.readAsArrayBuffer(file);
        }
    }

    return (
        <section className={`${s.file}`}>
            {/* <h1 className={`${s.file__title}`}>File</h1> */}
            <Button
                type="primary"
                size={"middle"}
                onClick={handleButtonClick}
            >
                Load Excel File
            </Button>
            <input ref={fileInputRef} className={`${s.file__input}`} onChange={handleFileChange} type="file" id="file" name="file" accept=".xlsx,.xls,.csv" />
        </section>
    )
}

export default File;