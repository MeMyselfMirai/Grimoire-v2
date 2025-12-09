import { useContext } from "react";
import { GameContext, GameContextType } from "../../data/gameState";
import { getToken } from "../../util";

/**
 * Add the Delete Button. When clicked, removes the selected token. 
 * @returns 
 */
export default function DeleteButton() {
    const {gameState, setGameState, appState, setAppState} = useContext(GameContext) as GameContextType;
    const token = getToken(appState.activeTokenUid, gameState)!;
    const index = gameState.playerTokens.indexOf(token);

    function deleteToken() {
        setGameState(oldGameState => {
            return {
                ...oldGameState,
                playerTokens: [
                    ...oldGameState.playerTokens.slice(0,index),
                    ...oldGameState.playerTokens.slice(index+1)
                ],
                reminders: oldGameState.reminders.filter(r => r.ownerUid !== appState.activeTokenUid)
            };
        })
        setAppState(oldState => {
            return {
                ...oldState,
                activeTokenUid: -1
            }
        })
    }
    
    return (
        <div 
            onClick={deleteToken}
            className="InfoPowers__option" 
            style={{backgroundColor: "#E60000", backgroundImage: "url('assets/delete.png')"}}
        ></div>
    )
}