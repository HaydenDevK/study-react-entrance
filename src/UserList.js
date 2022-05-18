function UserList ({users, onRemove, onToggle}) { // 1. users 배열을 props로 받는다. 객체 비구조화 할당!

    // 2. 배열을 가지고 User 라는 컴포넌트를 그리는 함수가 여기에 있다.
    function User({user, onRemove, onToggle}) {
        return (
            <div>
                <span>{user.id} / </span>
                <b
                    style={{
                        cursor: 'pointer',
                        color: user.active === true ? 'lightgreen' : '#333333'
                    }}
                >
                    {user.username}
                </b>
                <span> / {user.email}</span>
                <button onClick={() => onRemove(user.id)}>삭제</button>
                <button onClick={() => onToggle(user.id)}>토글</button>
            </div>
        )
    }
    return (
        <div>
            {/* 3. users 배열을 반복하며, 배열 갯수만큼 User 컴포넌트 함수를 호출해서 사용한다. */}
            {users.map(user => (
                <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>
            ))}
        </div>
    )
}
export default UserList;