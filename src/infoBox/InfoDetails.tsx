import Token from "../drag/Token";
import { TokenData } from "../types/TokenData";
import { InfoTabType } from "./InfoBox";

type InfoDetailsType = InfoTabType & {
    token: TokenData
}

function InfoDetails({focused, token, focusCallback}: InfoDetailsType) {
    return (
        <div className={"InfoDetails__container InfoBox__tab" + (focused ? " InfoBox__focus" : "")}>
            <Token id={token.id} className="InfoDetails__token" onClick={focusCallback}></Token>
        </div>
    )
}

export default InfoDetails;
