import { useContext, useEffect, useRef, useState } from "react"
import "./SideDropdown.css"
import DownloadButton from "./DownloadButton";
import UploadButton from "./UploadButton";
import BackgroundButton from "./BackgroundButton";
import ScriptChoices from "./ScriptChoices";
import PlayerCount from "./PlayerCount";
import { GameContext, GameContextType } from "../../data/gameState";
import ScriptInfo from "./ScriptInfo";

export default function SideDropdown() {
    const {gameState} = useContext(GameContext) as GameContextType;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<any>(null);  
    const contentRef = useRef<any>(null);  

    useEffect(() => {
        if (dropdownRef.current === null) return;
        if (contentRef.current === null) return;

        dropdownRef.current.style.height = (open ? 70 + contentRef.current.scrollHeight : 40) + "px";

    }, [open, gameState.script, gameState.playerCount])

    function toggle() {
        setOpen(!open);
    }

    const focusClass = open ? " SideDropdown__open" : "";

    return (
        <div ref={dropdownRef} className={"SideDropdown__container" + focusClass}>
            <div 
                className="SideDropdown__toggle"
                style={{backgroundImage: "url(assets/steel_bg.png)"}}
                onClick={toggle}
            >
                <img 
                    className="SideDropdown__toggleImage"
                    src="/assets/expand_more.png" 
                    alt={open ? "collapse" : "expand"} 
                />
            </div>
            <div ref={contentRef} className="SideDropdown__content">
                <div className="SideDropdown__buttonContainer">
                    <UploadButton />
                    <BackgroundButton />
                    <DownloadButton />
                </div>
                <ScriptChoices />
                <ScriptInfo />
                <PlayerCount />
            </div>
        </div>
    )
}