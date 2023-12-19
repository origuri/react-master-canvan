import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  // 드래그가 끝나는 시점에 호출 되는 함수
  const onDragEnd = () => {};
  // app에 컨텍스트 태그를 하면 모든 컴포넌트에 적용되는 거니까 필요한 컴포넌트에 적용하기
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {/* 함수 형태로 들어가야 함. */}
          {(dropMagic) => (
            <ul ref={dropMagic.innerRef} {...dropMagic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(dragMagic) => (
                  <li
                    ref={dragMagic.innerRef}
                    {...dragMagic.dragHandleProps}
                    {...dragMagic.draggableProps}
                  >
                    first
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(dragMagic) => (
                  <li
                    ref={dragMagic.innerRef}
                    {...dragMagic.dragHandleProps}
                    {...dragMagic.draggableProps}
                  >
                    second
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
