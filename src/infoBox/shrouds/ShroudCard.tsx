import { useContext } from "react";
import { GameContext, GameContextType } from "../../data/gameState";
import { RoleData, Shroud } from "../../types/Role"
import { distanceSquared, getToken } from "../../util";
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
        const bluffs = gameState.playerTokens.filter(token => token.visibility === Visibility.Bluff);
        const nearestBluff = bluffs.sort((a,b) => distanceSquared(a.position, token.position) - distanceSquared(b.position, token.position))[0];
        bluffs
            .sort((a,b) => distanceSquared(a.position, nearestBluff.position) - distanceSquared(b.position, nearestBluff.position))
            .map(token => token.id)
            .slice(0,3)
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