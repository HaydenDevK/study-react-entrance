import "./App.css";
import Hello from "./Hello";
import Wrapper from "./Wrapper";
import IsRender from "./IsRender";
import UseStateCounter from "./UseStateCounter";
import InputState from "./InputState";
import InputStateMulti from "./InputStateMulti";
import UseRefDom from './UseRefDom';
import UseRefVariable from './UseRefVariable'
import UseRefDomInput from "./UseRefDomInput";
import ArrayRenderBad from "./ArrayRenderBad";
import ArrayRenderGood from "./ArrayRenderGood";
import UseEffectParent from './UseEffectParent'
import {useEffect} from 'react';
import UseMemoComputed from './UseMemoComputed';
import UseMemoWatch from './UseMemoWatch';
import CountNoUseMemo from "./CountNoUseMemo";
import CountYesUseMemo from "./CountYesUseMemo";
import UseCallback from "./UseCallback";


function App() {

  useEffect(()=>{
    return()=>{
      console.log('App.js cleanup (React.StrictMode가 적용 시에만 찍힙니다)')
    }
  })

  // JSX 조건문 _ 삼항연산자 
  const loginYn = "Y";
  
  const inlineStyle1 = {
    background: "lightpink",
    fontWeight: "light",
    display: "inline-block"
  };
  
  return (
    <div className="App">
      <header className="App-header">React</header>

      <section className="App-section">
        {/* JSX 조건문 _ 삼항연산자 */}
        <h2>[ JSX 조건문 _ 삼항연산자 ]</h2>
        
        <div className="Class-Test">
          {loginYn === "Y" ? (
            <div>Sophie 입니다.</div>
          ) : (
            <div>비회원 입니다.</div>
          )}
        </div>
        <br/>
        <div style={inlineStyle1}>
          inline style1
        </div>
        <br/>
        <div style={{
          background: "lightyellow",
          fontWeight: "light",
          display: "inline-block"
        }}>
          inline style2
        </div>

        {/* component, props */}
        <h2>[ component, props ]</h2>
        <Hello
          user="sophie"
          color="blue"
        />

        {/* component, props.children */}
        <h2>[ component, props.children ]</h2>
        <Wrapper>
          <Hello
            user="sophie"
            color="red"
          />
        </Wrapper>

        {/* 조건부 렌더링 */}
        <h2>[ 조건부 렌더링 ]</h2>
        <IsRender isRender={true} />
        <IsRender isRender /> {/* 값 생략 시, default true로 간주 */}

        {/* UseState */}
        <h2>[ UseState ]</h2>

        {/* input을 useState로 상태 관리 */}
        <h3># counter 예제 </h3>
        <UseStateCounter />

        {/* input을 useState로 상태 관리 */}
        <h3># input을 useState로 상태 관리 </h3>
        <InputState />

        {/* multiple input state 관리 */}
        <h3># multiple input state</h3>
        <InputStateMulti />

        {/* useRef basic */}
        <h2>[ useRef ]</h2>
        <h3># 첫번째 용법 _ DOM 조작</h3>
        <UseRefDom />
        <UseRefDomInput />
        <h3># 두번째 용법 _ 지역 변수</h3>
        <UseRefVariable />

        {/* 배열 렌더링 vue의 v-for ish.. */}
        <h2>[ 배열 렌더링 ]</h2>
        <ArrayRenderBad />
        <ArrayRenderGood />

        {/* useEffect */}
        <UseEffectParent />
        
        {/* useMemo */}
        <h2>[ useMemo ]</h2>
        <UseMemoComputed />
        <UseMemoWatch />
        <CountNoUseMemo />
        <CountYesUseMemo />

        {/* useCallback */}
        <h2>[ useCallback ]</h2>
        <UseCallback />
      </section>
    </div>
  );
}

export default App;
