import { useContext } from "react";
import { GameContext, GameContextType } from "../data/gameState";
import { TokenData } from "../types/TokenData";
import { Visibility } from "../types/Visibility";


function shuffleTokens(tokens: TokenData[]): TokenData[] {
    const output = tokens.filter(token => token.visibility !== Visibility.Assigned);
    tokens = tokens.filter(token => token.visibility === Visibility.Assigned);
    const pos = tokens.map(t => t.position);
    for (let i = pos.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pos[i], pos[j]] = [pos[j], pos[i]];
    }
    return output.concat(tokens.map((token, i) => {
        return {
            ...token,
            position: pos[i]
        }
    }));
}

function spreadTokens(tokens: TokenData[]): TokenData[] {
    
    const center = { 
        y: document.documentElement.scrollHeight / 2, 
        x: document.documentElement.scrollWidth / 2,
    };
    
    const radius = Math.min(center.y, center.x) - 150;
    if (radius < 0) return tokens;


    const firstHalf = tokens.filter(token => token.visibility !== Visibility.Assigned);
    tokens = tokens.filter(token => token.visibility === Visibility.Assigned);
    
    const total = tokens.length;
    const angleSeperation = Math.PI * 2 / total;
    
    const list = tokens.map((token, index) => {
        return {
            angle: Math.atan2(token.position.top + 75 - center.y, token.position.left + 75 - center.x),
            index,
            id: token.id
        };
    });

    console.log(list)
    console.log(list.sort(({angle: a1}, {angle: a2}) => a2 - a1))

    const secondHalf = list.sort(({angle: a1}, {angle: a2}) => a2 - a1).map(({index}, i) => {
        const angle = angleSeperation * (-(total - 1) / 2 + i);
        return {
            ...tokens[index],
            position: {
                top: center.y + radius * -Math.sin(angle) - 75,
                left: center.x + radius * Math.cos(angle) - 75
            }
        }
    });

    return firstHalf.concat(secondHalf);
}

function SideButtons() {
    const { setGameState } = useContext(GameContext) as GameContextType;

    function shuffle() {
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: shuffleTokens(oldState.playerTokens),
                reminders: []
            }
        });
    }

    function spread() {
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: spreadTokens(oldState.playerTokens),
                reminders: []
            }
        });
    }

    function clearAll() {
        // TODO: CONFIRMATIONS
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