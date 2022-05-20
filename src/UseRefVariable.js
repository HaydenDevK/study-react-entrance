/* useRef로 '컴포넌트 안에서 조회 및 수정이 가능한 변수를 관리하고 싶을 때'의 예제 */
import {useRef} from 'react';

function UseRefVariable () {
    const countRef = useRef(0);
    
    const plusCount = () => {
        countRef.current++;
        console.log(countRef);
    }
    return (
        <div>
            <div>
            <h4>* 사전 지식</h4>
                useRef로 '컴포넌트 안에서 조회 및 수정이 가능한 변수를 관리하고 싶을 때'의 예제를 볼 건데,<br/>
                그런 경우가 언제일지? 감을 잡아보자.<br/>
                <br/>
                자, 먼저 리액트는 특정 조건이 발생할 때 마다 렌더링을 발생시킨다.<br/>
                    <blockquote>- setState 함수로 state가 변경되었을 때</blockquote>
                    <blockquote>- 부모 컴포넌트가 렌더링될 떼</blockquote>
                    <blockquote>- 부모 컴포넌트에서 받는 props가 변경되었을 때</blockquote>
                    <blockquote>(전달된 prop 이 '값'이 '객체' 나 '함수' 처럼 참조형 데이터 타입일 경우, 얕은 비교를 하기 때문에 안에 내용이 같더라도 '메모리 주소가 변경되었다면' 변경되었다고 간주하여 컴포넌트를 리랜더링 하는 경우가 있다?)</blockquote>
                    <blockquote>- shouldComponentUpdate에서 true가 반환될 때</blockquote>
                    <blockquote>- forceUpdate 메서드가 실행될 때</blockquote>
                그리고, 렌더링은 다음의 순서로 진행된다.
                    <blockquote>- render : React.createElement로 생성</blockquote>
                    <blockquote>- reconciliation : 이전 elements와 새로 생성된 elements 비교</blockquote>
                    <blockquote>- commit : (reconciliation에서 변경 사항이 감지되면) DOM update</blockquote>
                그리고 이 과정이 모두 끝나야? 변경된 값이 조회된다. (그 전까지는 변경 전 값이 조회된다.)<br/>
                그리고 리렌더링이 발생할 때 마다, let var const 선언문도 실행되기 때문에 변수나 함수가 모두 초기화된다.<br/>
                    <blockquote>- 즉, 이를테면 함수 컴포넌트 내부에서 let nextId = 4; 이렇게 변수를 선언하고 할당하면,</blockquote>
                    <blockquote>{'=>'} 리렌더링이 발생할 때마다 매번 선언문이 실행되서 매번 값이 초기화된다.</blockquote>
                    <blockquote>{'=>'} 컴포넌트 내에서 기억해야하는 변경사항들도...초기화 될 때 마다 다 날라간다.. </blockquote>
                <br/>
                그에 비해, <b>useRef를 사용하면</b><br/>
                1. useRef는 값이 변경되어도 리렌더링을 발생시키지 않는다.<br/>
                    <blockquote>useRef는 순수 자바스크립트 객체로, heap 공간에 저장되어 어플리케이션이 종료되거나 가비지 컬렉팅될 때 까지, 참조할 때 마다 같은 메모리 주소를 가진다.</blockquote>
                    <blockquote>{'=>'} 계속 같은 주소를 가지기 때문에 === 연산 시 항상 true를 반환한다.</blockquote>
                    <blockquote>{'=>'} 그래서 실제 값이 변경되도, 변경 여부가 감지되지 않아서 리렌더링을 발생시키지 않는다.</blockquote>
                    <blockquote>{'=>'} 이런 특성을 활용해서 : 바뀔 때 마다 리렌더링될 필요가 없고, 오히려 불필요한 리렌더링을 막고 싶을 때 useRef를 활용한다.</blockquote>
                2. useRef는 current 값이 heap에 저장되어, 컴포넌트가 (다른 변경 사항으로) 리렌더링 되어도 그 값을 가지고 있다.<br/>
                    <blockquote>- 즉, 리렌더링이 발생하더라도, 최종 값을 저장하고 있어서 초기화되지 않는다.</blockquote>
                <br/>
                (요약)<br/>
                useRef의 특성<br/>
                    <blockquote>- 리렌더링을 발생시키지 않는다.</blockquote>
                    <blockquote>- 그 때문에 변경 후 즉시 조회 가능하다.</blockquote>
                    <blockquote>- 그리고 (다른 이유로) 리렌더링이 발생하더라도, 초기화되지 않고 마지막 값을 유지한다는 특징도 있다.</blockquote>
                useRef의 용도<br/>
                    <blockquote>- setTimeout, setInterval을 통해 만들어진 id</blockquote>
                    <blockquote>- scroll의 위치</blockquote>
                    <blockquote>- 배열에 새 항목이 추가 될 때 필요한 고유한 key 값 (주로 id 값)</blockquote>
                    <blockquote>- 외부 라이브러리를 사용하여 생성된 인스턴스</blockquote>
            </div>
            <h4>* 예제</h4>
            <b>countRef.current : {countRef.current}</b>
            <button onClick={plusCount}>+</button>
            <div>
                버튼을 눌러도, countRef.current는 계속 0으로 보인다.<br/>
                왜냐면 useRef는 컴포넌트를 리렌더링 시키지 않으니까!<br/>
                햐지만, 콘솔을 보면 값은 계속 변하고 있다.
                즉, 값이 바뀔 때 마다 컴포넌트를 리렌더링 시키지 않는 변수를 활용하고 싶을 때 이렇게 useRef를 활용한다!
            </div>
        </div>
    )
}
export default UseRefVariable;