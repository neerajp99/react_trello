import React, { Component, useState, useCallback } from "react";
import "./App.css";
import styled from "styled-components";
import Draggable from "./components/draggable";
import { range, inRange } from "lodash";

// Use a max size for array
const MAX = 6;
const HEIGHT = 80;

function App() {
  const items = range(MAX);
  // Initialise state
  const [arrayState, arraySetState] = useState({
    // For sorting array items
    order: items,
    // For sorting dragged array items
    dragOrder: items,
    draggedIndex: null
  });

  // onHandleDrag funtion to handle when we drag a component
  const onHandleDrag = useCallback(
    ({ translation, onDragId }) => {
      const delta = Math.round(translation.y / HEIGHT);
      // get index of the dragged item
      const index = arrayState.order.indexOf(onDragId);
      const dragOrder = arrayState.order.filter(index => index !== onDragId);

      // Check if the next position for our draggable component is valid
      if (!inRange(index + delta, 0, items.length)) {
        return;
      }

      dragOrder.splice(index + delta, 0, onDragId);

      // Set the array state accordingly
      arraySetState(arrayState => ({
        ...arrayState,
        draggedIndex: onDragId,
        dragOrder
      }));
    },
    [arrayState.order, items.length]
  );

  const onHandleDragEnd = useCallback(() => {}, []);

  return (
    <Container>
      {items.map(index => {
        const top = arrayState.order.indexOf(index) * (HEIGHT + 10);
        return (
          <Draggable
            key={index}
            onDrag={onHandleDrag}
            onDragEnd={onHandleDragEnd}
          >
            <Rect top={top}>{index}</Rect>
          </Draggable>
        );
      })}
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Rect = styled.div.attrs(props => {
  style: {
  }
})`
  width: 300px;
  height: ${HEIGHT}px;
  user-select: none;
  background: #fff;
  box-shadow: 0 5px 8px rgb(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: calc(50vw - 150px);
  font-size: 20px;
  color: #777;
  top: ${({ top }) => `${top}px`};
`;
