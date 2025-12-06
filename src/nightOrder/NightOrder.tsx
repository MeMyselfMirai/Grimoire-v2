import { useContext } from "react";
import "./NightOrder.css"
import { GameContext, GameContextType } from "../data/gameState";
import TopButtons, { NightOrderTab } from "./TopButtons";
import NightOrderList from "./NightOrderList";
import JinxList from "./JinxList";


export default function NightOrder() {
    const { appState } = useContext(GameContext) as GameContextType;

    if (!appState.tokenDataVisible) return <></>

    let listJsx = <></>
    if ([NightOrderTab.FirstNight, NightOrderTab.OtherNight].indexOf(appState.nightOrderData.currentTab) !== -1) {
        listJsx = <NightOrderList />;
    }
    if (appState.nightOrderData.currentTab === NightOrderTab.Jinxes) {
        listJsx = <JinxList />
    }

    return (
        <>
            <TopButtons />
            <div className="NightOrder__container" >
                {listJsx}   
            </div>
        </>
    )
}