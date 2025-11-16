import { TokenData } from "../../types/TokenData"
import { Visibility } from "../../types/Visibility";

type VisibilityType = {
    token: TokenData;
}

export default function VisibilityIndicator({token}: VisibilityType) {
    if (token.visibility === Visibility.Assigned) return <></>;

    const image = token.visibility === Visibility.Bluff ? "url(assets/visibility_off_yellow.png)" : "url(assets/visibility_off_red.png)"

    return (
        <div className="Token__visibilityIndicator General__backgroundImage" style={{backgroundImage: image}}></div>
    )
}