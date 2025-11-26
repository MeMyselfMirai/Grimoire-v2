import { useContext, useRef } from "react"
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";


export default function DownloadButton() {
    const {gameState} = useContext(GameContext) as AppContextType & GameContextType;

    const linkRef = useRef<HTMLAnchorElement>(null);
    
    function download() {
        if (linkRef.current === null) return;
        linkRef.current.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(gameState));

        linkRef.current.click();
    }


    return (
        <>
            <div 
                onClick={download} 
                className="SideDropdown__button General__backgroundImage" 
                style={{backgroundColor: "#888888", backgroundImage: "url(assets/download.svg)"}}
            />
            <a 
                ref={linkRef} 
                download="gameState.json"
                href=""
                hidden 
            />
        </>
    )
}