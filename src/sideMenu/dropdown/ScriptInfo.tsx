import { useContext, useRef } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { GameContext, GameContextType } from "../../data/gameState";
import { SCRIPT_COLORS, scriptIndexOf } from "../../data/scriptData";


export default function ScriptInfo() {
    const { gameState, setGameState, scripts, setScripts } = useContext(GameContext) as GameContextType;
    const titleRef = useRef<any>(null);
    const authorRef = useRef<any>(null);

    const author = [undefined, "undefined", ""].includes(gameState.script[0].author) 
            ? "By: unknown" 
            : "By: " + gameState.script[0].author;
    
    const index = scriptIndexOf(gameState.script, scripts);
    const color = SCRIPT_COLORS[index] ?? SCRIPT_COLORS[5];

    function editTitle() {
        if (titleRef === null) return;
        setScripts(scripts => {
            return [
                ...scripts.slice(0, index),
                [
                    {
                        ...scripts[index][0],
                        name: titleRef.current.value,
                    },
                    ...scripts[index].slice(1),
                ],
            ]
        })
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
        setScripts(scripts => {
            return [
                ...scripts.slice(0, index),
                [
                    {
                        ...scripts[index][0],
                        author: authorRef.current.value,
                    },
                    ...scripts[index].slice(1),
                ],
            ]
        })
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
            <TextareaAutosize 
                ref={authorRef}
                value={author}
                spellCheck="false"
                style={{ color }} 
                className="SideDropdown__scriptAuthor"
                disabled={index < 6}
                onChange={editAuthor}
            />
            <hr />
        </>
    )
}