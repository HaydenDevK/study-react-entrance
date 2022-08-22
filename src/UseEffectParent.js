import {useRef, useState, useEffect} from 'react';

import ArrayCrud from "./ArrayCrud";
import UserList from "./UserList";
import UseEffect1 from "./UseEffect1";
import UseEffect2 from './UseEffect2';
import UseEffect3 from './UseEffect3';

function UseEffectParent () {

  useEffect(()=>{
    /* 
        여기에 정의되는 함수가 callback 함수
    */
    return()=>{
      /* 
          여기에 정의되는 함수가 cleanup 함수
          useEffect에 대한 뒷정리 함수라고들 한다.
      */
      console.log('UseEffectParent cleanup')
    }
  })

  const [usersFromParent, setUsers] = useState([
    {
      id: 1,
      username: 'aaa',
      email: 'aaa@aaa',
      active: true
    },
    {
      id: 2,
      username: 'bbb',
      email: 'bbb@bbb',
      active: false
    },
    {
      id: 3,
      username: 'ccc',
      email: 'ccc@ccc',
      active: false
    }
  ]);
  
  const nextId = useRef(4); 
  /* useRef 변수 사용
    파라미터 값 : nextId.current의 초기 값 (현재 users에 프로퍼티가 3개 있으므로 새로 생성될 4번째 프로퍼티의 id가 4에서 시작하도록)
  */ 
  
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  }) 
  /* useState로 inputs 상태 관리 등록
    inputs은 값이 변경할 때 마다 리렌더링을 발생시켜서 새로 화면을 그려내고 싶기 때문에
  */
  
  const {username, email} = inputs;
  /* inputs에서 객체의 username, email 프로퍼티를 객체 구조 분해 할당으로 각각 추출
    `inputs.username` 로 호출해야할 것을 `username`으로
    `inputs.email` 로 호출해야할 것을 `email`로 축약할 수 있도록

    // 추출 X
    const user = {
      id: nextId.current,
      username: inputs.username,
      email: inputs.email
    }

    // 추출 O
    const user = {
      id: nextId.current, // 기본 값은 4
      username,
      email
    }
  */
  
  const onChange = e => {
    const {name, value} = e.target; 
    /* onChange가 발생한 이벤트 객체의 target에서 name 속성과 value 속성을 추출
      즉, 새로운 username이나 새로운 email을 받아온 것
    */
    setInputs({
      ...inputs,
      [name]: value
      /* setState 함수에서 spread 함수로 기존 inputs 복붙하고, inputs.username or inputs.email 변경
        username: 위에서 받아온 새로운 username 이거나
        email: 위에서 받아온 새로운 email 이라고
        state에 알려주고 변경시키는 함수
      */
    });
  }

  const onCreate = () => {
    const userNew = {
      id: nextId.current, // 초기값은 위에서 설정한 4
      username,
      email
    }
    
    setUsers([
      ...usersFromParent, 
      userNew
    ]); 
    /* setState 함수에서 spread 함수로 기존 usersFromParent 복붙하고, usersFromParent 배열에 userNew 추가
      setUsers(usersFromParent.concat(userNew)); // 이렇게 concat으로도 가능
    */
    
    setInputs({
      username: '',
      email: ''
    })
    /*
      추가된 후에는 inputs를 초기화해준다.
      Q. onReset 함수를 따로 만들어서 onReset 함수를 호출해주는 방법으로 해도 될까?
    */
    
    nextId.current += 1; 
    /*
      다음에 추가될 userNew.id의 숫자가 1 증가하도록하는데, 이 변경 사항으로 리렌더링이 발생하지 않도록 useRef를 활용한 것.
      (onCreate 함수 맨 마지막에 nextId가 변경될 때는 화면이 리렌더링될 필요 없으니까 nextId는 useRef로 별도로 관리?)
    */
  }

  const [props, setProps] = useState('UseEffectParent에서 내려주는 props');
  const onPropsChange = e => {
    const {value} = e.target;
    setProps(value);
  }
  /*
  */

  let propsRef = useRef('UseEffectParent에서 내려주는 propsRef'); 
  const onPropsRefChange = e => {
    const {value} = e.target;
    propsRef = value;
    console.log(propsRef);
  }
  /*
  */
    

  const onRemove = (id) => {
    setUsers(
      usersFromParent.filter(user => user.id !== id) 
      /*
        filter로 user.id가 id와 같지 않은 원소만 추출해서 새로운 배열 생성
        즉, user.id가 id와 같은 것만 제거된 배열이 반환됨
      */
    );
  }

  const onToggle = (id) => {
    setUsers(
        usersFromParent.map(user => 
        user.id === id 
        ? { ...user, active: !user.active }
        : user
      )
      /*
        usersFromParent 배열을 순회하며,
        그 때 그 때 순회 중인 요소를 user라고 명명하고
        user.id가 매개변수의 id(=삭제 버튼을 누른 user 객체의 id)와 동일하다면? 기본 user를 복붙한 후에 user.active만 반전시키고,
        동일하지 않다면: 기존 user를 그대로 유지한다.
      */
    )
  }
  
  return (
    <div>
      <h2>[ useEffect ]</h2>
      <h3># 개요</h3>
      <h4>1. 첫번째 파라미터 : callback 함수 (useEffect가 실행될 때 실행되는 로직)</h4>
      <h4>2. 두번째 파라미터 : celanup 함수</h4>
      <div>
      <p>- 배열(deps)</p>
      <p>- useEffect 안에서 사용하는 상태, props가 있다면 여기 넣어주는 게 규칙</p>
      <p>- 케이스</p>
        <blockquote>1. 인자로 특정 값이 있을 때 :</blockquote>
        <blockquote>- 해당 인자 값이 바뀔 시에만 callback 함수 실행 (해당 인자 값이 바뀌지 않으면 callback 함수가 실행되지 않는다.)</blockquote>
        <blockquote>- (cleanup 함수가 있다면) 언마운트 될 때(값이 업데이트 되기 직전에) cleanup 함수 실행</blockquote>
        <blockquote>2. 인자로 빈 배열이 있을 때 :</blockquote>
        <blockquote>- 맨 처음 마운트 시에만 딱 한 번 callback 함수 실행</blockquote>
        <blockquote>- (cleanup 함수가 있다면) 언마운트 될 때 cleanup 함수 실행</blockquote>
        <blockquote>3. 인자가 없을 때 :</blockquote>
        <blockquote>- 리렌더링될 때 마다 callback 함수 실헹</blockquote>
        <blockquote>- 즉, 값이 바뀌어도 리렌더링이 발생하지 않는 ref를 props 넘겨서 테스트 : callback 함수 실행 X</blockquote>
        <blockquote>- (cleanup 함수가 있다면) 언마운트 될 때 cleanup 함수 실행</blockquote>
      </div>       

      {/* useRef로 컴포넌트 내 조회, 수정할 수 있는 변수 관리하기 */}
      <h3># 배열 렌더링 + 변수 관리 (삭제, 토글 테스트는 아래에서)</h3>
      <UserList users={usersFromParent} />

      {/* 배열 CRUD */}
      <h3># 배열 CRUD</h3>
      <ArrayCrud
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users={usersFromParent} 
        onRemove={onRemove}
        onToggle={onToggle}
      />
      
      {/* useEffect */}
      <h3>#  UseEffect _ cleanup</h3>
      <UseEffect1 props={props} propsRef={propsRef.current} />
      <UseEffect2 props={props} propsRef={propsRef.current} />
      <UseEffect3 props={props} propsRef={propsRef.current} />
      <ol>
        <li>
          <h4>state를 props로 내려서 테스트</h4>
          <input 
            onChange={onPropsChange}
            value={props}
            style={{width: '80%'}} 
            />
          <div>
            변경 시 : <br/>
            1. UseEffect3 cleanup<br/>
            2. UseEffect3 callback<br/>
          </div>
        </li>

        <li>
          <h4>ref를 props로 내려서 테스트</h4>
          <input
            onChange={onPropsRefChange}
            value={propsRef.current}
            style={{width: '80%'}} 
          />
          <div>
            변경 시 : <br/>
            props 값이 변경되더라도,<br/>
            ref라서 UseEffectParent 컴포넌트 자신(지금 이 input 포함)이 리렌더링(업데이트) 되지 않고,<br/>
            그래서인지? UseEffect3 자식 컴포넌트의 callback 함수, cleanup 함수 실행 X
          </div>
        </li>
      </ol>

      <h3># 넘어가기 전에</h3>
      <h4>Q. 본 테스트 화면 내에서 계속 cleanup 함수가 꼭 먼저 실행되고 {'=>'} callback 함수가 실행되는데.. 원래 그런건지? 리액트 18이후 버전이라 그런건지?</h4>
      <div>A. 18버전 StrictMode가 적용된 경우, 개발 모드에서만 mount {'=>'} unmount {'=>'} mount 사이클로 실행되기 때문이다.</div>
      <h3># 덤 _ 무한루프 </h3>
      <h4>1. 의존성 배열 없이 콜백 함수에서 데이터 Fetch 하면? </h4>
      <div>매 렌더링 시에 콜백 함수가 실행되고, 무한 루프가 실행될 수 있다.</div>
      <h4>2. 의존성 배열 항상 바뀌는 값(ref 말고 리렌더링을 야기시키는 값)을 지정하면?</h4>
      <div> 역시나 무한 루프가 실행될 수 있다.</div>
      <h4>3. 그렇다고, 빈 배열로 두면 문제가 없을까?</h4>
      <div>이 또한 주의해야한다. `useReducer`, `useCallbak`, `useMemo` 등으로 적용해야할 수  있다.</div>
    </div>
  )
};

export default UseEffectParent;