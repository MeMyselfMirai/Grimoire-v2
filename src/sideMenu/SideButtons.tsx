import { useContext } from "react";
import { GameContext, GameContextType } from "../data/gameState";
import { TokenData } from "../types/TokenData";


function shuffleTokens(tokens: TokenData[]): TokenData[] {
    const pos = tokens.map(t => t.position);
    for (let i = pos.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pos[i], pos[j]] = [pos[j], pos[i]];
    }
    return tokens.map((token, i) => {
        return {
            ...token,
            position: pos[i]
        }
    });
}

function SideButtons() {
    const { setGameState } = useContext(GameContext) as GameContextType;

    function shuffle() {
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: shuffleTokens(oldState.playerTokens)
            }
        });
    }

    function clearAll() {
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: [],
                reminders: [],
            }
        });
    }

    return (
        <div className="SideButtons__container">
            <div 
                className="SideButtons__button General__backgroundImage SideButtons__clearAll" 
                style={{backgroundImage: "url(assets/clean.svg)"}}
                onClick={clearAll}
            ></div>
            <div
                className="SideButtons__button General__backgroundImage SideButtons__shuffle"
                style={{backgroundImage: "url(assets/shuffle.svg)"}}
                onClick={shuffle}
            ></div>
        </div>
    )
}

export default SideButtons;