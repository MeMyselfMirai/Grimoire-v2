import { useContext, useRef } from "react";
import { GameContext, GameContextType } from "../../data/gameState";
import { commitNewScript, deleteScriptByIndex, modernizeLegacyScript, sanitizeName, SCRIPT_BACKGROUNDS, SCRIPT_COLORS } from "../../data/scriptData";
import { isCompleteScript, reasonForScriptFailure } from "../../types/Script";
import { appendCustomRoles } from "../../data/roleData";

export default function ScriptChoices() {
    const { gameState, setGameState, roles, setRoles, scripts, setScripts } = useContext(GameContext) as GameContextType;
    const selectRef = useRef<any>(null);
    const uploadRef = useRef<any>(null);

    const index = scripts.map(s => sanitizeName(s[0].name)).indexOf(sanitizeName(gameState.script[0].name));
    
    const color = SCRIPT_COLORS[index] ?? SCRIPT_COLORS[5];
    const boxShadow = "0 0 10px " + color;
    const backgroundImage = SCRIPT_BACKGROUNDS[index] ?? SCRIPT_BACKGROUNDS[5];
    
    const defaultNames = scripts.map(script => sanitizeName(script[0].name));
    const optionJsx = defaultNames.map((name, index) => <option key={name + index.toString()} >{name}</option>);
    
    function changeScript() {
        if (selectRef.current === null) return;
        
        setGameState(state => {
            return {
                ...state,
                script: scripts[selectRef.current.selectedIndex]
            };
        })
    }

    function deleteScript() {
        if (index < 6) return;
        deleteScriptByIndex(index, setScripts);
        setGameState(state => {
            return {
                ...state,
                script: scripts[0]
            }
        });
    }
    
    function openUploadDialog() {
        if (uploadRef.current === null) return;
        
        uploadRef.current.click();
    }
    
    async function uploadScript() {
        if (uploadRef.current === null) return;
        
        const raw = await uploadRef.current.files[0].text();
        
        let script: any;
        try {
            script = JSON.parse(raw);
        } catch (e) {
            window.alert("Ya dun goofed!\nError parsing JSON. Is that actually a JSON file?");
            return;
        }

        script = modernizeLegacyScript(script);
        
        if (!isCompleteScript(script, roles)) {
            console.error("Invalid Script:", script);
            window.alert("Ya dun goofed!\n" + reasonForScriptFailure(script, roles));
            return;
        }
        
        appendCustomRoles(script, roles, setRoles);
        commitNewScript(script, scripts, setScripts);
        
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
            <div className="SideDropdown__scriptSelectContainer">
                <select
                    ref={selectRef}
                    className="SideDropdown__scriptSelect"
                    style={{ backgroundImage, boxShadow }}
                    value={sanitizeName(gameState.script[0].name)}
                    onChange={changeScript}
                    >
                    {optionJsx}
                </select>
                <div 
                    className="SideDropdown__scriptDelete General__backgroundImage" 
                    style={{backgroundImage: "url(assets/delete.png)", backgroundColor: index < 6 ? "gray" : "red"}}
                    onClick={deleteScript}
                />
            </div>
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
        </>
    )
}