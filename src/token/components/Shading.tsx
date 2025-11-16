import { TokenData } from "../../types/TokenData"
import { Visibility } from "../../types/Visibility"

type ShadingType = {
    token: TokenData
    focused: boolean
    className?: string
}

export default function Shading({token, focused, className}: ShadingType) {
    if (!focused) return <></>;

    const outerClasses = className === undefined ? "Token__focus" : className + " Token__focus";

    let color = "white";
    if (token.visibility === Visibility.Hidden) color = "red";
    if (token.visibility === Visibility.Bluff) color = "yellow";

    return (<div className={outerClasses} style={{boxShadow: "0px 0px 5px 5px " + color}}></div>);
}