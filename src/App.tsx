import { useState } from 'react';
import './App.css';
import Background from './background/Background';
import DragZone from './dragZone/DragZone';
import { GameContext, load, save } from './data/gameState';
import { areRolesLoading, initRoles } from './data/roleData';
import SideMenu from './sideMenu/SideMenu';
import InfoBox from './infoBox/InfoBox';
import { DEFAULT_APP_STATE } from './data/appState';
import Shroud from './shroud/Shroud';
import CharacterSelect from './characterSelect/CharacterSelect';
import BottomButtons from './bottomButtons/BottomButtons';
import NightOrder from './nightOrder/NightOrder';
import BackgroundSelector from './backgroundSelector/BackgroundSelector';
import { initScripts } from './data/scriptData';

function App() {

    const [gameState, setGameState] = useState(load())
    const [appState, setAppState] = useState(DEFAULT_APP_STATE);
    const [loading, setLoading] = useState(areRolesLoading);
    
    if (loading) {
        // Kludge because I can't figure out why the ROLES object isn't updating instantly when set.
        Promise.allSettled([initRoles(), initScripts()]).then(_ => setTimeout(() => setLoading(areRolesLoading), 500));
        return (<>
            <p style={{color: 'black', position:"absolute", fontSize:"40px"}}> LOADING...</p>
        </>)
    }

    // Whenever an update happens, save the game state.
    save(gameState);
    console.log("Saved this world")

    return (
        <GameContext value={{gameState, setGameState, appState, setAppState}}>
            <Background />
            <DragZone />
            <BottomButtons />
            <NightOrder />
            <SideMenu />
            <InfoBox />
            <BackgroundSelector />
            <Shroud />
            <CharacterSelect />
        </GameContext>
    );
}

export default App;
