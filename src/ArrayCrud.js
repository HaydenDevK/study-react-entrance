/*
    Q.
    부모인 UseEffectParent.js에서 필요한 데이터와 함수를 모두 받아쓰는 컴포넌트인데
    여기 (자식) 컴포넌트의 input 요소에서 onChange 등 이벤트 함수가 발동되면
    바인딩된 부모의 함수를 ?부모가 실행하는건지 ?자식이 실행하는건지
*/
/*
    여기 (자식) 컴포넌트의 input 요소에서 onChange 등 이벤트 함수가 발동되면
    -> 바인딩된 부모의 함수를 ?가 실행하고
    -> 이 때 자바스크립트 자체적으로 함수에 이벤트 객체가 제공된다.
*/
function ArrayCrud ({username, email, onChange, onCreate}) {
    return (
        <div>
            <input
                name='username'
                placeholder='계정명'
                onChange={onChange}
                value={username}
            />
            <input
                name='email'
                placeholder='이메일'
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>

    )
}

export default ArrayCrud;