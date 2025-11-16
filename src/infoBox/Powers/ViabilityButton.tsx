import { useContext } from "react";
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";
import { Viability } from "../../types/Viability";
import { getToken } from "../util";


export default function ViabilityButton() {
    const {gameState, setGameState, appState} = useContext(GameContext) as AppContextType & GameContextType;
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
        let newViability: Viability;
        switch (token.viability) {
            case Viability.Alive:
                newViability = Viability.Dead;
                break;
            case Viability.Dead:
                newViability = Viability.NoVote;
                break;
            case Viability.NoVote:
                newViability = Viability.Alive;
                break;
        }
        
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: [
                    ...oldState.playerTokens.slice(0, index),
                    {
                        ...oldState.playerTokens[index],
                        viability: newViability
                    },
                    ...oldState.playerTokens.slice(index+1)
                ]
            };
        })
    }
    

    return (
        <div 
            onClick={cycleViability}
            className="InfoPowers__option" 
            style={{backgroundColor: "#444444", backgroundImage: viabilityUrl}}
        ></div>
    )
}