import { useContext } from "react";
import './Token.css';
import './DragZone.css';
import { DraggableData, DraggableEvent } from "react-draggable";
import DraggableToken from "./DraggableToken";
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
            return {
                ...oldState,
                playerTokens: [
                    ...oldState.playerTokens.slice(0,index),
                    {
                        ...oldState.playerTokens[index],
                        position: {
                            top: oldState.playerTokens[index].position.top + ui.deltaY,
                            left: oldState.playerTokens[index].position.left + ui.deltaX,
                        }
                    },
                    ...oldState.playerTokens.slice(index+1)
                ]
            }
        });
    }

    function handleClick(e: any, uid: number) {
        e.stopPropagation();
        console.log(uid)
        setAppState(oldState => {
            return {
                ...oldState,
                activeTokenUid: uid,
            }
        });
    }

    function handleDrop(index: number) {
        setGameState(oldState => {
            const newState: GameState = {...oldState};
            const oldToken = oldState.playerTokens[index];
            newState.playerTokens = [
                ...oldState.playerTokens.slice(0,index),
                ...oldState.playerTokens.slice(index+1),
                oldToken
            ];
            return newState;
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
        <DraggableToken 
            key={token.uid} 
            id={token.id} 
            name={token.name}
            position={token.position}
            onDrag={(e, ui) => handleDrag(e, ui, index)}
            onDrop={() => handleDrop(index)}
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
