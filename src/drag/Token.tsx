import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import './Token.css';
import Draggable from "react-draggable";
import { Position } from "../types/Position";

var top: number, setTop: Dispatch<SetStateAction<number>>;
var left: number, setLeft: Dispatch<SetStateAction<number>>;

function useSetupDrag(ref: RefObject<any>) {
    useEffect(() => {
        /** The X offset between the cursor and a dragged element */
        var xOffset: number = 0;
        /** The Y offset between the cursor and a dragged element */
        var yOffset: number = 0;
        let dragged: HTMLElement | null;
        const dragStart = (e: any) => {
            console.log(ref);
            if (!ref.current || !ref.current.contains(e.target)) return;
            xOffset = e.pageX - left;
            yOffset = e.pageY - top;
            dragged = e.target;
        }

        const drag = (e: any) => {
            if (!dragged) return;
            e.preventDefault();
            setLeft(e.pageX - xOffset);
            setTop(e.pageY - yOffset);
        }

        const dragEnd = (e: any) => {
            if (!dragged) return;
            dragged = null;
        }

        window.addEventListener("mousedown", dragStart, false);
        window.addEventListener("mouseup", dragEnd, false);
        window.addEventListener("mousemove", drag, false);
    }, [ref]);
}



function Token({top, left}: Position) {

    // Kludge to fix a reference error in Draggable 4.5.
    // https://github.com/react-grid-layout/react-draggable/issues/771#issuecomment-2545737391
    const ref: RefObject<any> = useRef(null);
    // 
    // useSetupDrag(ref);

  return (
    <Draggable nodeRef={ref}>
        <div ref={ref} className="Token" style={{
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
