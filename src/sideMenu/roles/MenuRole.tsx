import { ROLES } from "../../data/roleData"


type MenuRoleType = {
    roleId: string,
    amount: number,
    callback: (id: string) => void
}

function MenuRole({roleId, amount, callback}: MenuRoleType) {
    const data = ROLES[roleId];

    return (
        <div title={data.ability} className="MenuRole__container" onClick={() => callback(roleId)}>
            <label className="MenuRole__label">{data.name}</label>
            <div className="MenuRole__count">{amount}</div>
            &nbsp;
            <hr style={{marginBlockEnd: "0em"}} />
        </div>
    )
}

export default MenuRole;