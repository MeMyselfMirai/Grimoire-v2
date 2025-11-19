import { useState, useRef, useEffect } from "react";
import { ROLES, TEAM_DATA } from "../data/roleData";


type JinxItemType = {
    firstRoleId: string,
    secondRoleId: string,
    reason: string
}

export default function JinxItem({firstRoleId, secondRoleId, reason}: JinxItemType) {
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

    const firstRole = ROLES[firstRoleId];
    const secondRole = ROLES[secondRoleId];

    return (
        <div
            ref={ref}
            className={"NightOrderItem__container" + (open ? " NightOrderItem__open" : "")}
            style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0) , ${TEAM_DATA.fabled.color})`}}
            onClick={() => setOpen(!open)}
        >
            <span className="NightOrderItem__text"> {reason} </span>
            <div className="NightOrderItem__image">
                <img className="JinxItem__firstImage" src={firstRole.image} alt={firstRole.name} />
                <img className="JinxItem__secondImage" src={secondRole.image} alt={secondRole.name} />
            </div>
        </div>
    )
}