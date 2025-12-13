import { MouseEventHandler, RefObject, useContext, useRef } from "react";
import './Token.css';
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import Token from "./Token";
import { TokenData } from "../types/TokenData";
import { Team } from "../types/Team";
import HiddenToken from "./HiddenToken";
import { RoleData } from "../types/Role";
import { GameContext, GameContextType } from "../data/gameState";
import { isStorytellerToken } from "../data/teamData";

type TokenType = {
    token: TokenData;
    focused: boolean;
    dragEnabled: boolean;
    isDataVisible: boolean;
    onDrag: (e: DraggableEvent, ui: DraggableData) => void;
    onClick: MouseEventHandler<HTMLElement>;
    onDrop: () => void;
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
function DraggableToken({ token, focused, dragEnabled, isDataVisible, onDrag, onClick, onDrop}: TokenType) {

    const { roles } = useContext(GameContext) as GameContextType;

    // Kludge to fix a reference error in Draggable 4.5.
    // https://github.com/react-grid-layout/react-draggable/issues/771#issuecomment-2545737391
    const ref: RefObject<any> = useRef(null);
    const touchMoved = useRef({left: 0, top: 0, total: false});

    function hasSufficientlyMoved() {
        touchMoved.current = {
            left: touchMoved.current.left,
            top: touchMoved.current.top,
            total: touchMoved.current.total || touchMoved.current.left ** 2 + touchMoved.current.top ** 2 > 100
        };
        return touchMoved.current.total;
    }

    function handleMouseDown(e: any) {
        if (dragEnabled) return true;
        onClick(e);
    }

    function handleTouchStart() {
        touchMoved.current = {left: 0, top: 0, total: false};
    }

    function handleTouchMove(e:DraggableEvent, ui:DraggableData) {
        touchMoved.current = {
            left: touchMoved.current.left + ui.deltaX,
            top: touchMoved.current.top + ui.deltaY,
            total: touchMoved.current.total
        }
        hasSufficientlyMoved();
        onDrag(e,ui);
    }

    function handleTouchEnd(e: any) {
        if (touchMoved.current.total) {
            onDrop();
        } else {
            e.preventDefault();
            onClick(e);
        }
        touchMoved.current = {left: 0, top: 0, total: false};
    }

    let innerToken = <Token token={token} focused={focused} className="Token__container" />
    if (!isDataVisible && !isStorytellerToken(token, roles)) {
        innerToken = <HiddenToken token={token} className="Token__container" />
    }

    return (
        <Draggable 
            nodeRef={ref} 
            disabled={!dragEnabled} 
            position={{x: token.position.left, y: token.position.top}} 
            onMouseDown={handleMouseDown}
            onStart={handleTouchStart}
            onDrag={handleTouchMove}
            onStop={handleTouchEnd}
        >
            <div ref={ref} style={{zIndex: hasSufficientlyMoved() ? 1 : 0}}>
                {innerToken}
            </div>
        </Draggable>
    );
}

export default DraggableToken;
