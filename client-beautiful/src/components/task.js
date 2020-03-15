import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Task = props => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
    {/*moving the {} up will make the entire div as the draggable handle*/}
        {/*<Handle  {...provided.dragHandleProps}/>*/}
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;

const Container = styled.div`
  border: 0.2px solid #000;
  padding: 8px;
  margin-top: 8px;
  background-color: ${props => (props.isDragging ? "lightblue" : "white")};
  display: flex;
`;

const Handle = styled.div `
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 5px;
`;
