import { useContext } from "react";
import { GameContext, GameContextType } from "../../data/gameState";
import { Shroud } from "../../types/Role"
import { getToken } from "../../util";


type ShroudCardType = {
    shroud: Shroud;
}

export default function ShroudCard({ shroud }: ShroudCardType) {
    const { gameState, appState, setAppState } = useContext(GameContext) as GameContextType;

    function showShroud() {
        const defaultIcons: (string | undefined)[] = [];
        for (let i = 0; i < (shroud.icons ?? 0); i++) {
            let iconId: (string | undefined);
            if (shroud.autofill) {
                // TODO: autofill should generally use the token that created this shroud.
                iconId = getToken(appState.activeTokenUid, gameState)!.id;
            }
            defaultIcons.push(iconId);
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
            style={{ backgroundImage: `url(assets/cards/card-${shroud.cardColor}.png)` }}
        >
            <span className="InfoShrouds__cardTitle">{shroud.cardTitle}</span>
        </div>
    )
}