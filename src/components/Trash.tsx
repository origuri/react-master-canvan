import React from "react";
import { Droppable } from "react-beautiful-dnd";
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
const Area = styled.div`
  // 드래그가 board위에 있니 ? true : 분홍 : false : 드래그가 보드를 떠났니 ? true : 보라 : false : 옥색
  background-color: gray;
  // 부모가 flex일 때 그 크기만큼 커지는 css
  flex-grow: 1;
  transition: 0.3s ease-in-out;
  padding: 20px;
`;

function Trash() {
  return (
    <Wrapper>
      <Droppable droppableId="trash">
        {/* 함수 형태로 들어가야 함. */}
        {(dropMagic, dropSnopshot) => (
          <Area ref={dropMagic.innerRef} {...dropMagic.droppableProps}>
            {dropMagic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Trash);
