import React, {
  Component,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";
import styled from "styled-components";
import Task from "./task";
import { Droppable } from "react-beautiful-dnd";

const Column = props => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <TaskList
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;

const Container = styled.div`
  margin: 8px;
  border: 1px solid #000;
  border-radius: 2px;
  width: 70%;
  margin: 0 auto;
  /* min-height: 30vh; */
  height: auto;
  margin-top: 4vh;
  display: flex;
  flex-direction: column;


`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background: ${props => (props.isDraggingOver ? "lightgreen" : "white")};
  flex-grow: 1;
`;
