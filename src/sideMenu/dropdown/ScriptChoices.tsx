import { useContext, useMemo, useRef } from "react";
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";
import { DEFAULT_SCRIPTS } from "../../data/scriptData";
import { isCompleteScript } from "../../types/Script";
import { importCustomRoles } from "../../data/roleData";

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
    "url(assets/backgrounds/blue_circle_small.webp)",
    "url(assets/backgrounds/blue_circle_small.webp)",
]

export default function ScriptChoices() {
    const { gameState, setGameState } = useContext(GameContext) as AppContextType & GameContextType;
    const selectRef = useRef<any>(null);
    const uploadRef = useRef<any>(null);

    const index = useMemo(() => {
        const index = DEFAULT_SCRIPTS.map(s => s[0].name).indexOf(gameState.script[0].name);
        return index;
    }, [gameState.script]);

    console.log(index)

    const color = SCRIPT_COLORS[index] ?? SCRIPT_COLORS[5];
    const backgroundImage = SCRIPT_BACKGROUNDS[index] ?? SCRIPT_BACKGROUNDS[5];

    const defaultNames = DEFAULT_SCRIPTS.map(script => script[0].name);
    const optionJsx = defaultNames.map(name => <option key={name} >{name}</option>);
    optionJsx.push(<option key={"custom"} hidden>Custom Script</option>);

    function changeScript() {
        if (selectRef.current === null) return;

        setGameState(state => {
            return {
                ...state,
                script: DEFAULT_SCRIPTS[selectRef.current.selectedIndex]
            };
        })
    }

    function openUploadDialog() {
        if (uploadRef.current === null) return;

        uploadRef.current.click();
    }

    async function uploadScript() {
        if (uploadRef.current === null) return;

        const raw = await uploadRef.current.files[0].text();
        const script = JSON.parse(raw);

        if (!isCompleteScript(script)) {
            window.alert("Ya dun goofed!\n" + 
                "Your script is invalid. Note that scripts that are just name arrays are deprecated.");
            return;
        }

        importCustomRoles(script);

        setGameState(state => {
            return {
                ...state,
                script
            };
        });
    }

    return (
        <>
            <span className="SideDropdown__scriptHeader">Current Script</span>
            <br />
            <select
                ref={selectRef}
                className="SideDropdown__scriptSelect"
                style={{ backgroundImage }}
                onChange={changeScript}
            >
                {optionJsx}
            </select>
            <div style={{height: "15px"}}/>
            <label 
                className="SideDropdown__uploadLabel" 
                style={{backgroundImage: "url(assets/backgrounds/green_swirls.webp)"}}
                onClick={openUploadDialog}
            >  
                Upload Script
            </label>
            <br />
            <input ref={uploadRef} type="file" accept=".json" onChange={uploadScript} hidden />
            <hr />
            <span style={{ color }} className="SideDropdown__scriptName" >{gameState.script[0].name}</span>
            <hr />
        </>
    )
}