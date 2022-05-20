import {useRef} from 'react';

function UseRefDom () {

  // useRef 이해안되서 DOM 조작 연습
  const refSample = useRef();
  const onClickFocus = () => {
    refSample.current.focus();
  }
    return(
        <div>
            <h4>* 예제1</h4>
            <input 
                onClick={onClickFocus}
                placeholder='여기를 클릭하면'
            />
            <input 
                ref={refSample}
                placeholder='여기로 focus 넘어오지'
            />
        </div>
    )
}
export default UseRefDom;