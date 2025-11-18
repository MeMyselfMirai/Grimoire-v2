import { useContext } from "react"
import { AppContextType } from "../data/appState";
import { GameContext, GameContextType } from "../data/gameState";



function ToggleDrag() {
    const {appState, setAppState} = useContext(GameContext) as AppContextType & GameContextType;

    function onToggle() {
        setAppState(oldState => {
            return {
                ...oldState,
                draggingEnabled: !oldState.draggingEnabled
            }
        })
    }

    return (
        <div onClick={onToggle} 
             className="BottomButtons__button BottomButtons__dragToggle" 
             style={{backgroundImage: 'url("/assets/move.png")', backgroundColor: (appState.draggingEnabled ? "green" : "grey")}}>
        </div>
    )
}

export default ToggleDrag;
