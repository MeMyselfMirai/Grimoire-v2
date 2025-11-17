import { useContext } from "react";
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";
import { getToken } from "../../util";


export default function EditButton() {
    const {gameState, setGameState, appState, setAppState} = useContext(GameContext) as AppContextType & GameContextType;

    const token = getToken(appState.activeTokenUid, gameState)!;
    const index = gameState.playerTokens.indexOf(token);

    function editCallback(id: string) {
        setGameState(oldState => {
            return {
                ...oldState,
                playerTokens: [
                    ...oldState.playerTokens.slice(0, index),
                    {
                        ...token,
                        id: id,
                    },
                    ...oldState.playerTokens.slice(index+1)
                ]
            }
        });
    }

    function edit() {
        setAppState(oldState => {
            return {
                ...oldState,
                characterSelectCallback: editCallback
            }
        })
    }

    return (
        <div 
            className="InfoPowers__option" 
            style={{backgroundColor: "#00920C", backgroundImage: "url('assets/edit.png')"}}
            onClick={edit}
        ></div>
    )
}