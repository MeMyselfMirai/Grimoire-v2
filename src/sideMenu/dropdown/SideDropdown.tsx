import { useState } from "react"
import "./SideDropdown.css"
import DownloadButton from "./DownloadButton";
import UploadButton from "./UploadButton";
import BackgroundButton from "./BackgroundButton";
import ScriptChoices from "./ScriptChoices";

export default function SideDropdown() {

    const [open, setOpen] = useState(false);

    function toggle() {
        setOpen(!open);
    }

    const focusClass = open ? " SideDropdown__open" : "";

    return (
        <div className={"SideDropdown__container" + focusClass}>
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
            <div className="SideDropdown__content">
                <div className="SideDropdown__buttonContainer">
                    <UploadButton />
                    <BackgroundButton />
                    <DownloadButton />
                </div>
                <ScriptChoices />
            </div>
        </div>
    )
}