import { useContext } from "react";
import "./NightOrder.css"
import { AppContextType } from "../data/appState";
import { GameContext, GameContextType } from "../data/gameState";
import TopButtons, { NightOrderTab } from "./TopButtons";
import NightOrderList from "./NightOrderList";


export default function NightOrder() {
    const { appState } = useContext(GameContext) as AppContextType & GameContextType;

    let listJsx = <></>
    if ([NightOrderTab.FirstNight, NightOrderTab.OtherNight].indexOf(appState.nightOrderData.currentTab) !== -1) {
        console.log("Oop")
        listJsx = <NightOrderList />;
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