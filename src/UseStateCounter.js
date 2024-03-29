/* useState를 사용하는 이유
   1. 데이터가 바뀌면 그 데이터를 사용하는 곳이 리렌더링 되야겠지?
   2. 그러려면, 리액트가 리렌더링해야한다는 걸 알 수 있도록, 데이터의 상태를 관리해야하는거다.
   3. 그 방법이 useState.
 */
import { useState } from "react";

function UseStateCounter() {
  const [number, setNumber] = useState(0);
  // 1. 기본값을 파라미터로 넣어서 useState 호출
  // 2. 반환되는 배열 중 현재 상태인 number와, Setter 함수만 배열 비구조화 할당으로 추출

  const onIncrease = () => {
    console.log("onIncrease");
    setNumber(number + 1); // 3-1. setter 함수 _ 파라미터로 전달 받은 값(number + 1)을 최신 상태로 설정
    console.dir(number);
  };
  const onDncrease = () => {
    console.log("onDncrease");
    setNumber((number) => number - 1) // 3-4. setter 함수 함수형 업데이트 _ 기존 값(preNumber)을 "어떻게 업데이트 할지"
    console.log(number);
    /*
        Q1. 기대한 값은 변경 후 값인데, 변경 전 값이 나온다 이유는?
        A. setState가 비동기로 처리되기 때문에, setInputs가 미처 끝나기 전에 console.log가 실행되어 기존의 inputs가 그대로 찍힌 것이다.
            https://zereight.tistory.com/779 참고
            async await로도 가능할까 했는데 안된다

        Q2. 상태값 변경을 배치로 처리한다?
        A.
    */
  };

  return (
    <div>
      <div>{number}</div>
      <button onClick={onIncrease}> +1 </button>
      <button onClick={onDncrease}> -1 </button>
    </div>
  );
}

export default UseStateCounter;
