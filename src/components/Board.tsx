import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 20px;
  border-radius: 5px;
  min-height: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  font-size: 18px;
`;

const Area = styled.div`
  background-color: #fd79a8;
`;
interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {/* 함수 형태로 들어가야 함. */}
        {(dropMagic) => (
          <Area ref={dropMagic.innerRef} {...dropMagic.droppableProps}>
            {toDos.map((todo, index) => (
              // 배열의 위치가 바뀌면 모든 props를 다시 자식에게 보내 리렌더링 함.
              <DraggableCard todo={todo} index={index} key={todo} />
            ))}
            {dropMagic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
