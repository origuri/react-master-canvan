import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICardProps {
  $isDragging: boolean;
}

const Card = styled.div<ICardProps>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.$isDragging ? "#dfe6e9" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 10px rgba(0, 0, 0, 0.3)" : "none"};
`;

interface IDraggableCard {
  toDoText: string;
  toDoId: number;
  index: number;
}

function DraggableCard({ toDoText, toDoId, index }: IDraggableCard) {
  console.log(toDoText, " 렌더됨");

  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(dragMagic, dropSnapshot) => (
        <Card
          // 카드가 드래그 중인지 확인
          $isDragging={dropSnapshot.isDragging}
          ref={dragMagic.innerRef}
          {...dragMagic.draggableProps}
          {...dragMagic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
//export default DraggableCard;
