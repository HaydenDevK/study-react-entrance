import React from "react"; // Q. 다른 하위 컴포넌트들은 import 안해줘도 되던데, 얘는 왜 해줘야하지? ESLint구나. 무시해도 되나?
 
const InputUseCallback = ({username, email, onChangeUsername, onChangeNationality, onCreate}) => {
    return (
        <div>
            <input
                name='username'
                placeholder='계정명'
                onChange={(e) => onChangeUsername(e)}
                value={username}
            />
            <input
                name='nationality'
                placeholder='국적'
                onChange={(e) => onChangeNationality(e)}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    )
}

export default React.memo(InputUseCallback);