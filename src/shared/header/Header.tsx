import React from 'react';
import s from './styles.module.scss'
const Header: React.FC = () => {
    return (
        <header className={`${s.header}`}>
            <nav className={`${s.nav}`}>
                <div className={`${s.logo}`}>Yusifov Samir || yusifov.dev@gmail.com</div>
                <ul className={`${s.list}`}>
                    <li className={`${s.text}`}>Home</li>
                    <li className={`${s.text}`}>About</li>
                    <li className={`${s.text}`}>Services</li>
                    <li className={`${s.text}`}>Contact</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;