import { useContext } from "react";
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";


export default function BackgroundButton() {
    const {setAppState} = useContext(GameContext) as AppContextType & GameContextType;

    function openBackgroundSelector() {
        setAppState(oldState => {
            return {
                ...oldState,
                isBackgroundSelectorOpen: true
            }
        })
    }

    return (
        <div 
            onClick={openBackgroundSelector}
            className="SideDropdown__button General__backgroundImage"
            style={{backgroundColor: "#78258d", backgroundImage: "url(assets/wallpaper.svg)" }}
        />
    )
}