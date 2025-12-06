import { useContext } from "react";
import { GameContext, GameContextType } from "../../data/gameState";
import { RoleData, Shroud } from "../../types/Role"
import { getToken } from "../../util";
import { GameState } from "../../types/GameState";
import { ActiveShroud, AppState } from "../../data/appState";
import { Visibility } from "../../types/Visibility";


type ShroudCardType = {
    shroud: Shroud;
}

function completeShroud(shroud: Shroud, appState: AppState, gameState: GameState, roles: RoleData): ActiveShroud {
    const newShroud = {...shroud};
    const token = getToken(appState.activeTokenUid, gameState)!;

    if (shroud.cardTitle === "Your Ability Text") {
        newShroud.title += roles[token.id].ability
    }

    const shownIcons: (string | undefined)[] = [];
    if (shroud.cardTitle === "Demon Bluffs") {
        gameState.playerTokens
                .filter(token => token.visibility === Visibility.Bluff)
                .map(token => token.id)
                .forEach(id => shownIcons.push(id));
    }

    for (let i = shownIcons.length; i < (shroud.icons ?? 0); i++) {
        let iconId: string | undefined;
        if (shroud.autofill) {
            iconId = token.id;
        }
        shownIcons.push(iconId);
    }

    return {
        ...newShroud,
        shownIcons
    }
}

export default function ShroudCard({ shroud }: ShroudCardType) {
    const { gameState, appState, setAppState, roles } = useContext(GameContext) as GameContextType;

    function showShroud() {
        setAppState(oldState => {
            return {
                ...oldState,
                activeShroud: completeShroud(shroud, appState, gameState, roles),
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