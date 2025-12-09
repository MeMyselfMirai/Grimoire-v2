import { useContext } from "react";
import { GameContext, GameContextType } from "../../data/gameState";
import { nextVisibility, Visibility } from "../../types/Visibility";
import { getToken } from "../../util";

/**
 * Edit the token's visibility -- cycle between being assigned, a demon bluff, or hidden for administrative reasons. 
 * @returns 
 */
export default function VisibilityButton() {
    const {gameState, setGameState, appState} = useContext(GameContext) as GameContextType;
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