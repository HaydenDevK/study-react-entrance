import { useRef, useState, useEffect } from 'react';
import ArrayCrud2 from './ArrayCrud2';
import UserList2 from './UserList2';

function CountNoUseMemo () {
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
        console.log('NoMemo _ countKoreanUsers 함수 실행');
        return users.filter(user => user.nationality === 'korean').length
    }

    useEffect(()=>{
        console.log('NoMemo callback');
        return()=>{
            console.log('NoMemo cleanup')
        }
    })

    const count = countKoreanUsers(users);
    return (
        <> 
            <h3># CRUD _ useMemo X</h3>
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
            <h4>* 기대</h4>
            users의 값이 변경될 때<br/>
            {'=>'} UseMemoCount 컴포넌트 리렌더링이 발생하면서<br/>
            {'=>'} count 값을 연산하기 위해 countKoreanUsers 함수 실행<br/>
            {'=>'} 새로 연산된 값을 그리며 리렌더링 완료
            <h4>* 현실</h4>
            users state 뿐만 아니라, <b>inputs state의 값이 변경될 때에도</b><br/>
            {'=>'} UseMemoCount 컴포넌트 리렌더링이 발생함 (오직 이걸 확인하기 위해 콘솔에 useEffect 출력)<br/>
            {'=>'} count 값을 연산하기 위해 countKoreanUsers 함수 실행<br/>
            {'=>'} 새로 그려야할 값 없이 불필요한 리렌더링 완료
        </>
    )
}

export default CountNoUseMemo;