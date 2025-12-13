import { useContext } from "react";
import { GameContext, GameContextType } from "../data/gameState";
import { TokenData } from "../types/TokenData";
import { Visibility } from "../types/Visibility";
import { RoleData } from "../types/Role";
import { Team } from "../types/Team";


function shuffleTokens(tokens: TokenData[], roles: RoleData): TokenData[] {
    const output = tokens
        .filter(token => token.visibility !== Visibility.Assigned || [Team.Fabled, Team.Loric].includes(roles[token.id].team))
    tokens = tokens
        .filter(token => token.visibility === Visibility.Assigned)
        .filter(token => ![Team.Fabled, Team.Loric].includes(roles[token.id].team))
    const positions = tokens.map(t => t.position);
    const names = tokens.map(t => t.name);
    for (let i = positions.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
        [names[i], names[j]] = [names[j], names[i]];
    }
    return output.concat(tokens.map((token, i) => {
        return {
            ...token,
            position: positions[i],
            name: names[i]
        }
    }));
}

function spreadTokens(tokens: TokenData[], roles: RoleData): TokenData[] {
    
    const center = { 
        y: document.documentElement.scrollHeight / 2, 
        x: document.documentElement.scrollWidth / 2,
    };
    
    const radius = Math.min(center.y, center.x) - 150;
    if (radius < 0) return tokens;


    const firstHalf = tokens.filter(token => token.visibility !== Visibility.Assigned || [Team.Fabled, Team.Loric].includes(roles[token.id].team))
    tokens = tokens
        .filter(token => token.visibility === Visibility.Assigned)
        .filter(token => ![Team.Fabled, Team.Loric].includes(roles[token.id].team))
    
    const total = tokens.length;
    const angleSeperation = Math.PI * 2 / total;
    
    const list = tokens.map((token, index) => {
        return {
            angle: Math.atan2(token.position.top + 75 - center.y, token.position.left + 75 - center.x),
            index,
            id: token.id
        };
    });


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
    const { setGameState, setAppState, roles } = useContext(GameContext) as GameContextType;

    function shuffle() {
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: shuffleTokens(oldState.playerTokens, roles),
                reminders: []
            }
        });
    }

    function spread() {
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: spreadTokens(oldState.playerTokens, roles),
                reminders: []
            }
        });
    }

    function clearAll() {
        const callback = () => {
            setGameState(oldState => {
                return {
                    ...oldState,
                    playerTokens: [],
                    reminders: [],
                }
            });
        }

        // TODO: CONFIRMATIONS
        setAppState(state => {
            return {
                ...state,
                dialog: {
                    message: "This will delete all tokens and reminders. Are you sure you want to do this?",
                    allowCancel: true,
                    callback
                }
            }
        })

        
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