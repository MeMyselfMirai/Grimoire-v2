import { useState } from 'react';
import './App.css';
import Background from './background/Background';
import Toggle from './fixed/Toggle';
import DragZone from './drag/DragZone';
import { multipleTokens } from './data/gameState';
import { areRolesLoading, initRoles } from './data/role';



function App() {

    const [loading, setLoading] = useState(areRolesLoading);
    const [backgroundImage, setBackgroundImage] = useState("url(/assets/backgrounds/blue_circle_large.webp)");
    const [enabled, setEnabled] = useState(true);

    function toggleBackground(enabled: boolean) {
        setEnabled(enabled);
        if (enabled) {
            setBackgroundImage("url(/assets/backgrounds/green_circle_large.webp)");
        } else {
            setBackgroundImage("url(/assets/backgrounds/blue_circle_large.webp)");
        }
    }

    if (loading) {
        initRoles().then(_ => setLoading(false))
    }

    return loading ?
        (<>
            <Background image={backgroundImage} />
            <p style={{color: 'white', position:"absolute"}}> LOADING...</p>
        </>)
        :
        (<>
            <Background image={backgroundImage} />
            <DragZone enabled={enabled} initialPositions={multipleTokens} />
            <Toggle callback={toggleBackground} />
        </>);
}

export default App;
