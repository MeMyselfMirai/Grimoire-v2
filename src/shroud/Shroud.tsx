import { useContext } from "react";
import "./Shroud.css"
import { GameContext, GameContextType } from "../data/gameState";
import ShroudIcons from "./ShroudIcons";
import ShroudTitle from "./ShroudTitle";


export default function Shroud() {
    const {appState, setAppState} = useContext(GameContext) as GameContextType;

    const shroud = appState.activeShroud;

    if (shroud === undefined) return (<></>);

    function closeShroud() {
        setAppState(oldState => {
            return {
                ...oldState,
                activeShroud: undefined
            }
        });
    }

    let epilog = <></>
    if (shroud.epilog !== undefined) {
        epilog = <span className="Shroud__epilog">{shroud.epilog ?? ""}</span>
    }

    return (
        <div className="Shroud__container" style={{backgroundImage: "url(assets/background-img2.webp)"}}>
            <div 
                className="Shroud__closeButton General__backgroundImage" 
                onClick={closeShroud}
                style={{backgroundImage: 'url("assets/close.png")'}}
            ></div>
            <div className="Shroud__content">
                <ShroudTitle title={shroud.title}/>
                <ShroudIcons />
                {epilog}
            </div>
        </div>
    )
}