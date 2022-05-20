import {useState, useCallback} from 'react';

function UseCallbackBasic () {
    let [count1, setCount1] = useState(0);
    let [count2, setCount2] = useState(0);

    // useCallback X _ 리렌더링 시 마다 함수가 재선언된다.
    const console1 = (e)=> {
        console.log("1번 count1 값 : "+count1);
        console.log("1번 count2 값 : "+count2);
        // setName1(e.target.value);
    };

    // useCallback O (빈배열) _ 첫 렌더링시에만 함수가 생성된다.
    const console2 = useCallback(
        (e)=>{
            console.log("2번 count1 값 : "+count1);
            console.log("2번 count2 값 : "+count2);
            // setName2(e.target.value)
        },[]
    );

    // useCallback O (특정 값) _ count값이 변경될 때에만 함수가 재선언된다.
    const console3 = useCallback(
        (e)=>{
            console.log("3번 count1 값 : "+count1);
            console.log("3번 count2 값 : "+count2);
            // setName3(e.target.value)
        },
        [count1]
    );

    const changeCount1 = () => {
        setCount1(count1+1)
    }

    const changeCount2 = () => {
        setCount2(count2+1)
    }
    return (
        <>
            <h4>* 3개 케이스를 비교해보자옹</h4>
            <div>1) useCallback X : 리렌더링 시 마다 함수가 계속 재선언된다.</div>
            <button onClick={console1}>1번 console.log</button>

            <div>2) useCallback O (빈배열) : 함수 최초 선언 시점에, 사용한 데이터도 함께 캐싱해두고 사용한다.</div>
            <button onClick={console2}>2번 console.log</button>

            <div>3) useCallback O (특정 값) : 해당 값이 변화할 때만 함수를 재선언한다.</div>
            <button onClick={console3}>3번 console.log</button>

            <div>
                <div>최초 count1 : <b>0</b></div>
                <div>최신 count1 : <b>{count1}</b></div>
                <button onClick={changeCount1}>count1 증가</button> <span>{'<='} 1번, 3번 업데이트</span><br/>
                <div>최초 count2 : <b>0</b></div>
                <div>최신 count2 : <b>{count2}</b></div>
                <button onClick={changeCount2}>count2 증가</button> <span>{'<='} 1번만 업데이트 (1번 함수만 재선언된다.)</span>
            </div>

            <h4>* useMemo와 useCallback 비교</h4>
            <blockquote>useMemo는 **함수 연산 결과 값을 반환**, 함수의 연산량이 많을때 이전 결과값을 재사용하는 목적이고,</blockquote>
            <blockquote>useCallback은 **함수를 반환**, 함수가 재생성 되는것을 방지하기 위한 목적이다.</blockquote>
            
            <h4>* useCallback 특</h4>
            <blockquote>1. 함수 재선언을 방지한다. (이미 만든 함수를 계속 다시 만들지 않도록)</blockquote>
            <blockquote>2. 함수 선언 시 호출(실행)되는 건 아니다. (즉시실행함수가 아니쟈나옹)</blockquote>
            <blockquote>3. 함수 선언 시점에 사용한 데이터도 함께 캐싱한다. (deps 데이터를 지정하면 {'=>'} deps 데이터 변경 시 함수가 재선언 {'=>'} 이 시점에 사용한 데이터도 업데이트 캐싱)</blockquote>
            
            <h4>* 주의사항</h4>
            <blockquote><b>useMemo 파트에서도 언급했지만, 오남용 X</b></blockquote>
            <blockquote>- 캐싱한다는 건 즉, 메모리 영역을 차지해버린다는 것. (가비지 콜렉팅 대상에서 빠지면서 메모리 해제가 안된다.)</blockquote>
            <blockquote>- 즉, 가용 메모리 손해를 차치하면서 까지 캐싱할 당위성이 있는 (ex. 0.1s 이상 걸리는 복잡한) 함수에만 선택적으로 적용해야한다.)</blockquote>
        </>
    );
}

export default UseCallbackBasic;