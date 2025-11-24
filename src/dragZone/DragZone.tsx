import { useContext } from "react";
import './DragZone.css';
import { GameContextType, GameContext } from "../data/gameState";
import { AppContextType } from "../data/appState";
import TokenZone from "./TokenZone";
import ReminderZone from "./ReminderZone";

/**
 * Provides a div containing the entire "DragZone", a region where all draggable tokens exist. 
 * @param enabled Whether the dragzone allows tokens within it to be dragged.
 * @returns 
 */
function DragZone() {
    const {setAppState} = useContext(GameContext) as GameContextType & AppContextType;



    function handleNeutralClick() {
        setAppState(oldState => {
            return {
                ...oldState,
                activeTokenUid: -1, // None
                promptedReminders: []
            }
        })
    }

    return (
        <>
            <div className="DragZone__pointerCapture" onClick={handleNeutralClick} ></div>
            <TokenZone />
            <ReminderZone />
        </>
    );
}

export default DragZone;
