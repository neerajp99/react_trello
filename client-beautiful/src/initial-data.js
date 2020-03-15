const initalData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Take out the garbage"
    },
    "task-2": {
      id: "task-2",
      content: "Take out the bitch"
    },
    "task-3": {
      id: "task-3",
      content: "Take out the carpet"
    },
    "task-4": {
      id: "task-4",
      content: "kakak garbage"
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      tasksId: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      tasksId: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      tasksId: []
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default initalData;
