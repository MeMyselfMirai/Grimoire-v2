import { useContext } from "react";
import './DragZone.css';
import { DraggableData, DraggableEvent } from "react-draggable";
import DraggableToken from "../token/DraggableToken";
import { GameContextType, GameContext } from "../data/gameState";
import { GameState } from "../types/GameState";
import { AppContextType } from "../data/appState";
import { getToken } from "../util";
import { nextViability } from "../types/Viability";

/**
 * Provides a div containing the entire "DragZone", a region where all draggable tokens exist. 
 * @param enabled Whether the dragzone allows tokens within it to be dragged.
 * @returns 
 */
function DragZone() {

    const {gameState, setGameState, appState, setAppState} = useContext(GameContext) as GameContextType & AppContextType;

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
        if (appState.tokenDataVisible) {
            setAppState(oldState => {
                return {
                    ...oldState,
                    activeTokenUid: uid,
                }
            });
        } else {
            const token = getToken(uid, gameState);
            const index = gameState.playerTokens.indexOf(token!);
            if (token === undefined) {
                console.error(`Clicked a token (uid=${uid}) that is apparently undefined. How?`)
                return;
            }
            setGameState(oldState => {
                return {
                    ...oldState,
                    playerTokens: [
                        ...oldState.playerTokens.slice(0, index),
                        {
                            ...token!,
                            viability: nextViability(token.viability)
                        },
                        ...oldState.playerTokens.slice(index+1)
                    ]
                }
            })
        }
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
            focused={appState.activeTokenUid === token.uid}
            enabled={appState.draggingEnabled} 
            isDataVisible={appState.tokenDataVisible}
            token={token}
            onDrag={(e, ui) => handleDrag(e, ui, index)}
            onDrop={() => handleDrop(index)}
            onClick={(e) => handleClick(e, token.uid)}
        />
    ));

    return (
        <>
            <div className="DragZone__pointerCapture" onClick={handleNeutralClick} ></div>
            <div className="DragZone__container">
                {tokens}
            </div>
        </>
    );
}

export default DragZone;
