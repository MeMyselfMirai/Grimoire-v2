import { useState, useRef, useEffect } from "react";
import { TEAM_DATA } from "../data/roleData";
import { getImage, Role } from "../types/Role";


type JinxItemType = {
    firstRole: Role,
    secondRole: Role,
    reason: string
}

/**
 * Create a Jinx with the following properties.
 * @param firstRole The first role -- the character that causes the Jinx.
 * @param secondRole The second role -- that character affected by the first character
 * @param reason What to do when the roles are Jinxed. 
 * @returns 
 */
export default function JinxItem({firstRole, secondRole, reason}: JinxItemType) {
    const [open, setOpen] = useState(false);
    const ref = useRef<any>(null);

    useEffect(() => {
        if (ref.current === undefined) return;
        if (open) {
            ref.current.style.height = ref.current.scrollHeight + "px";
        } else {
            ref.current.style.height = "";
        }
    })

    return (
        <div
            ref={ref}
            className={"NightOrderItem__container" + (open ? " NightOrderItem__open" : "")}
            style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0) , ${TEAM_DATA.fabled.color})`}}
            onClick={() => setOpen(!open)}
        >
            <span className="NightOrderItem__text"> {reason} </span>
            <div className="NightOrderItem__image">
                <img className="JinxItem__firstImage" src={getImage(firstRole)} alt={firstRole.name} />
                <img className="JinxItem__secondImage" src={getImage(secondRole)} alt={secondRole.name} />
            </div>
        </div>
    )
}