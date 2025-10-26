import { RefObject, useRef, useState } from "react"
import "./Toggle.css"
import { useImage } from "../util";



function Toggle({callback}: any) {
    let [enabled, setEnabled] = useState(false);

    const ref: RefObject<HTMLDivElement | null> = useRef(null);

    function onToggle() {
        if (!ref || !ref.current) return;
        setEnabled(!enabled);
        callback(enabled);
        if (enabled) {
            ref.current!.style.backgroundColor = "green";
        } else {
            ref.current!.style.backgroundColor = "grey";
        }
    }

    return (
        <div ref={ref} 
             id="toggle" 
             onClick={onToggle} 
             className="bottomToggle" 
             style={useImage("/assets/move.png")}>

            
        </div>
    )
}

export default Toggle;
