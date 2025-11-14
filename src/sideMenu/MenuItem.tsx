import { ROLES } from "../data/roleData"


type MenuItemType = {
    roleId: string
}

function MenuItem({roleId}: MenuItemType) {
    const data = ROLES[roleId];

    return (
        <div title={data.ability} className="MenuItem__container">
            <label className="MenuItem__label">{data.name}</label>
            <div className="MenuItem__count">0</div>
            &nbsp;
            <hr style={{marginBlockEnd: "0em"}} />
        </div>
    )
}

export default MenuItem;