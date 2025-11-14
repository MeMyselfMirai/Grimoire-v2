import { useContext } from "react";
import "./Background.css"
import { ContextType, GameContext } from "../data/gameState";

function Background() {

    const {gameState} = useContext(GameContext) as ContextType;

    return (
        <div className="Background__image" style={{backgroundImage: gameState.background}}></div>
    )
}

export default Background;
