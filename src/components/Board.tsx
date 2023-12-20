import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px 0px 10px;
  border-radius: 5px;
  min-height: 300px;
  // Area의 공간을 늘리기 위한 작업
  display: flex;
  flex-direction: column;
  //
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  // 드래그가 board위에 있니 ? true : 분홍 : false : 드래그가 보드를 떠났니 ? true : 보라 : false : 옥색
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#fd79a8 " // 카드가 옮겨지는 board
      : props.draggingFromThisWith
      ? "#a29bfe" // 카드가 떠나는 board
      : " #81ecec"}; // default
  // 부모가 flex일 때 그 크기만큼 커지는 css
  flex-grow: 1;
  transition: 0.3s ease-in-out;
  padding: 20px;
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
        {(dropMagic, dropSnopshot) => (
          <Area
            isDraggingOver={dropSnopshot.isDraggingOver}
            // Boolean은 안에 값이 undefined | null이면 false고 값이 있으면 true
            draggingFromThisWith={Boolean(dropSnopshot.draggingFromThisWith)}
            ref={dropMagic.innerRef}
            {...dropMagic.droppableProps}
          >
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
