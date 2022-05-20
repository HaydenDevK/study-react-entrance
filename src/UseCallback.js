import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import UseCallbackBasic from './UseCallbackBasic';
import ArrayCrud2 from './ArrayCrud2';
import UserList2 from './UserList2';

function UseCallback () {
    const [inputs, setInputs] = useState({
        username: '',
        nationality: ''
    });
    const {username, nationality} = inputs;
    const onChange = useCallback( // useCallback( 이 안에 대상 함수 로직을 랩핑 )
        e => {
            const {name, value} = e.target;
            setInputs({
                ...inputs,
                [name]: value
            });
        },
        [inputs] // deps 파라미터로 조건 배열 _ inputs 값이 변해야 useCallback 내부 함수를 새로 렌더링하고, 그 외에 경우에는 기존에 렌더링해둔 함수를 재사용한다.
    )
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
    const onCreate = useCallback(
        () => {
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
        },
        [users, username, nationality] // Q. 여기 들어가야 하는 값이 뭔지 판단 못하겠다.
    )
    const onRemove = useCallback(
        id => {
            setUsers(users.filter(user=>user.id !== id)); // ((id가 같은 것만 빼고) id가 같지않은 것만 추출 = user.id === id 인 것을 제거
        }, 
        [users]
    )
    const countKoreanUsers = (users) => {
        console.log('UseCallback _ countKoreanUsers 함수 실행');
        return users.filter(user => user.nationality === 'korean').length
    } // Q. 얘는 왜 useCallback을 안썼지?

    const count = useMemo(()=>countKoreanUsers(users), [users]); // users 값이 바뀔 때만, countKoreanUsers(users) 함수를 연산하고, 그 외에는 memoized된 값을 쓴다.

    useEffect(()=>{
        console.log('UseCallback callback');
        return()=>{
            console.log('UseCallback cleanup')
        }
    })
    return (
        <> 
            <h3># 간단 예제</h3>
            <UseCallbackBasic />
            <h3># CRUD with `useMemo`, `useCallback`, `React.memo`</h3>

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
            
        </>
    )
}

export default UseCallback;