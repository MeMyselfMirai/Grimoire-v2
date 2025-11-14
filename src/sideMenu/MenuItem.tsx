import { ROLES } from "../data/roleData"


type MenuItemType = {
    roleId: string
}

function MenuItem({roleId}: MenuItemType) {
    const data = ROLES[roleId];

    return (
        <div title={data.ability}>
            <label>{data.name}</label>
            <div>0</div>
            &nbsp;
            <hr />
        </div>
    )
}