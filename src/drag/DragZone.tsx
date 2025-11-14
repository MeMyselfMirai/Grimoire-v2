import { useContext } from "react";
import './Token.css';
import './DragZone.css';
import { DraggableData, DraggableEvent } from "react-draggable";
import Token from "./Token";
import { ContextType, GameContext } from "../data/gameState";
import { ROLES } from "../data/roleData";
import { GameState } from "../types/GameState";

type DragType = {
    enabled: boolean
}

function DragZone({enabled}: DragType) {

    const {gameState, setGameState}: ContextType = useContext(GameContext) as ContextType;

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

    function handleClick(index: number) {
        const choices = Object.keys(ROLES).length;
        const choice = Math.floor(Math.random() * choices);
        const newId = Object.keys(ROLES)[choice];

        setGameState(oldState => {
            const newState: GameState = {...oldState};
            newState.playerTokens = [...oldState.playerTokens];
            newState.playerTokens[index] = {
                ...newState.playerTokens[index],
                id: newId
            }
            return newState;
        });
    }

    const tokens = gameState.playerTokens.map((token, index) => (
        <Token 
            key={index} 
            id={token.id} 
            top={token.position.top} 
            left={token.position.left} 
            onDrag={(e, ui) => handleDrag(e, ui, index)} 
            onClick={() => handleClick(index)}
            enabled={enabled} 
        />
    ));

    return (
        <div id="DragZone__div">
            {tokens}
        </div>
    );
}

export default DragZone;
