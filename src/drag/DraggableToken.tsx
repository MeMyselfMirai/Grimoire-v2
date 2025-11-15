import { MouseEventHandler, RefObject, useRef } from "react";
import './Token.css';
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Position } from "../types/Position";
import Token from "./Token";

type TokenType = {
    position: Position,
    onDrag: (e: DraggableEvent, ui: DraggableData) => void,
    onClick: MouseEventHandler<HTMLElement>,
    onDrop: () => void
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
function DraggableToken({ id, position, onDrag, onClick, onDrop, enabled}: TokenType) {

    // Kludge to fix a reference error in Draggable 4.5.
    // https://github.com/react-grid-layout/react-draggable/issues/771#issuecomment-2545737391
    const ref: RefObject<any> = useRef(null);
    const touchMoved = useRef(false);


    function handleTouchStart() {
        touchMoved.current = false;
    }

    function handleTouchMove(e:any, ui:any) {
        touchMoved.current = true;
        console.log("aaaaaaaaaa")
        onDrag(e,ui);
    }

    function handleTouchEnd(e: any) {
        console.log("END")
        console.log(touchMoved)
        if (touchMoved.current) {
            onDrop();
        } else {
            e.preventDefault();
            onClick(e as React.MouseEvent<HTMLElement,MouseEvent>);
        }
        touchMoved.current = false;
    }

    return (
        <Draggable 
            nodeRef={ref} 
            disabled={!enabled} 
            position={{x: position.left, y: position.top}} 
            onStart={handleTouchStart}
            onDrag={handleTouchMove} 
            onStop={handleTouchEnd}
        >
            <div ref={ref} style={{zIndex: touchMoved.current ? 1 : 0}}>
                <Token id={id} className="Token__container"></Token>
            </div>
        </Draggable>
    );
}

export default DraggableToken;
