import { useState } from "react";
import './Token.css';
import './DragZone.css';
import { Position } from "../types/Position";
import { DraggableData, DraggableEvent } from "react-draggable";
import Token from "./Token";

type DragType = {
    enabled: boolean
    initialPositions: Position[]
}

function DragZone({enabled, initialPositions}: DragType) {

    const [positions, setPositions] = useState(initialPositions)

    function handleDrag(e: DraggableEvent, ui: DraggableData, index: number) {
        let {top, left} = positions[index];
        top += ui.deltaY;
        left += ui.deltaX;
        setPositions([...positions.slice(0, index), {top: top, left: left}, ...positions.slice(index+1)])
        localStorage.setItem("positions", JSON.stringify(positions))
    }

    const tokens = [];
    for (let i = 0; i < positions.length; i++) {
        const pos: Position = initialPositions[i];
        tokens.push(
            <Token key={i} id="alsaahir" top={pos.top} left={pos.left} onDrag={(e, ui) => handleDrag(e, ui, i)} enabled={enabled} />
        )
    }

    return (
        <div id="DragZone__div">
            {tokens}
        </div>
    );
}

export default DragZone;
