import { useContext, useState } from "react";
import { GameContext, GameContextType } from "../data/gameState";
import "./InfoBox.css"
import InfoDetails from "./InfoDetails";
import InfoReminders from "./Reminders/InfoReminders";
import InfoShrouds from "./shrouds/InfoShrouds";
import InfoPowers from "./Powers/InfoPowers";
import { getToken } from "../util";

/**
 * An enum storing which Info Box tab is currently open.
 */
enum Focus {
    DETAILS,
    SHROUDS,
    REMINDERS,
    POWERS
}

export type InfoTabType = {
    focused: boolean,
    focusCallback: () => void
}

/**
 * The info Box. A bar of infomration and actions along the botom of the screen
 * that shows info on the state of a currently selected token. Only appears if
 * there is a selected token to provide information about.
 * @returns 
 */
function InfoBox() {

    const {gameState, appState} = useContext(GameContext) as GameContextType;
    const [focus, setFocus] = useState(Focus.DETAILS);

    const token = getToken(appState.activeTokenUid, gameState);
    if (token === undefined) {
        return ( <></> );
    }

    
    return (
        <div className="InfoBox__container" style={{backgroundImage: "url('assets/vines.png')"}}>
            <InfoDetails 
                token={token} 
                focused={focus === Focus.DETAILS}
                focusCallback={() => setFocus(Focus.DETAILS)}
            ></InfoDetails>
            <InfoShrouds
                focused={focus === Focus.SHROUDS}
                focusCallback={() => setFocus(Focus.SHROUDS)}
            ></InfoShrouds>
            <InfoReminders
                focused={focus === Focus.REMINDERS}
                focusCallback={() => setFocus(Focus.REMINDERS)}
            ></InfoReminders>
            <InfoPowers
                focused={focus === Focus.POWERS}
                focusCallback={() => setFocus(Focus.POWERS)}
            ></InfoPowers>
        </div>
    )
}

export default InfoBox;