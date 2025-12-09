import { useEffect, useRef, useState } from "react";
import { TEAM_DATA } from "../data/roleData"
import { getImage, Role } from "../types/Role";


type NightOrderItemType = {
    role: Role;
    alive: boolean;
    assigned: boolean;
    firstNight: boolean;
}

/**
 * A generic night order item.
 * @param role Role data about this night order item. 
 * @param alive Whether any player given this role is alive. 
 * @param assigned Whether this role is assigned to any player
 * @param firstNight True iff this is the first night.
 * @returns 
 */
export default function NightOrderItem({role, alive, assigned, firstNight }: NightOrderItemType) {
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

    let color = TEAM_DATA[role.team].color;
    if (!alive) color = "#000000";

    const info = firstNight ? role.firstNightReminder ?? "" : role.otherNightReminder ?? "";

    let visibility = <></>
    if (!assigned) {
        visibility = <img className="NightOrderItem__visibility" src="/assets/visibility_off_red.png" alt="Unassigned" />
    }

    return (
        <div 
            ref={ref}
            className={"NightOrderItem__container" + (open ? " NightOrderItem__open" : "")}
            style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0) , ${color})`}}
            onClick={() => setOpen(!open)}
        >
            <span className="NightOrderItem__text"> {info} </span>
            <img className="NightOrderItem__image" src={getImage(role)} alt={role.name}/>
            {visibility}
        </div>
    )
}