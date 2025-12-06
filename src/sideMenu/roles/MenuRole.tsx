import { Role } from "../../types/Role";

type MenuRoleType = {
    role: Role,
    amount: number,
    callback: (id: string) => void
}

function MenuRole({role, amount, callback}: MenuRoleType) {

    return (
        <div title={role.ability} className="MenuRole__container" onClick={() => callback(role.id)}>
            <label className="MenuRole__label">{role.name}</label>
            <div className="MenuRole__count">{amount}</div>
            &nbsp;
            <hr style={{marginBlockEnd: "0em"}} />
        </div>
    )
}

export default MenuRole;