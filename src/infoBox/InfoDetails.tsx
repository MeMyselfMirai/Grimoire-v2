import { ROLES } from "../data/roleData";
import Token from "../drag/Token";
import { Role } from "../types/Role";
import { TokenData } from "../types/TokenData";
import { InfoTabType } from "./util";

type InfoDetailsType = InfoTabType & {
    token: TokenData
}

function generateFlavor(role: Role) {
    if (role.flavor === undefined) return (<></>);
    const flavor = `"${(role.flavor ?? "").replaceAll(/\n[\t ]*/g, " / ")}"`;

    let color: string;

    switch (role.team) {
        case "townsfolk":
        case "outsider":
        default:
            color = "rgb(176, 176, 230)";
            break;
        case "minion":
        case "demon":
            color = "rgb(230, 176, 176)";
            break;
        case "fabled":
            color = "rgb(230, 230, 176)"
            break;
        case "traveller":
            color = "rgb(230, 176, 230)"
    }

    return (<div className="InfoDetails__flavor" style={{color: color}}>{flavor}</div>);

}

function InfoDetails({token, focused, focusCallback}: InfoDetailsType) {

    const role = ROLES[token.id];

    return (
        <div className={"InfoDetails__container InfoBox__tab" + (focused ? " InfoBox__focus" : "")}>
            <Token id={token.id} className="InfoDetails__token" onClick={focusCallback}></Token>
            <span className="InfoDetails__tokenName">{token.name ?? ""}</span>
            <div className="InfoDetails__content">
                <div className="InfoDetails__roleName">{role.name}</div>
                <div className="InfoDetails__playerName">{token.name}</div>
                <div className="InfoDetails__ability">{role.ability}</div>
                {generateFlavor(role)}
            </div>
        </div>
    )
}

export default InfoDetails;
