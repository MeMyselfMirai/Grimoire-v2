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

export default function ScriptChoices() {
    const {gameState, setGameState, appState, setAppState} = useContext(GameContext) as AppContextType & GameContextType;
    const selectRef = useRef<any>(null);

    const color = useMemo(() => {
        let index = DEFAULT_SCRIPTS.map(s => s[0].name).indexOf(gameState.script[0].name);
        if (index < 0) index = 5;
        return SCRIPT_COLORS[index];
    }, [SCRIPT_COLORS, gameState.script]);

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
                style={{backgroundImage: `url("/assets/backgrounds/blue_swirls.webp")`}} 
                onChange={changeScript}>
                {nameJsx}
            </select>
            <hr />
            <span style={{color}} className="SideDropdown__scriptName" >{gameState.script[0].name}</span>
            <hr />
        </>
    )
}