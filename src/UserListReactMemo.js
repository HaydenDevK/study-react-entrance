import React from "react";

const User = ({user, onRemove}) => {
    return (
        <div>
            <span>{user.id} / </span>
            <b>
                {user.username}
            </b>
            <span> / {user.nationality}</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    )
}

function UserListReactMemo ({users, onRemove}) {
    return (
        <div>
            {users.map(user => (
                <User user={user} key={user.id} onRemove={onRemove} />
            ))}
        </div>
    )
}
export default React.memo(UserListReactMemo);