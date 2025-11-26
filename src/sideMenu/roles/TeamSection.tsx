import { JSX, ReactNode, useState } from "react";
import { TEAM_DATA } from "../../data/roleData"
import { Team } from "../../types/Team"


type TeamSectionType = {
    teamId: Team,
    actualCount?: number,
    expectedCount?: number,
    children: ReactNode[]
}

export default function TeamSection({teamId, actualCount, expectedCount, children}: TeamSectionType) {

    const [open, setOpen] = useState(true);
    
    if (children.length === 0) return <></>
    
    const team = TEAM_DATA[teamId];

    return (
        <div>
            <div 
                className="SideMenu__header" 
                style={{ color: team.color, filter: `grayscale(${open ? 0 : 100}%)`, transition: "0.5s" }}
                onClick={() => setOpen(!open)}
            >
                {team.header}
            </div>
            <div className='MenuRoles__ratio'>{actualCount ?? 0}/{expectedCount ?? 0}</div>
            <hr style={{ marginBlockEnd: "0em" }}></hr>
            {open ? children : []}
        </div>
    )
}