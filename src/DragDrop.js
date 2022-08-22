import {useState} from 'react';

const Test = () => {
    const [state, setState] = useState([
        {
            id: 1,
            name: 'a',
        },
        {
            id: 2,
            name: 'b',
        },
        {
            id: 3,
            name: 'c',
        },
    ])

    const handleSort = (data, target) => {
        // const start = Number(data);
        // let newArray = [...state];
        // newArray.splice(start, 1);
        // newArray.splice(target, 0, state[start]);

        console.log('handleSort');

        let newArray = [...state];
        const [start] = newArray.splice(Number(data), 1);
        console.log(start);
        newArray.splice(target, 0, start);
        setState(newArray); 
    };
    // dataTransfer는 인자도 리턴도 string -> number로 형변환해서 비교
    const dragstart_handler = (ev, i) => {
        
        console.log('dragstart_handler');
        // 데이터 전달 객체에 대상 요소의 id를 추가합니다.
        ev.dataTransfer.setData('application/my-app', i); // 드래그앤드롭 하는 동안에 현재 상태를 임시 저장
        ev.dataTransfer.dropEffect = 'move';
    
    }; 
    const dragover_handler = (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
    }
    const drop_handler = (ev, i) => {
        console.log('drop_handler');
        ev.preventDefault();
        // 대상의 id를 가져와 이동한 대상 DOM 요소를 추가합니다.
        // Get the id of the target and add the moved element to the target's DOM
        const data = ev.dataTransfer.getData('application/my-app');
        // data랑 i를 비교해서 배열 정렬하는 함수 실행
        handleSort(data, i);
    }
    return(
        <ul>
            {state.map((item, i) => {
                return (
                    <li 
                        key={item.id} 
                        draggable
                        onDragStart={(ev) => dragstart_handler(ev, i)}
                        onDragOver={dragover_handler}
                        onDrop={(ev) => drop_handler(ev, i)} 
                        onDragEnter={(e) => console.log('onDragEnter')}
                        onDragLeave={(e) => console.log('onDragEnter')}
                    >
                        {item.name}
                    </li>
                )    
            })}
        </ul>
    )
}
export default Test;
