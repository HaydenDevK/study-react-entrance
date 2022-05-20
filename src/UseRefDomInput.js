import { useState, useRef } from "react";

function UseRefDomInput() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: ""
  });

  const nameInput = useRef('name default'); // 1. ref 객체 생성
  // console.log(nameInput) // react dev tool 켜면 에러 https://stackoverflow.com/questions/72212374/how-can-solve-this-error-uncaught-typeerror-inputargs0-match-is-not-a-functi/72217464
  // console.dir(nameInput)
  console.log('nameInput: ', nameInput)
  const { name, nickname } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: ""
    });
    console.log(nameInput); // 3. nameInput의 current가 input 요소를 가리키고 있음을 확인
    nameInput.current.focus(); // 4. 원하는 DOM API 호출
  };
  return (
    <div>
      <h4>* 예제2</h4>
      {/* 2. 원하는 DOM 요소에 ref 지정 */}
      <input
        placeholder="이름"
        onChange={onChange}
        name="name"
        value={name}
        ref={nameInput}
      />
      <input
        placeholder="닉네임"
        onChange={onChange}
        name="nickname"
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>(초기화 버튼을 누르면 이름 input으로 focus)</div>
      <div>
        이름: {name} (닉네임 : {nickname})
      </div>
    </div>
  );
}

export default UseRefDomInput;
