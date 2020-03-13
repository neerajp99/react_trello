import React, { Component, useState, useCallback } from "react";
import "./App.css";
import styled from "styled-components";
import Draggable from "./components/draggable";
import { range, inRange } from "lodash";

// Use a max size for array
const MAX = 5;
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
        dragOrder: dragOrder
      }));
    },
    [arrayState.order, items.length]
  );

  const onHandleDragEnd = useCallback(() => {
    arraySetState(arrayState => ({
      ...arrayState,
      order: arrayState.dragOrder,
      draggedIndex: null
    }));
  }, []);

  return (
    <Container>
      {items.map(index => {
        // Remove the css transition calculate the op position differently from the dragged one
        const isDragging = arrayState.draggedIndex === index;
        // Calculate the top position of dragged element
        const draggedTop = arrayState.order.indexOf(index) * (HEIGHT + 10);
        const top = arrayState.dragOrder.indexOf(index) * (HEIGHT + 10);
        return (
          <Draggable
            key={index}
            onDragId={index}
            onDrag={onHandleDrag}
            onDragEnd={onHandleDragEnd}
          >
            <Rect isDragging={isDragging} top={isDragging ? draggedTop : top}>
              {index}
            </Rect>
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

const Rect = styled.div.attrs(props => ({
  style: {
    top: `${props.top}px`,
    transition: props.isDragging ? "none" : "all 500ms"
  }
}))`
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
`;
