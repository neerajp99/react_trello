import React, { useState, useEffect } from "react";
import initialData from "./initial-data";
import Column from "./components/column";
import "./App.css";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [state, setState] = useState(initialData);
  useEffect(() => {
    console.log(state);
  }, []);

  const onDragEnd = result => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // For moving within one column : use only source else destination
    // const column = state.columns[source.droppableId];
    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    // if startColumn and finishColum are the same
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.tasksId);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...startColumn,
        tasksId: newTaskIds
      };
      // const newState = {
      //   ...state,
      //   columns: {
      //     [newColumn.id]: newColumn
      //   }
      // };
      setState(state => ({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      }));
      return;
    }

    // MOving items from one column to the other column
    const startTaskIds = Array.from(startColumn.tasksId);
    startTaskIds.splice(source.index, 1);
    // startTaskIds.splice(destination.index, 0, draggableId);
    const newStart = {
      ...startColumn,
      tasksId: startTaskIds
    };

    const finishTaskIds = Array.from(finishColumn.tasksId);
    // finishTaskIds.splice(destination.index, 1)
    // remove from the index and add the draggable ID at that place
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColumn,
      tasksId: finishTaskIds
    };

    // New state object
    setState(state => ({
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }));
  };

  // Ondrag Update function
  const onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  // onDragStart method
  const onDragStart = () => {
    document.body.style.color = "red";
    document.body.style.transition = "background-color 0.3s ease";
  };

  return (
    <div className="App">
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <Container>
          {state.columnOrder.map(columnId => {
            console.log(state);
            const column = state.columns[columnId];
            const tasks = column.tasksId.map(taskId => state.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    </div>
  );
}

export default App;

const Container = styled.div`
  display: flex;
`;
