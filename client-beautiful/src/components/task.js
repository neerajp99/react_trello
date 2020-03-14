import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Task = props => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;

const Container = styled.div`
  border: 1px solid #000;
  padding: 8px;
  margin-top: 8px;
  background-color: #fff;
`;
