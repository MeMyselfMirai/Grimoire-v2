import { useContext } from "react";
import { GameContext, GameContextType } from "../data/gameState";
import { Jinx } from "../types/Role";
import { ROLES } from "../data/roleData";
import JinxItem from "./JinxItem";
import { Visibility } from "../types/Visibility";

type FullJinx = Jinx & {id2: string}

export default function JinxList() {
    const { gameState } = useContext(GameContext) as GameContextType;

    const availableRoles = gameState.playerTokens
        .filter(token => token.visibility !== Visibility.Bluff)
        .map(token => token.id)
    

    const jinxes: FullJinx[]= [];
    for (const roleId of availableRoles) {
        const role = ROLES[roleId];
        if (role.jinx === undefined) continue;
        for (const jinx of role.jinx!) {
            if (availableRoles.indexOf(jinx.id) === -1) continue;
            jinxes.push({...jinx, id2: roleId});
        }
    }
    // Id and Id2 are backwards. Id2 is the character the Jinx is "on". 
    jinxes.sort((a,b) => {
        if (a.id2 > b.id2) return 1;
        if (a.id2 < b.id2) return -1;
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
    });

    const order = jinxes.map(jinx => (
        <JinxItem 
            key={jinx.id2 + " " + jinx.id}
            firstRoleId={jinx.id2} 
            secondRoleId={jinx.id} 
            reason={jinx.reason}
        />
    ))

    return (
        <div className="NightOrder__content">
            {order}
        </div>
    )
}