import { useContext } from "react";
import { AppContextType } from "../data/appState";
import { GameContext, GameContextType } from "../data/gameState";


export default function ToggleVisibility() {
    const {appState, setAppState} = useContext(GameContext) as AppContextType & GameContextType;

    function onToggle() {
        setAppState(oldState => {
            return {
                ...oldState,
                // Should be impossible since the button is covered by infobox, but eh.
                activeTokenUid: -1,
                tokenDataVisible: !oldState.tokenDataVisible
            }
        });
    }

    return (
        <div onClick={onToggle} 
             className="BottomButtons__button BottomButtons__visibilityToggle" 
             style={{backgroundImage: 'url("/assets/visibility_off.png")', backgroundColor: (appState.tokenDataVisible ? "grey" : "lightblue")}}>
        </div>
    )
}