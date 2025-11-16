import { TokenData } from "../types/TokenData"
import { Viability } from "../types/Viability"
import { Visibility } from "../types/Visibility"
import Token from "./Token"

type SampleTokenType = {
    id: string,
    name?: string,
    className?: string,
    onClick?: () => void,
}

export default function SampleToken({id, name, className, onClick}: SampleTokenType) {
    const dummyTokenInfo: TokenData = {
        id: id,
        uid: 0,
        name: name ?? "",
        visibility: Visibility.Assigned,
        viability: Viability.Alive,
        position: {left: 0, top: 0},
    };

    return (<Token token={dummyTokenInfo} className={className} onClick={onClick}></Token>)
}