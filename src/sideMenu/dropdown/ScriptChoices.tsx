import { useContext, useMemo, useRef } from "react";
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";
import { DEFAULT_SCRIPTS } from "../../data/scriptData";

const SCRIPT_COLORS = [
    "#F00000",
    "#C0C000",
    "#C000C0",
    "#00C000",
    "#c3ac87",
    "#0000F0",
]

const SCRIPT_BACKGROUNDS = [
    "url(assets/backgrounds/red_circle_small.webp)",
    "url(assets/backgrounds/yellow_circle_small.webp)",
    "url(assets/backgrounds/purple_circle_small.webp)",
    "url(assets/backgrounds/green_circle_small.webp)",
    // Bit of cheating -- black background
    "url(assets/backgrounds/user_center.webp)",
    "url(assets/backgrounds/blue_circle_small.webp)",
]

export default function ScriptChoices() {
    const {gameState, setGameState, appState, setAppState} = useContext(GameContext) as AppContextType & GameContextType;
    const selectRef = useRef<any>(null);

    const index = useMemo(() => {
        const index = DEFAULT_SCRIPTS.map(s => s[0].name).indexOf(gameState.script[0].name);
        if (index < 0) return 5;
        return index;
    }, [SCRIPT_COLORS, gameState.script]);

    const color = SCRIPT_COLORS[index];
    const backgroundImage = SCRIPT_BACKGROUNDS[index];

    const defaultNames = DEFAULT_SCRIPTS.map(script => script[0].name);
    const nameJsx = defaultNames.map(name => <option>{name}</option>);

    function changeScript() {
        if (selectRef.current === null) return;

        setGameState(state => {
            return {
                ...state,
                script: DEFAULT_SCRIPTS[selectRef.current.selectedIndex]
            };
        })
    }

    return (
        <>
            <span className="SideDropdown__scriptHeader">Current Script</span>
            <br />
            <select 
                ref={selectRef} 
                defaultValue={gameState.script[0].name}
                className="SideDropdown__scriptSelect" 
                style={{backgroundImage}} 
                onChange={changeScript}
            >
                {nameJsx}
            </select>
            <hr />
            <span style={{color}} className="SideDropdown__scriptName" >{gameState.script[0].name}</span>
            <hr />
        </>
    )
}