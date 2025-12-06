import { useEffect, useState } from 'react';
import './App.css';
import Background from './background/Background';
import DragZone from './dragZone/DragZone';
import { GameContext, load, save } from './data/gameState';
import SideMenu from './sideMenu/SideMenu';
import InfoBox from './infoBox/InfoBox';
import { DEFAULT_APP_STATE } from './data/appState';
import Shroud from './shroud/Shroud';
import CharacterSelect from './characterSelect/CharacterSelect';
import BottomButtons from './bottomButtons/BottomButtons';
import NightOrder from './nightOrder/NightOrder';
import BackgroundSelector from './backgroundSelector/BackgroundSelector';
import { RoleData } from './types/Role';
import { Script } from './types/Script';
import init from './data/init';
import { saveLocalScripts } from './data/scriptData';

function App() {

    const [gameState, setGameState] = useState(load())
    const [appState, setAppState] = useState(DEFAULT_APP_STATE);
    const [roles, setRoles] = useState<RoleData>({});
    const [scripts, setScripts] = useState<Script[]>([]);

    // Instead of initRoles do this
    useEffect(() => {
        if (Object.keys(roles).length > 0) return;
        init(gameState, setRoles, setScripts, setGameState);
    }, [gameState, roles]);

    // Whenever an update happens, save the game state.
    useEffect(() => {
        save(gameState);
        console.log("Saved the game");
    }, [gameState])
    
    // Whenever an import or deletion happens, save the scripts.
    useEffect(() => {
        if (scripts.length < 6) return;
        saveLocalScripts(scripts);
        console.log("Saved local scripts");
    }, [scripts]);

    if (Object.keys(roles).length === 0) {
        return (<>
            <p style={{ color: 'black', position: "absolute", fontSize: "40px" }}> LOADING...</p>
        </>)
    }

    return (
        <GameContext value={{ 
            gameState, setGameState, 
            appState, setAppState,
            roles, setRoles,
            scripts, setScripts,
        }}>
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
