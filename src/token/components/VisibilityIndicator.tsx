import { TokenData } from "../../types/TokenData"
import { Visibility } from "../../types/Visibility";

type VisibilityType = {
    token: TokenData;
}

export default function VisibilityIndicator({token}: VisibilityType) {
    if (token.visibility === Visibility.Assigned) return <></>;

    const image = token.visibility === Visibility.Bluff ? "url(assets/icons/bluffIndicator.png)" : "url(assets/icons/hiddenIndicator.png)"

    return (
        <div className="Token__visibilityIndicator General__backgroundImage" style={{backgroundImage: image}}></div>
    )
}