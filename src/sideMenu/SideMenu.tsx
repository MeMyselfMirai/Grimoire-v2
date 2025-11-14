
import { JSX, useContext, useState } from 'react';
import './SideMenu.css';
import { ContextType, GameContext } from '../data/gameState';
import { ROLES } from '../data/roleData';
import { Role } from '../types/Role';
import { LiteralRole } from '../types/Script';
import MenuItem from './MenuItem';

type ItemStore = {
    [key: string]: JSX.Element[]
}

const TEAM_TYPES = {
    "townsfolk": {
        "id": "townsfolk",
        "header": "Townsfolk",
        "color": "#0033cc",
    },
    "outsider": {
        "id": "outsider",
        "header": "Outsiders",
        "color": "#1a53ff",
    },
    "minion": {
        "id": "minion",
        "header": "Minions",
        "color": "#b30000",
    },
    "demon": {
        "id": "demon",
        "header": "Demons",
        "color": "#e60000",
    },
    "traveller": {
        "id": "traveller",
        "header": "Travellers",
        "color": "#6600ff",
    },
    "fabled": {
        "id": "fabled",
        "header": "Fabled",
        "color": "#b3b300",
    },
}

function isRole(role: LiteralRole | Role): role is Role {
    return ROLES[role.id] === undefined;
}

function populateJSX(script: (LiteralRole | Role)[]): ItemStore {
    const items: ItemStore = {}
    Object.keys(TEAM_TYPES).forEach(type => items[type] = []);

    script.forEach(r => {
        if (!isRole(r)) {
            r = ROLES[r.id];
        }
        const role = r as Role;
        if (!(role.team in items)) return;
        items[role.team].push((
            <MenuItem roleId={role.id} key={role.id}></MenuItem>
        ));
    })

    return items;
}

function SideMenu() {
    const [offset, setOffset] = useState(-300);
    // eslint-disable-next-line
    const {gameState, setGameState} = useContext(GameContext) as ContextType;

    const script = gameState.script.slice(1) as (LiteralRole | Role)[];

    function openMenu() {
        setOffset(0);
    }

    function closeMenu() {
        setOffset(-300);
    }

    const sectionData = populateJSX(script);

    const sections = Object.values(TEAM_TYPES).map<JSX.Element>(team => (
        <div key={team.id}>
            <div className="SideMenu__header" style={{color: team.color}}>{team.header}</div>
            <div className='SideMenu__ratio' id={`SideMenu__ratio_${team.id}`}>0/0</div>
            <hr style={{marginBlockEnd: "0em"}}></hr>
            {sectionData[team.id]}
        </div>
    ))

    return (
    <>
        <div className="SideMenu__openButton" style={{backgroundImage: 'url("assets/menu_open.png")'}} onClick={openMenu}></div>
        <div className="SideMenu__container" style={{transform: `translateX(${offset}px)`, backgroundImage: "url('/assets/background-img2.webp')"}}>
            <div className='SideMenu__closeButton' style={{backgroundImage: `url("assets/close.png")`}} onClick={closeMenu}></div>
            <div className='SideMenu__body'>
                {sections}
            </div>
        </div>
    </>
    )
}

export default SideMenu;