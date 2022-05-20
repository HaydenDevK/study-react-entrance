function User({user, onRemove}) {
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

function UserList2 ({users, onRemove}) {
    return (
        <div>
            {users.map(user => (
                <User user={user} key={user.id} onRemove={onRemove} />
            ))}
        </div>
    )
}
export default UserList2;