function ArrayCrud2 ({username, email, onChange, onCreate}) {
    return (
        <div>
            <input
                name='username'
                placeholder='계정명'
                onChange={onChange}
                value={username}
            />
            <input
                name='nationality'
                placeholder='국적'
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>

    )
}

export default ArrayCrud2;