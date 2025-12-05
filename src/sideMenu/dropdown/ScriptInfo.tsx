import { useContext, useRef } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";
import { ALL_SCRIPTS, SCRIPT_COLORS } from "../../data/scriptData";


export default function ScriptInfo() {
    const { gameState, setGameState } = useContext(GameContext) as AppContextType & GameContextType;
    const titleRef = useRef<any>(null);
    
    const index = ALL_SCRIPTS.map(s => s[0].name.trim()).indexOf(gameState.script[0].name.trim());
    const color = SCRIPT_COLORS[index] ?? SCRIPT_COLORS[5];

    function editTitle() {
        if (titleRef === null) return;
        ALL_SCRIPTS[index][0].name = titleRef.current.value;
        console.log(`INPUT: "${titleRef.current.value}"`)
        setGameState(state => {
            return {
                ...state,
                script: [
                    {
                        ...state.script[0],
                        name: titleRef.current.value
                    },
                    ...state.script.slice(1)
                ]
            }
        })
    }
    console.log(`SCRIPT NAME: "${ALL_SCRIPTS[index]?.[0]?.name}"`)


    const authorJsx = [undefined, "undefined", ""].includes(gameState.script[0].author) ? 
            <></> : 
            <p style={{ color }} className="SideDropdown__scriptAuthor" >{"By: " + gameState.script[0].author}</p>;
    return (
        <>
            <TextareaAutosize 
                value={gameState.script[0].name}
                ref={titleRef}
                style={{ color }} 
                className="SideDropdown__scriptName" 
                disabled={index < 6}
                onChange={editTitle}
            />
            {authorJsx}
            <hr />
        </>
    )
}