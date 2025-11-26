
import { useState } from 'react';
import './SideMenu.css';
import MenuRoles from './roles/MenuRoles';
import SideButtons from './SideButtons';
import SideDropdown from './dropdown/SideDropdown';

function SideMenu() {
    const [offset, setOffset] = useState(-300);

    function openMenu() {
        setOffset(0);
    }

    function closeMenu() {
        setOffset(-300);
    }

    return (
        <>
            <div className="SideMenu__openButton" style={{ backgroundImage: 'url("assets/menu_open.png")' }} onClick={openMenu}></div>
            <div className="SideMenu__container" style={{ transform: `translateX(${offset}px)`, backgroundImage: "url('/assets/background-img2.webp')" }}>
                <div className="SideMenu__logo" style={{backgroundImage: "url('assets/botc_logo.png')"}}></div>
                <div className='SideMenu__closeButton' style={{ backgroundImage: `url("assets/close.png")` }} onClick={closeMenu}></div>

                <div className='SideMenu__body'>
                    <SideDropdown />
                    <SideButtons />
                    <MenuRoles />
                </div>
            </div>
        </>
    )
}

export default SideMenu;