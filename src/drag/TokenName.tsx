import "./Token.css"

type TokenNameType = {name: string}

function TokenName({name}: TokenNameType) {
    return (
        <svg viewBox="0 0 150 150" className="token_role_name">
            <path d="M 13 75 C 13 150, 138 150, 138 75" id="curve" fill="transparent" />
            <text width="150" x="62.5%" y="130" textAnchor="middle">
                <textPath href="#curve" className="TokenName__textPath">
                    {name}
                </textPath>
            </text>
        </svg>
    )
}

export default TokenName;