import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, boardsState } from "../atom";
import { useSetRecoilState } from "recoil";

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

const BoardForm = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  // 드래그가 board위에 있니 ? true : 분홍 : false : 드래그가 보드를 떠났니 ? true : 보라 : false : 옥색
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#fd79a8 " // 카드가 옮겨지는 board
      : props.$draggingFromThisWith
      ? "#a29bfe" // 카드가 떠나는 board
      : " #81ecec"}; // default
  // 부모가 flex일 때 그 크기만큼 커지는 css
  flex-grow: 1;
  transition: 0.3s ease-in-out;
  padding: 20px;
`;
interface IBoardProps {
  toDos: IToDo[]; // text : string, id : number
  boardId: string;
}

interface IBoardForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IBoardForm>();

  const setBoards = useSetRecoilState(boardsState);

  const onValid = (data: IBoardForm) => {
    console.log(data);
    // IToDo의 형식
    const newToDo = { id: Date.now(), text: data.toDo };
    setBoards((oldBoards) => {
      console.log(boardId);
      /* oldBoards를 복사하고 추가를 할 건데 기존에 todo에 있던 값까지 전부 삭제
      하면 안되니까 기존에 있던 값도 복사를 해놓고 새로운 값을 넣어야 함.  
      기존 board에 toDo : [newToDo(id:number, text:string), ...boards[toDo]]
      */
      return { ...oldBoards, [boardId]: [newToDo, ...oldBoards[boardId]] };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <BoardForm onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          placeholder={`add your ${boardId}`}
          {...register("toDo", {
            required: "필수 사항입니다.",
          })}
        />
      </BoardForm>
      <Droppable droppableId={boardId}>
        {/* 함수 형태로 들어가야 함. */}
        {(dropMagic, dropSnopshot) => (
          <Area
            $isDraggingOver={dropSnopshot.isDraggingOver}
            // Boolean은 안에 값이 undefined | null이면 false고 값이 있으면 true
            $draggingFromThisWith={Boolean(dropSnopshot.draggingFromThisWith)}
            ref={dropMagic.innerRef}
            {...dropMagic.droppableProps}
          >
            {toDos.map((todo, index) => (
              // 배열의 위치가 바뀌면 모든 props를 다시 자식에게 보내 리렌더링 함.
              <DraggableCard
                toDoText={todo.text} // todo가 변경되었으므로 props 변경
                toDoId={todo.id} // todo가 변경되었으므로 props 변경
                index={index}
                key={todo.id}
              />
            ))}
            {dropMagic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
