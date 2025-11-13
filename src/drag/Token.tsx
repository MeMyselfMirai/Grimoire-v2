import { MouseEventHandler, RefObject, TouchEventHandler, useRef } from "react";
import './Token.css';
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Position } from "../types/Position";
import TokenName from "./TokenName";
import { ROLES } from "../data/roleData";

type TokenType = Position & {
    onDrag: (e: DraggableEvent, ui: DraggableData) => void,
    onClick: MouseEventHandler<HTMLElement>
    enabled: boolean,
    id: string
}

function Token({ id, top, left, onDrag, onClick, enabled}: TokenType) {

    const data = ROLES[id];

    // Kludge to fix a reference error in Draggable 4.5.
    // https://github.com/react-grid-layout/react-draggable/issues/771#issuecomment-2545737391
    const ref: RefObject<any> = useRef(null);

    return (
        <Draggable nodeRef={ref} disabled={!enabled} onDrag={onDrag} position={{x: left, y: top}}>
            <div
                ref={ref}
                className="Token__container"
                style={{
                    backgroundImage: `url(/assets/token.png)`
                }}
                onClick={onClick}
            >
                <img className="Token__image General__backgroundImage" src={data.image} alt={data.name}/>
                <TokenName name={data.name} />
            </div>
        </Draggable>
    );
}

export default Token;
