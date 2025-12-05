import { useContext, useRef } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";
import { ALL_SCRIPTS, SCRIPT_COLORS } from "../../data/scriptData";


export default function ScriptInfo() {
    const { gameState, setGameState } = useContext(GameContext) as AppContextType & GameContextType;
    const titleRef = useRef<any>(null);
    const authorRef = useRef<any>(null);
    
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

    function editAuthor() {
        if (authorRef.current === null) return;
        let author: string = authorRef.current.value;
        if (author.startsWith("By: ")) {
            author = author.slice(4);
        }
        console.log(`INPUT: "${titleRef.current.value}"`)
        ALL_SCRIPTS[index][0].author = author;
        setGameState(state => {
            return {
                ...state,
                script: [
                    {
                        ...state.script[0],
                        author: author
                    },
                    ...state.script.slice(1)
                ]
            }
        })
    }

    console.log(`SCRIPT NAME: "${ALL_SCRIPTS[index]?.[0]?.name}"`)


    const authorJsx = (
            <TextareaAutosize 
                ref={authorRef}
                value={[undefined, "undefined", ""].includes(gameState.script[0].author) ? "By: unknown" : "By: " + gameState.script[0].author}
                spellCheck="false"
                style={{ color }} 
                className="SideDropdown__scriptAuthor"
                disabled={index < 6}
                onChange={editAuthor}
            />
    );
    return (
        <>
            <TextareaAutosize 
                ref={titleRef}
                value={gameState.script[0].name}
                spellCheck="false"
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