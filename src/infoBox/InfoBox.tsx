import { useContext, useState } from "react";
import { GameContext, GameContextType } from "../data/gameState";
import { AppContextType } from "../data/appState";
import "./InfoBox.css"
import InfoDetails from "./InfoDetails";
import InfoReminders from "./InfoReminders";
import InfoShrouds from "./shrouds/InfoShrouds";
import InfoPowers from "./Powers/InfoPowers";
import { getToken } from "./util";

enum Focus {
    DETAILS,
    SHROUDS,
    REMINDERS,
    POWERS
}

function InfoBox() {

    const {gameState, appState} = useContext(GameContext) as AppContextType & GameContextType;
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