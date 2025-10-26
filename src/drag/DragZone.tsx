import { RefObject, useRef, useState } from "react";
import './Token.css';
import { Position } from "../types/Position";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

type DragType = { enabled: boolean }

const multipleTokens: Position[] = JSON.parse(localStorage.getItem("positions") ?? "[]") as Position[];
if (multipleTokens.length == 0) {
    for (let i = 0; i < 9; i++) {
        multipleTokens.push({ top: Math.random() * 400, left: Math.random() * 800})
    }
}


function DragZone({enabled}: DragType) {
    // Kludge to fix a reference error in Draggable 4.5.
    // https://github.com/react-grid-layout/react-draggable/issues/771#issuecomment-2545737391
    const ref: RefObject<any> = useRef(null);

    const [positions, setPositions] = useState(multipleTokens)

    function handleDrag(e: DraggableEvent, ui: DraggableData, index: number) {
        let {top, left} = positions[index];
        top += ui.deltaY;
        left += ui.deltaX;
        setPositions([...positions.slice(0, index), {top: top, left: left}, ...positions.slice(index+1)])
        localStorage.setItem("positions", JSON.stringify(positions))
    }

    const tokens = [];
    for (let i = 0; i < positions.length; i++) {
        const pos: Position = positions[i];
        tokens.push(
            <Draggable 
                key={i} 
                nodeRef={ref} 
                disabled={!enabled} 
                onDrag={(e,ui) => handleDrag(e, ui, i)} 
                positionOffset={{x: multipleTokens[i].left, y: multipleTokens[i].top}}
            >
                <div
                    ref={ref}
                    className="roleToken"
                    style={{
                        backgroundImage: `url(/assets/token.png)`,
                    }}
                >
                    HELLO WORLD!
                </div>
            </Draggable>
        )
    }

    return (
        <div id="DragZone__div">
            {tokens}
            
        </div>
    );
}

export default DragZone;
