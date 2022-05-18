/* useMemo
    - 연산된 값을 재사용
    - 리액트는 useRef 값을 제외한 모든 값이 변경될 때 마다 리렌더링이 실행되는 특성이 있기 때문에, 이를 최적화하기 위해 내 값이 변경되지 않았다면, 리렌더링 없이 메모된 값을 반환하는 훅
    - 공식 문서에서 남용, 맹신을 지양하라고 한다
 */
import {useMemo, useEffect, useState} from 'react';

function UseMemoComputed () {
    /* 
    vue의 watch처럼
    
    data() {
        return {
            text: ''
        }
    },
    watch: {
        text(newValue, oldValue) {
            console.log(newValue)
        }
    },
    */
    const [text, setText] = useState('');
    const onChange = (e) => {
        setText(e.target.value)
    }
    // useMemo로
    useMemo(() => console.log('useMemo : '+text), [text]);
    // useEffect로
    useEffect(() => {
        console.log('useMemoWatch callback _ text : '+text)
        return (
            console.log('useMemoWatch callback _ text : '+text)
        )
    }, [text])

    return (
        <div>
            <input value={text} onChange={onChange} />
            <div>콘솔을 보시오</div>
        </div>
    )
}
export default UseMemoComputed;
