import { RefObject, useRef } from "react";
import './Token.css';
import Draggable from "react-draggable";
import { Position } from "../types/Position";

type TokenType = Position & {
    enabled: boolean
}

function Token({ top, left, enabled }: TokenType) {

    // Kludge to fix a reference error in Draggable 4.5.
    // https://github.com/react-grid-layout/react-draggable/issues/771#issuecomment-2545737391
    const ref: RefObject<any> = useRef(null);

    return (
        <Draggable nodeRef={ref} disabled={!enabled}>
            <div
                ref={ref}
                className="roleToken"
                style={{
                    backgroundImage: `url(/assets/token.png)`,
                    top: top,
                    left: left
                }}
                
            >
                HELLO WORLD!
            </div>
        </Draggable>
    );
}

export default Token;
