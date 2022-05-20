import { useRef, useState, useEffect, useMemo } from 'react';
import ArrayCrud2 from './ArrayCrud2';
import UserList2 from './UserList2';

function CountYesUseMemo () {
    const [inputs, setInputs] = useState({
        username: '',
        nationality: ''
    });
    const {username, nationality} = inputs;
    const onChange = e => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'one',
            nationality: 'korean'
        },
        {
            id: 2,
            username: 'two',
            nationality: 'korean'
        },
        {
            id: 3,
            username: 'three',
            nationality: 'korean'
        }
    ])
    const nextID = useRef(4);
    const onCreate = () => {
        const user = {
            id: nextID.current,
            username: username,
            nationality: nationality
        }
        setUsers(users.concat(user));

        setInputs({
            username: '',
            nationality: ''
        });
        nextID.current += 1;
    }
    const onRemove = id => {
        setUsers(users.filter(user=>user.id !== id)); // ((id가 같은 것만 빼고) id가 같지않은 것만 추출 = user.id === id 인 것을 제거
    }

    const countKoreanUsers = (users) => {
        console.log('YesMemo _ countKoreanUsers 함수 실행');
        return users.filter(user => user.nationality === 'korean').length
    }

    const count = useMemo(()=>countKoreanUsers(users), [users]); // users 값이 바뀔 때만, countKoreanUsers(users) 함수를 연산하고, 그 외에는 memoized된 값을 쓴다.

    useEffect(()=>{
        console.log('YesMemo callback');
        return()=>{
            console.log('YesMemo cleanup')
        }
    })
    return (
        <> 
            <h3># CRUD _ useMemo O</h3>
            <h4>* 예제</h4>
            ````
            <ArrayCrud2
                username={username}
                nationality={nationality}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList2 users={users} onRemove={onRemove} />
            <div>한국인 수 : <b>{count}</b></div>
            ```
            <h4>* useMemo를 사용하면</h4>
            - 동일한 점 : <br/>
            <blockquote>inputs state 변경 시 마다 {'=>'} 컴포넌트 리렌더링 된다.</blockquote>
            - 개선된 점 : <br/>
            <blockquote>Count 값을 useMemo로 관리해서</blockquote>
            <blockquote>users 값이 바뀔 때만, countKoreanUsers(users) 함수를 연산하고, 그 외에는 memoized된 값을 쓴다.</blockquote>
            <h4>* 사용 시 주의사항</h4>
            <a href="https://puterism.com/use-memo-and-use-callback/">- 최적화를 포함한 모든 연산에는 비용이 든다. 그러므로, 책임감 있게 최적화 코드를 작성해야 한다. 즉 useMemo나 useCallback을 사용하는 것 또한 비용이 발생한다는 것이다.</a>
            <h4>* 헷갈리지 마세옹</h4>
            UseEffectParent 예제에서는 1개의 users state로 2개의 예제를 만들었고,<br/>
            본 예제에서 CountNoUseMemo, CountYesUseMemo 각각의 users state로 예제를 만들었다.<br/>
            (각각 다른 state 변수니까 당연히 동기화X)
        </>
    )
}

export default CountYesUseMemo;