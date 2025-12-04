import { useContext } from "react";
import "./BackgroundSelector.css"
import { AppContextType } from "../data/appState";
import { GameContext, GameContextType } from "../data/gameState";


const BACKGROUND_ASSETS: string[] = [
    "assets/backgrounds/red_troublebrewing_logo.webp",
    "assets/backgrounds/red_circle_large.webp",
    "assets/backgrounds/red_circle_small.webp",
    "assets/backgrounds/red_swirls.webp",

    "assets/backgrounds/yellow_badmoonrising_logo.webp",
    "assets/backgrounds/yellow_circle_large.webp",
    "assets/backgrounds/yellow_circle_small.webp",
    "assets/backgrounds/yellow_swirls.webp",

    "assets/backgrounds/purple_sectsandviolets_logo.webp",
    "assets/backgrounds/purple_circle_large.webp",
    "assets/backgrounds/purple_circle_small.webp",
    "assets/backgrounds/purple_swirls.webp",

    "assets/backgrounds/blue_circle_elaborate.png",
    "assets/backgrounds/blue_circle_large.webp",
    "assets/backgrounds/blue_circle_small.webp",
    "assets/backgrounds/blue_swirls.webp",

    "assets/backgrounds/green_circle_elaborate.png",
    "assets/backgrounds/green_circle_large.webp",
    "assets/backgrounds/green_circle_small.webp",
    "assets/backgrounds/green_swirls.webp",

    "assets/backgrounds/purple_circle_elaborate.png",
    "assets/backgrounds/light_green_circle_large.webp",
    "assets/backgrounds/light_green_circle_small.webp",
    "assets/backgrounds/light_green_swirls.webp",

    "assets/backgrounds/orange_circle_elaborate.png",
    "assets/backgrounds/pink_circle_large.webp",
    "assets/backgrounds/pink_circle_small.webp",
    "assets/backgrounds/pink_swirls.webp",

    "assets/backgrounds/lounge.webp",
    "assets/backgrounds/user_center.webp",
]

export default function BackgroundSelector() {
    const {setGameState, appState, setAppState} = useContext(GameContext) as AppContextType & GameContextType;

    if (!appState.isBackgroundSelectorOpen) return <></>;

    function closeSelector() {
        setAppState(state => {
            return {
                ...state,
                isBackgroundSelectorOpen: false,
            }
        })
    }

    function setBackgroundTo(link: string) {
        setGameState(state => {
            return {
                ...state,
                background: link
            }
        });
    }

    const itemJsx = BACKGROUND_ASSETS.map(link => (
        <div 
            key={link}
            className="BackgroundSelector__item" 
            onClick={() => setBackgroundTo(`url(${link})`)}
        >
            <img
                className="BackgroundSelector__image"
                src={link}
                alt=""
            />
        </div>
    ));

    return (
        <div 
            className="BackgroundSelector__container" 
            style={{ backgroundImage: "url(assets/background-img2.webp)"}}
            onClick={closeSelector}
        >
            <div className="BackgroundSelector__aligner">
                <div className="BackgroundSelector__content">
                    {itemJsx}
                </div>
            </div>
        </div>
    )
}