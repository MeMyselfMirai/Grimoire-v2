import { useContext } from "react";
import { GameContext, GameContextType } from "../../data/gameState";
import { nextViability, Viability } from "../../types/Viability";
import { getToken } from "../../util";
import { isStorytellerToken } from "../../data/teamData";

/**
 * Edit the token's viability -- cycle it between being alive, dead, and deadvoted.
 * @returns 
 */
export default function ViabilityButton() {
    const {gameState, setGameState, appState, roles} = useContext(GameContext) as GameContextType;
    const token = getToken(appState.activeTokenUid, gameState)!;
    const index = gameState.playerTokens.indexOf(token);

    let viabilityUrl: string;
    switch (token.viability) {
        case Viability.Alive:
            viabilityUrl = "url('assets/tombstone.png')";
            break;
        case Viability.Dead:
            viabilityUrl = "url('assets/vote.png')";
            break;
        case Viability.NoVote:
            viabilityUrl = "url('assets/revive.png')";
            break;
    }

    function cycleViability() {
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: [
                    ...oldState.playerTokens.slice(0, index),
                    {
                        ...oldState.playerTokens[index],
                        viability: nextViability(token.viability)
                    },
                    ...oldState.playerTokens.slice(index+1)
                ]
            };
        })
    }

    if (isStorytellerToken(token, roles)) return <></>;
    

    return (
        <div 
            onClick={cycleViability}
            className="InfoPowers__option" 
            style={{backgroundColor: "#444444", backgroundImage: viabilityUrl}}
        ></div>
    )
}