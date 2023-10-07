import React from 'react';
import s from './styles.module.scss'

const Footer: React.FC = () => {
    const year = new Date().getFullYear()
    return (
        <footer className={`${s.footer}`} >
            <h1>© Copyright {year}. Made by Samir</h1>
        </footer>
    );
}

export default Footer;