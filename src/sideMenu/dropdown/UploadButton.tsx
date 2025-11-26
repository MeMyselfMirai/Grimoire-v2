import { useContext, useRef } from "react"
import { isValidGamestate } from "../../types/GameState";
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";


export default function UploadButton() {
    const {setGameState} = useContext(GameContext) as AppContextType & GameContextType;

    const inputRef = useRef<any>(null);

    function clickUpload() {
        if (inputRef.current === null) return;

        inputRef.current.click();
    }

    async function upload() {
        if (inputRef.current === null) return;

        const raw = await inputRef.current.files[0].text();
        const state = JSON.parse(raw);

        if (!isValidGamestate(state)) {
            window.alert("Error importing state. We do not support script migration from grimoire v1 yet, sorry.");
            return;
        }
        setGameState(state);
    }

    return (
        <>
            <div 
                onClick={clickUpload}
                className="SideDropdown__button General__backgroundImage"
                style={{backgroundColor: "#888888", backgroundImage: "url(assets/upload.svg)" }}
            />
            <input 
                ref={inputRef}
                type="file" 
                id="game_state_upload" 
                accept=".json" 
                onChange={upload}
                hidden
            />
        </>
    )
}