import React from 'react';
import Table from "../../components/table/Table";
import s from './styles.module.scss'
import MapComponent from '../../components/xerite/Xerite';
import File from '../../components/file/File';
import { useSelector } from 'react-redux';

const Home: React.FC = () => {
    const data = useSelector((state: any) => state.FileSlice.tableData)
    return (
        <main className={`${s.main}`}>
            <File />
            {Object.keys(data).length !== 0 && <section className={`${s.leftContainer}`}>
                <Table />
                <MapComponent />
            </section>}
        </main>
    );
}

export default Home;