import { useContext } from "react";
import { AppContextType } from "../data/appState";
import { GameContext, GameContextType } from "../data/gameState";

export enum NightOrderTab {
    None = "None",
    Jinxes = "Jinxes",
    FirstNight = "First",
    OtherNight = "Other",
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

    const buttons = Object.values(NightOrderTab)
        .filter(t => t != NightOrderTab.None)
        .reverse()
        .map(tab => {
            const tabStyle: any = {...style};
            if (appState.nightOrderData.currentTab === tab) tabStyle.color = "white";
            return (
                <div 
                    className="TopButtons__button" 
                    style={tabStyle} 
                    onClick={() => setOpenTabTo(tab)}
                >
                    {tab}
                </div>
            )
        })

    return (
        <div className="TopButtons__container">
            {buttons}
        </div>
    )
}