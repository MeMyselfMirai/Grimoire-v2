import { useState } from "react";
import './Token.css';
import './DragZone.css';
import { DraggableData, DraggableEvent } from "react-draggable";
import Token from "./Token";
import { TokData } from "../data/gameState";
import { ROLES } from "../data/roleData";

type DragType = {
    enabled: boolean
    initialPositions: TokData[]
}

function DragZone({enabled, initialPositions}: DragType) {

    const [positions, setPositions] = useState(initialPositions);

    function handleDrag(e: DraggableEvent, ui: DraggableData, index: number) {
        setPositions(positions => {
            const updatedPositions = [...positions];
            updatedPositions[index] = {
                ...updatedPositions[index],
                top: updatedPositions[index].top + ui.deltaY,
                left: updatedPositions[index].left + ui.deltaX,
            };
            localStorage.setItem("positions", JSON.stringify(updatedPositions));
            return updatedPositions;
        });
    }

    function handleClick(index: number) {
        const choices = Object.keys(ROLES).length;
        const choice = Math.floor(Math.random() * choices);
        const newId = Object.keys(ROLES)[choice];

        setPositions(positions => {
            const updatedPositions = [...positions];
            updatedPositions[index] = {
                ...updatedPositions[index],
                id: newId
            };
            localStorage.setItem("positions", JSON.stringify(updatedPositions));
            return updatedPositions;
        });
    }

    const tokens = positions.map((pos, index) => (
        <Token 
            key={index} 
            id={pos.id} 
            top={pos.top} 
            left={pos.left} 
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
