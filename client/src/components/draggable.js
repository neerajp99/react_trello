import React, {
  Component,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";

// Initial position
const POSITION = { x: 0, y: 0 };

// Draggable field fucntion starts here
const Draggable = ({ children }) => {
  const [draggableState, setDraggableState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION
  });

  // HandleMouseDown function using useCallback hook
  const handleMouseDown = useCallback(({ positionX, positionY }) => {
    setDraggableState(draggableState => ({
      ...draggableState,
      isDragging: true,
      origin: {
        x: positionX,
        y: positionY
      }
    }));
  }, []);

  // HandleMouseMove function using useCallback hook
  const handleMouseMove = useCallback(() => {}, []);

  // HandleMouseUp function using useCallback hook
  const handleMouseUp = useCallback(() => {}, []);

  // If there is any change in the render, call useEffect hook
  useEffect(
    () => {
      if (draggableState.isDragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);

        setDraggableState(draggableState => ({
          ...draggableState,
          translation: POSITION
        }));
      }
    },
    [draggableState.isDragging, handleMouseMove, handleMouseUp]
  );

  // Adding inline styles to the component
  const styles = useMemo(
    () => ({
      cursor: draggableState.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${draggableState.translation.x}, ${
        draggableState.translation.y
      })`,
      transition: draggableState.isDragging ? "none" : "transform 500ms",
      zIndex: draggableState.isDragging ? 2 : 1,
      position: draggableState.isDragging ? "absolute" : "relative"
    }),
    [draggableState.isDragging, draggableState.translation]
  );

  return (
    <div style={styles} className="" onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default Draggable;
