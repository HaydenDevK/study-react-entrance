// 1. deps params에 특정 값
import { useEffect, useState } from "react";
/*
    배열, 객체 등 참초형 데이터 타입일 경우,
    값이 변경되어도 메모리 참조 주소는 계속 동일하기 때문에...
    string으로 테스트
*/

function UseEffect1 ({props, propsRef}) {
    const [count, setCount] = useState(0);

    const onClick = () => {
        setCount(count+1)
    }

    useEffect(()=>{
        console.log('UseEffect1 callback : '+ count);
        return () => {
            console.log('UseEffect1 cleanup : '+ count);
            /*
                - count 값이 변경되면 실행
                    - 이전 값을 본다.
                - 해당 컴포넌트(UseEffectY)가 언마운트 되기 직전에 실행
                    - 현재 값(변경 전 값..?)을 본다?
            */
        };
    }, [count]);

    return (
        <div>
            <h4>1. deps params에 특정 값</h4>
            <button onClick={onClick}>
                {count}
            </button>
            <div>
                - 특정 값(count)이 변경될 때 : UseEffect1 cleanup 함수 실행 (변경 전 값을 본다) {'=>'} UseEffect3 callback 함수 실행(변경된 최신 값을 본다?)
            </div>
        </div>
    )
}

export default UseEffect1;