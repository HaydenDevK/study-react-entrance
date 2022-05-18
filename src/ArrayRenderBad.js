function UserList () {
    // 1. 배열이 여기에 있다.
    const users = [
        {
            id: 1,
            username: 'aaa',
            email: 'aaa@aaa'
        },
        {
            id: 2,
            username: 'bbb',
            email: 'bbb@bbb'
        },
        {
            id: 3,
            username: 'ccc',
            email: 'ccc@ccc'
        }
    ];

    // 2. 배열을 가지고 User 라는 컴포넌트를 그리는 함수가 여기에 있다.
    function User({user}) {
        return (
            <div>
                <b>{user.username}</b>
                <span>{user.email}</span>
            </div>
        )
    }
    return (
        <div>
            {/* 3. 그 컴포넌트 함수를 3개 호출해서 사용한다. */}
            <User user={users[0]} />
            <User user={users[1]} />
            <User user={users[2]} />
        </div>
    )
}
export default UserList;