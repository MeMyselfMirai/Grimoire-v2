import { RefObject, useRef } from "react";
import './Token.css';
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Position } from "../types/Position";
import TokenName from "./TokenName";

type TokenType = Position & {
    onDrag: (e: DraggableEvent, ui: DraggableData) => void,
    enabled: boolean
}

function Token({ top, left, onDrag, enabled}: TokenType) {

    // Kludge to fix a reference error in Draggable 4.5.
    // https://github.com/react-grid-layout/react-draggable/issues/771#issuecomment-2545737391
    const ref: RefObject<any> = useRef(null);

    return (
        <Draggable nodeRef={ref} disabled={!enabled} onDrag={onDrag} positionOffset={{x: left, y: top}}>
            <div
                ref={ref}
                className="Token__container"
                style={{
                    backgroundImage: `url(/assets/token.png)`
                }}
            >
                <img className="Token__image General__backgroundImage" src="/assets/icons/official/legion.png" alt="Legion image"/>
                <TokenName name="Legion" />
            </div>
        </Draggable>
    );
}

export default Token;
