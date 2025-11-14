import { MouseEventHandler, RefObject, useRef } from "react";
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

/**
 * A draggable token representing a player in the game. 
 * @param id the Role id to go on this token.
 * @param top how far this token is from the top of the screen, in pixels.
 * @param left how far this token is from the left of the screen, in pixels.
 * @param onDrag a callback to handle this token being dragged around.
 * @param clickCallback a callback to handle this token being clicked. 
 * @param enabled Whether this token should be allowed to be dragged around.
 * @returns 
 */
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
