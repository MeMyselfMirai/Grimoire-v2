import { Role } from "../../types/Role";

type MenuRoleType = {
    role: Role,
    amount: number,
    callback: (id: string) => void
}

export default function MenuRole({role, amount, callback}: MenuRoleType) {

    return (
        <div title={role.ability} className="MenuRole__container" onClick={() => callback(role.id)} role="button">
            <label className="MenuRole__label">{role.name}</label>
            <div className="MenuRole__count">{amount}</div>
            &nbsp;
            <hr style={{marginBlockEnd: "0em"}} />
        </div>
    )
}
