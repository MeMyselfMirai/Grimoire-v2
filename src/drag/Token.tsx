import { RefObject, useRef } from "react";
import './Token.css';
import Draggable from "react-draggable";
import { Position } from "../types/Position";

function Token({top, left}: Position) {

    // Kludge to fix a reference error in Draggable 4.5.
    // https://github.com/react-grid-layout/react-draggable/issues/771#issuecomment-2545737391
    const ref: RefObject<any> = useRef(null);
    // 
    // useSetupDrag(ref);

  return (
    <Draggable nodeRef={ref}>
        <div ref={ref} className="roleToken" style={{
            backgroundImage:`url(/assets/token.png)`,
            top: top,
            left: left
        }}>
            HELLO WORLD!
        </div>
    </Draggable>
  );
}

export default Token;
