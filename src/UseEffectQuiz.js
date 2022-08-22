import {useState, useRef, useEffect} from 'react';
function UseEffectQuiz() {
    const [count, setCount] = useState(0);
  
    function onClick() {
      console.log(count);
    }
  
    const callbacks = useRef({ onClick });
  
    callbacks.current.onClick = onClick;
  
    useEffect(() => {
      const $test = document.getElementById('test');
  
      $test.addEventListener('click', () => {
        callbacks.current.onClick();
      });
    }, []);
  
    const codeHtml = `
        import {useState, useRef, useEffect} from 'react';
        
        function UseEffectQuiz() {
            const [count, setCount] = useState(0);
        
            function onClick() {
                console.log(count); // onClick의 메모리 주소는 리렌더링 될 때 마다 업데이트
            }
        
            const callbacks = useRef({ onClick }); // useRef callbacks의 onClick은 최초 렌더링 시의 메모리 주소 그대로 유지
        
            callbacks.current.onClick = onClick; // 2에 1을 대입하면?
        
            useEffect(() => {
                const $test = document.getElementById('test');
            
                $test.addEventListener('click', () => {
                    callbacks.current.onClick();
                });
            }, []);
        }
        return (
            <button id='test'>test</button>
            <button onClick={() => setCount(count + 1)}>{count}</button>
        );
    `;
    return (
      <div>
        <button id='test'>count = ?</button>
        <button onClick={() => setCount(count + 1)}>{count}</button>
        <pre>{codeHtml}</pre>
        <details>
            <summary><h4 style={{display: 'inline-block', marginBottom: '0'}}>해설</h4></summary>
            <blockquote>1. useEffect도 함수와 데이터를 캐싱한다. (정확히는, JS가 만든 가짜 메모리 주소를)</blockquote>
            <blockquote>2. function onClick은 렌더링 될 때 마다 메모리 주소가 바뀌고, useRef onClick은 최초 메모리 주소 값을 캡쳐링해서 유지한다.</blockquote>
            <blockquote>3. useRef(캐싱된 메모리 주소)에 최신 값(onClick())을 대입해줌으로서, 첫 메모리 주소에 최신 값을 업데이트 해주는 셈이지! </blockquote>
        </details>
      </div>
    );
  }
export default UseEffectQuiz;