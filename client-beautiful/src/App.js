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
    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.tasksId);

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
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
        [newColumn.id]: newColumn
      }
    }));
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map(columnId => {
          const column = state.columns["column-1"];
          const tasks = column.tasksId.map(taskId => state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
