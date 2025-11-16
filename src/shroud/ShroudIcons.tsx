import { useContext } from "react";
import { AppContextType } from "../data/appState";
import { GameContext, GameContextType } from "../data/gameState";
import SampleToken from "../token/SampleToken";


export default function ShroudIcons() {
    const {appState, setAppState} = useContext(GameContext) as AppContextType & GameContextType;

    function addIcon() {
        setAppState(oldState => {
            return {
                ...oldState,
                activeShroud: {
                    ...oldState.activeShroud!,
                    shownIcons: [
                        ...oldState.activeShroud!.shownIcons,
                        undefined
                    ]
                }
            }
        });
    }

    const icons = appState.activeShroud!.shownIcons;

    const iconJsx = icons.map(id => {
        let token = <></>
        if (id !== undefined) token = <SampleToken id={id} />;
        return (
            <div className="Shroud__icon" style={{backgroundImage:" url(assets/person_add.png)"}}>
                {token}
            </div>
        )
    })

    return (
        <>
            <div className="Shroud__iconsContainer">
                {iconJsx}
            </div>
            <div 
                className="Shroud__extraIconsButton" 
                style={{backgroundImage: "url(assets/person_add.png)"}}
                onClick={addIcon}
            ></div>
            <br />
        </>
    )
}