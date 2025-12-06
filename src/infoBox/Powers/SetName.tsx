import { useContext } from "react";
import { GameContext, GameContextType } from "../../data/gameState";
import { getToken } from "../../util";


export default function SetName() {
    const {gameState, setGameState, appState} = useContext(GameContext) as GameContextType;
    const token = getToken(appState.activeTokenUid, gameState)!;
    const index = gameState.playerTokens.indexOf(token);

    
    function setTokenName(e: any) {
        const name: string = e.target.value;
        setGameState(oldGameState => {
            return {
                ...oldGameState,
                playerTokens: [
                    ...oldGameState.playerTokens.slice(0,index),
                    {
                        ...oldGameState.playerTokens[index],
                        name: name
                    },
                    ...oldGameState.playerTokens.slice(index+1)
                ]
            };
        })
    }

    return (
        <>
            <span className="InfoPowers__nameLabel">Player Name:</span>
            <br />
            <br />
            <input 
                autoComplete="off" 
                type="text" 
                className="InfoPowers__nameInput" 
                onChange={setTokenName}
                value={token.name}
            />
            <br />
            <br />
        </>
    )
}