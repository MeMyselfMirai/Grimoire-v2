import { useState } from 'react';
import './App.css';
import Background from './background/Background';
import Toggle from './fixed/Toggle';
import DragZone from './drag/DragZone';
import { GameContext, load, save } from './data/gameState';
import { areRolesLoading, initRoles } from './data/roleData';
import SideMenu from './sideMenu/SideMenu';
import InfoBox from './infoBox/InfoBox';
import { DEFAULT_APP_STATE } from './data/appState';

function App() {

    const [gameState, setGameState] = useState(load())
    const [appState, setAppState] = useState(DEFAULT_APP_STATE);
    const [loading, setLoading] = useState(areRolesLoading);
    const [enabled, setEnabled] = useState(true);

    function toggleBackground(enabled: boolean) {
        setEnabled(enabled);
        setGameState(oldState => {
            return {
                ...oldState,
                background: enabled ?
                    "url(/assets/backgrounds/green_circle_large.webp)" :
                    "url(/assets/backgrounds/blue_circle_large.webp)"
            }
        });
    }

    if (loading) {
        // Kludge because I can't figure out why the ROLES object isn't updating instantly when set.
        initRoles().then(_ => setTimeout(() => setLoading(areRolesLoading), 250))
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
            <DragZone enabled={enabled} />
            <Toggle callback={toggleBackground} />
            <InfoBox />
            <SideMenu />
        </GameContext>
    );
}

export default App;
