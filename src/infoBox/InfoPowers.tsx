import { useContext } from "react";
import { AppContextType } from "../data/appState";
import { GameContext, GameContextType } from "../data/gameState";
import { getToken, InfoTabType } from "./util";
import { Viability } from "../types/Viability";
import { Visibility } from "../types/Visibility";

function InfoPowers({focused, focusCallback}: InfoTabType) {
    const {gameState, setGameState, appState, setAppState} = useContext(GameContext) as AppContextType & GameContextType;
    const token = getToken(appState.activeTokenUid, gameState)!;
        const index = gameState.playerTokens.indexOf(token);
    if (index < 0) {
        console.error(`Token with UID ${appState.activeTokenUid} is being edited, but how?`);
        return (<></>);
    }
    
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

    function deleteToken() {
        setGameState(oldGameState => {
            return {
                ...oldGameState,
                playerTokens: [
                    ...oldGameState.playerTokens.slice(0,index),
                    ...oldGameState.playerTokens.slice(index+1)
                ]
            };
        })
        setAppState(oldState => {
            return {
                ...oldState,
                activeTokenUid: -1
            }
        })
    }

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

    function cycleVisibility() {
        let newVisibility: Visibility;
        switch (token.visibility) {
            case Visibility.Assigned:
                newVisibility = Visibility.Bluff;
                break;
            case Visibility.Bluff:
                newVisibility = Visibility.Hidden;
                break;
            case Visibility.Hidden:
                newVisibility = Visibility.Assigned;
                break;
        }
        
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: [
                    ...oldState.playerTokens.slice(0, index),
                    {
                        ...oldState.playerTokens[index],
                        visibility: newVisibility
                    },
                    ...oldState.playerTokens.slice(index+1)
                ]
            };
        })
    }

    return (
        <div className={"InfoPowers__container InfoBox__tab" + (focused ? " InfoBox__focus" : "")}>
            <div 
                className="InfoBox__tabHeader InfoBox__tabHeaderGeneric" 
                style={{backgroundImage: "url('assets/yellow_swirls.webp')"}}
                onClick={focusCallback}
            >
                <img className="InfoBox__tabImage" src="assets/power.png" alt=""></img>
            </div>
            <div className="InfoPowers__content">
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
                <div className="InfoPowers__optionsContainer">
                    <div 
                        onClick={deleteToken}
                        className="InfoPowers__option" 
                        style={{backgroundColor: "#E60000", backgroundImage: "url('assets/delete.png')"}}
                    ></div>
                    <div 
                        onClick={cycleViability}
                        className="InfoPowers__option" 
                        style={{backgroundColor: "#444444", backgroundImage: viabilityUrl}}
                    ></div>
                    <div 
                        onClick={cycleVisibility}
                        className="InfoPowers__option" 
                        style={{backgroundColor: "#00639C", backgroundImage: "url('assets/visibility.png')"}}
                    ></div>
                    <div 
                        className="InfoPowers__option" 
                        style={{backgroundColor: "#00920C", backgroundImage: "url('assets/edit.png')"}}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default InfoPowers;