import { useContext } from "react";
import "./Background.css"
import { GameContextType, GameContext } from "../data/gameState";

/**
 * Provides a div that fills the background of the app with some image.
 * @returns A div that fills the screen and shows an image. Should be used as a background.
 */
function Background() {

    const {gameState} = useContext(GameContext) as GameContextType;

    return (
        <div className="Background__image" style={{backgroundImage: gameState.background}}></div>
    )
}

export default Background;
