import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardsState } from "./atom";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
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
  gap: 10px;
`;

function App() {
  const [boards, setBoards] = useRecoilState(boardsState);
  // 드래그가 끝나는 시점에 호출 되는 함수
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      /* 
      1. 해당 객체에서 변화가 일어나는 배열만 가져온 후 수정한다. 
      2. 수정 후 변화가 일어나지 않은 배열을 붙여준다.
      */
      console.log("같은 보드이동");
      setBoards((oldBoards) => {
        //newBoard[todo] =  [ { id: 1, text: "hello" }, { id: 2, text: "ori" }]
        const newBoard = [...oldBoards[source.droppableId]];
        // todo[0] = { id: 1, text: "hello" }
        const taskBoardObj = newBoard[source.index];
        // 1. splice 함수와 source.index를 사용해서 잡고 옮긴 index를 삭제한다
        newBoard.splice(source.index, 1);
        // 2.splice 함수와 destination.index, draggableId로 배열을 재구성한다
        newBoard.splice(destination.index, 0, taskBoardObj);
        console.log(newBoard);

        // 수정 시에는 무조건 뒤에 적어줘야 함.
        return { ...oldBoards, [source.droppableId]: newBoard };
      });
    } else {
      /* 
        1. source에서 베열 삭제
        2. destination에서 배열 추가 
        3. 전체 board 복사 
      */
      console.log("다른 보드 이동");
      setBoards((oldBoards) => {
        // source : todo -> destination : doing , index : 2

        //    boards[todo] = [ { id: 1, text: "hello" }, { id: 2, text: "ori" }]
        const sourceBoard = [...oldBoards[source.droppableId]];
        //     todo[0] = { id: 1, text: "hello" }
        const taskBoardObj = sourceBoard[source.index];
        //    boards[doing] = [{id : 3, text : "bye"}, {id : 4, text : "guri"}]
        const destinationBoard = [...oldBoards[destination?.droppableId]];

        //  boards[todo] = [ { id: 2, text: "ori" }]
        sourceBoard.splice(source.index, 1);
        // boards[doing] = [{id : 3, text : "bye"}, {id : 4, text : "guri"}, { id: 1, text: "hello" }]
        destinationBoard.splice(destination.index, 0, taskBoardObj);

        console.log(sourceBoard);
        console.log(destinationBoard);
        //
        return {
          ...oldBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  // app에 컨텍스트 태그를 하면 모든 컴포넌트에 적용되는 거니까 필요한 컴포넌트에 적용하기.
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {/* 
            const toDos = {toDo : ["b","c"], doing : ["y","z"]};
            Object.keys(toDos) => [toDo , doing]

            Object.keys(toDos).map(boardId => (
              
                       toDo, doing                      ["b","c"] , ["y","z"]
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))
          
          */}
          {Object.keys(boards).map((boardId) => (
            //                       [ { id: 1, text: "hello" }, { id: 2, text: "ori" }]
            <Board boardId={boardId} toDos={boards[boardId]} key={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
