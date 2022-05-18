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
            {/* bad
            <User user={users[0]} />
            <User user={users[1]} />
            <User user={users[2]} /> 
            */}

            {/* 3. 그 컴포넌트 함수를 3개 호출해서 사용하는데, map으로 축약한다! */}
            {/* good */}
            {users.map(user => (
                <User user={user} key={user.id} />
            ))}
            {/* 해설
                1. users 배열을 반복하면서 그 때 그 때의 user(users[0]...)를 User 컴포넌트에게 user를 props로 넘겨서 활용시킨다!
                2. 각각의 고유한 key도 User 컴포넌트에게 props로 넘겨야 한다!
                3. user 자체에 고유한 프로퍼티가 없다면 : map() 함수 돌릴 때 두번째 파라미터 index를 사용해서, User 컴포넌트에게 props로 넘긴다!
                  {users.map((user, index) => (
                    <User user={user} key={index} />
                  ))}
                4. key를 생략하면?
                   배열이 업데이트될 때 마다, 기존 프로퍼티의 값과 그 하위 인덱스 프로퍼티 값도 모두 수정한다. 이는 비효율적인 렌더링 방식이다.
                   key를 할당하면, 배열에 새로운 프로퍼티를 삽입하거나 기존 프로퍼티를 삭제한다.
                   - 참고 : https://react.vlpt.us/basic/11-render-array.html#:~:text=%EC%A1%B4%EC%9E%AC%EC%9C%A0%EB%AC%B4%EC%97%90%20%EB%94%B0%EB%A5%B8%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-,%EB%B0%A9%EC%8B%9D,-%EC%98%88%EB%A5%BC%20%EB%93%A4%EC%96%B4%EC%84%9C%20%EB%8B%A4%EC%9D%8C%EA%B3%BC
                   - vue도 똑같음 : https://velog.io/@kihyeon8949/TIL.-%EA%B8%B0%EC%97%85%ED%98%91%EC%97%85-2%EC%9D%BC%EC%B0%A8-Vue.js2-4#:~:text=key%EA%B0%92%EC%9C%BC%EB%A1%9C%20%EC%82%AC%EC%9A%A9-,%EB%B6%88%EA%B0%80%EB%8A%A5%ED%95%9C%EA%B0%80,-%3F%0A%3D%3E%20%EC%82%AC%EC%9A%A9%EA%B0%80%EB%8A%A5%ED%95%98%EB%8B%A4!%20%EA%B7%B8%EB%9F%AC%EB%82%98
            */}
        </div>
    )
}
export default UserList;