import { useContext } from "react";
import './Token.css';
import './DragZone.css';
import { DraggableData, DraggableEvent } from "react-draggable";
import Token from "./Token";
import { GameContextType, GameContext } from "../data/gameState";
import { GameState } from "../types/GameState";
import { AppContextType } from "../data/appState";

type DragType = {
    enabled: boolean
}

/**
 * Provides a div containing the entire "DragZone", a region where all draggable tokens exist. 
 * @param enabled Whether the dragzone allows tokens within it to be dragged.
 * @returns 
 */
function DragZone({enabled}: DragType) {

    const {gameState, setGameState, setAppState} = useContext(GameContext) as GameContextType & AppContextType;

    function handleDrag(_: DraggableEvent, ui: DraggableData, index: number) {
        setGameState(oldState => {
            const newState: GameState = {...oldState};
            newState.playerTokens = [...oldState.playerTokens];
            newState.playerTokens[index] = {...newState.playerTokens[index]}
            newState.playerTokens[index].position = {
                top: newState.playerTokens[index].position.top + ui.deltaY,
                left: newState.playerTokens[index].position.left + ui.deltaX,
            }
            return newState;
        });
    }

    function handleClick(e: any, uid: number) {
        e.stopPropagation();
        setAppState(oldState => {
            return {
                ...oldState,
                activeTokenUid: uid,
            }
        });
    }

    function handleNeutralClick() {
        setAppState(oldState => {
            return {
                ...oldState,
                activeTokenUid: -1, // None
            }
        })
    }

    const tokens = gameState.playerTokens.map((token, index) => (
        <Token 
            key={index} 
            id={token.id} 
            top={token.position.top} 
            left={token.position.left} 
            onDrag={(e, ui) => handleDrag(e, ui, index)} 
            onClick={(e) => handleClick(e, token.uid)}
            enabled={enabled} 
        />
    ));

    return (
        <>
            <div id="DragZone__pointerCapture" onClick={handleNeutralClick} ></div>
            <div id="DragZone__container">
                {tokens}
            </div>
        </>
    );
}

export default DragZone;
