import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCard {
  todo: string;
  index: number;
}

function DraggableCard({ todo, index }: IDraggableCard) {
  console.log(todo, " 렌더됨");

  return (
    <Draggable draggableId={todo} index={index} key={todo}>
      {(dragMagic) => (
        <Card
          ref={dragMagic.innerRef}
          {...dragMagic.draggableProps}
          {...dragMagic.dragHandleProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
//export default DraggableCard;
