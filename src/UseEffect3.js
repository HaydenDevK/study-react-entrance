// 3. deps params 생략
import { useEffect, useState } from "react";

function UseEffect3 ({props, propsRef}) {
    const [count, setCount] = useState(0);

    const onClick = () => {
        setCount(count+1)
    }

    useEffect(() => {
        console.log('UseEffect3 callback : ' + count);
        return () => {
            console.log('UseEffect3 cleanup : ' + count);
        };
    });

    return (
        <div>
            <h4>3. deps params 생략</h4>
            <button onClick={onClick}>
                {count}
            </button>
            <div>
                - 컴포넌트가 리렌더링될 때 마다 : UseEffect3 cleanup 함수 실행 {'=>'} UseEffect3 callback 함수 실행<br/>
                - 그렇다면, 여기서 다시 체크! <b>언제 리렌더링 되는지?</b><br/>
                - 그리고,
            </div>
        </div>
    )
}

export default UseEffect3;