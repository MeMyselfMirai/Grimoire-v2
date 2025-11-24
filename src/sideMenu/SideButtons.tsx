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

function spreadTokens(token: TokenData[]): TokenData[] {
    const total = token.length;

    const center = { 
        y: document.documentElement.scrollHeight / 2, 
        x: document.documentElement.scrollWidth / 2,
    };

    const radius = Math.min(center.y, center.x) - 150;
    if (radius < 0) return token;
    
    const angleSeperation = Math.PI * 2 / total;
    
    const list = token.map((token, index) => {
        return {
            angle: Math.atan2(token.position.top + 75 - center.y, token.position.left + 75 - center.x),
            index,
            id: token.id
        };
    });

    console.log(list)
    console.log(list.sort(({angle: a1}, {angle: a2}) => a2 - a1))

    return list.sort(({angle: a1}, {angle: a2}) => a2 - a1).map(({index}, i) => {
        const angle = angleSeperation * (-(total - 1) / 2 + i);
        return {
            ...token[index],
            position: {
                top: center.y + radius * -Math.sin(angle) - 75,
                left: center.x + radius * Math.cos(angle) - 75
            }
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

    function spread() {
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: spreadTokens(oldState.playerTokens)
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
            <div
                className="SideButtons__button General__backgroundImage SideButtons__spread"
                style={{backgroundImage: "url(assets/spread.svg)"}}
                onClick={spread}
            ></div>
        </div>
    )
}

export default SideButtons;