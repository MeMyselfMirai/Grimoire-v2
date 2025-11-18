import { useContext } from "react";
import { AppContextType } from "../data/appState";
import { GameContext, GameContextType } from "../data/gameState";

export enum NightOrderTab {
    None = "None",
    FirstNight = "FirstNight",
    OtherNight = "OtherNight",
    Jinxes = "Jinxes"
}

export default function TopButtons() {
    const { appState, setAppState } = useContext(GameContext) as AppContextType & GameContextType;
    const style = {backgroundImage: 'url("assets/vines.png")'};
    console.log(appState.nightOrderData)

    function setOpenTabTo(tabName: NightOrderTab) {
        if (appState.nightOrderData.currentTab === tabName) {
            tabName = NightOrderTab.None;
        }
        setAppState(oldState => {
            return {
                ...oldState,
                nightOrderData: {
                    ...oldState.nightOrderData,
                    currentTab: tabName
                }
            }
        })
    }

    return (
        <div className="TopButtons__container">
            <div className="TopButtons__button" style={style} onClick={() => setOpenTabTo(NightOrderTab.OtherNight)}>other</div>
            <div className="TopButtons__button" style={style} onClick={() => setOpenTabTo(NightOrderTab.FirstNight)}>first</div>
            <div className="TopButtons__button" style={style} onClick={() => setOpenTabTo(NightOrderTab.Jinxes)}>jinxes</div>

        </div>
    )
}