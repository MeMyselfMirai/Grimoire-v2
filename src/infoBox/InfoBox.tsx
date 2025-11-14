import { useContext } from "react";
import { GameState } from "../types/GameState";
import { TokenData } from "../types/TokenData";
import { GameContext, GameContextType } from "../data/gameState";
import { AppContextType } from "../data/appState";
import "./InfoBox.css"


function getToken(uid: number, gameState: GameState): TokenData | undefined {
    for (const token of gameState.playerTokens) {
        if (token.uid === uid) return token;
    }
    return undefined;
}

function InfoBox() {

    const {
        gameState,
        appState
    } = useContext(GameContext) as AppContextType & GameContextType;

    const token = getToken(appState.activeTokenUid, gameState);
    console.log(token);

    if (token === undefined) {
        return ( <></> );
    }

    return (
        <div className="InfoBox__container" style={{backgroundImage: "url('assets/vines.png')"}}>

        </div>
    )
}

export default InfoBox;