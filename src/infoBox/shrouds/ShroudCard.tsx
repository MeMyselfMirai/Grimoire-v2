import { useContext } from "react";
import { AppContextType } from "../../data/appState";
import { GameContext } from "../../data/gameState";
import { Shroud } from "../../types/Role"


type ShroudCardType = {
    shroud: Shroud;
}

export default function ShroudCard({shroud}: ShroudCardType) {
    const {setAppState} = useContext(GameContext) as AppContextType;

    function showShroud() {
        const defaultIcons: undefined[] = [];
        for (let i = 0; i < (shroud.icons ?? 0); i++) {
            defaultIcons.push(undefined);
        }
        setAppState(oldState => {
            return {
                ...oldState,
                activeShroud: {
                    ...shroud,
                    shownIcons: defaultIcons
                }
            }
        });
    }

    return (
        <div 
            className="InfoShrouds__card" 
            onClick={showShroud}
            style={{backgroundImage: `url(assets/cards/card-${shroud.cardColor}.png)`}}
        >
            <span className="InfoShrouds__cardTitle">{shroud.cardTitle}</span>
        </div>
    )
}