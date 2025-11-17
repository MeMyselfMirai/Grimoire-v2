import { useContext } from "react";
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";
import { nextVisibility, Visibility } from "../../types/Visibility";
import { getToken } from "../../util";


export default function VisibilityButton() {
    const {gameState, setGameState, appState} = useContext(GameContext) as AppContextType & GameContextType;
    const token = getToken(appState.activeTokenUid, gameState)!;
    const index = gameState.playerTokens.indexOf(token);
    
    let visibilityUrl: string;
    switch (token.visibility) {
        case Visibility.Assigned:
            visibilityUrl = "url('assets/bluff.png')";
            break;
        case Visibility.Bluff:
            visibilityUrl = "url('assets/visibility_off.png')";
            break;
        case Visibility.Hidden:
            visibilityUrl = "url('assets/visibility.png')";
            break;
    }

    function cycleVisibility() {        
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: [
                    ...oldState.playerTokens.slice(0, index),
                    {
                        ...oldState.playerTokens[index],
                        visibility: nextVisibility(token.visibility)
                    },
                    ...oldState.playerTokens.slice(index+1)
                ]
            };
        })
    }
    
    return (
        <div 
            onClick={cycleVisibility}
            className="InfoPowers__option" 
            style={{backgroundColor: "#00639C", backgroundImage: visibilityUrl}}
        ></div>
    )
}