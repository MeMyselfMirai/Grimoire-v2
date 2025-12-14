import { useContext } from "react";
import "./Card.css"
import { GameContext, GameContextType } from "../data/gameState";
import CardIcons from "./CardIcons";
import CardTitle from "./CardTitle";


export default function Card() {
    const {appState, setAppState} = useContext(GameContext) as GameContextType;

    const card = appState.activeCard;

    if (card === undefined) return (<></>);

    function closeCard() {
        setAppState(oldState => {
            return {
                ...oldState,
                activeCard: undefined
            }
        });
    }

    let epilog = <></>
    if (card.epilog !== undefined) {
        epilog = <span className="Card__epilog">{card.epilog ?? ""}</span>
    }

    return (
        <div className="Card__container" style={{backgroundImage: "url(assets/background-img2.webp)"}}>
            <div 
                className="Card__closeButton General__backgroundImage" 
                onClick={closeCard}
                style={{backgroundImage: 'url("assets/close.png")'}}
            ></div>
            <div className="Card__content">
                <CardTitle title={card.title}/>
                <CardIcons />
                {epilog}
            </div>
        </div>
    )
}