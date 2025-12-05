import { useContext } from "react";
import { AppContextType } from "../data/appState";
import { GameContext, GameContextType } from "../data/gameState";

/**
 * A button to toggle visibility. 
 * In the visible state, all token and reminder information will be freely
 * displayed to the user. 
 * In the invisible, or "town saure" state, only the aliveness of assigned tokens will be shown to the user. All other functionality will be disabled. This way, the Storyteller can display 
 * @returns 
 */
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