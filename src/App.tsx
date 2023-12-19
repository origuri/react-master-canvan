import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import DraggableCard from "./components/DraggableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // 드래그가 끝나는 시점에 호출 되는 함수
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    setToDos((oldToDos) => {
      // splice는 배열을 직접 조작하는 함수이므로 배열을 복사해서 사용한다.
      const newToDos = [...oldToDos];
      // 1. splice 함수와 source.index를 사용해서 잡고 옮긴 index를 삭제한다
      newToDos.splice(source.index, 1);
      // 2.splice 함수와 destination.index, draggableId로 배열을 재구성한다
      newToDos.splice(Number(destination?.index), 0, draggableId);
      console.log(newToDos);

      return newToDos;
    });
  };
  // app에 컨텍스트 태그를 하면 모든 컴포넌트에 적용되는 거니까 필요한 컴포넌트에 적용하기
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {/* 함수 형태로 들어가야 함. */}
            {(dropMagic) => (
              <Board ref={dropMagic.innerRef} {...dropMagic.droppableProps}>
                {toDos.map((todo, index) => (
                  // 배열의 위치가 바뀌면 모든 props를 다시 자식에게 보내 리렌더링 함.
                  <DraggableCard todo={todo} index={index} key={todo} />
                ))}
                {dropMagic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
