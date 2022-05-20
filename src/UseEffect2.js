// 2. deps params에 빈 배열
import { useEffect, useState } from "react";

function UseEffect2 ({props}) {
    const [count, setCount] = useState(0);

    const onClick = () => {
        setCount(count+1)
    }

    /* warning
    Q. count 값에 접근이 안된다. 생각하지 않아도 되는 경우같지만 그래도 궁금하다.
    useEffect(()=>{
        console.log('UseEffect2 callback : '+ count);
        return () => {
            console.log('UseEffect2 cleanup : '+ count);
        };
    }, []);

    count 값에 접근이 왜 안되는지 설명은 못하겠다.
    */
    useEffect(() => {
        console.log('UseEffect2 callback');
        return () => {
            console.log('UseEffect2 cleanup');
        };
    }, []);

    return (
        <div>
            <h4>2. deps params에 빈 배열</h4>
            <button onClick={onClick}>
                {count}
            </button>
            <div>
                - 그냥 더도 덜도 말고 무조건 : 첫 마운트 때 callback 함수 1번 {'=>'} 언마운트 때 cleanup 함수 1번만 실행된다.<br/>
                (아무리 위 버튼을 눌러도 실제 값은 바뀌지만 리렌더링 되지 않는다.)
            </div>
        </div>
    )
}

export default UseEffect2;