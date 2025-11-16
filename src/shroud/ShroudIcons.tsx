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

    function selectCallback(id: string, index: number) {
        setAppState(oldState => {
            const oldIcons = oldState.activeShroud!.shownIcons;
            return {
                ...oldState,
                activeShroud: {
                    ...oldState.activeShroud!,
                    shownIcons: [
                        ...oldIcons.slice(0,index),
                        id,
                        ...oldIcons.slice(index+1)
                    ]
                }
            }
        });
    }

    function changeIcon(index: number) {
        setAppState(oldState => {
            return {
                ...oldState,
                characterSelectCallback: (id) => selectCallback(id, index)
            }
        });
    }

    const icons = appState.activeShroud!.shownIcons;

    const iconJsx = icons.map((id, index) => {
        let token = <></>
        if (id !== undefined) token = <SampleToken id={id} className="Shroud__icon General__backgroundImage" />;
        return (
            <div key={index} className="Shroud__iconContainer" style={{backgroundImage:" url(assets/person_add.png)"}} onClick={() => changeIcon(index)}>
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