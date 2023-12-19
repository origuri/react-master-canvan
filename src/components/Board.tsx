import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
  margin-left: 10px;
`;
interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {/* 함수 형태로 들어가야 함. */}
      {(dropMagic) => (
        <Wrapper ref={dropMagic.innerRef} {...dropMagic.droppableProps}>
          {toDos.map((todo, index) => (
            // 배열의 위치가 바뀌면 모든 props를 다시 자식에게 보내 리렌더링 함.
            <DraggableCard todo={todo} index={index} key={todo} />
          ))}
          {dropMagic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Board;
