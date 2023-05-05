import {
  ChildrenType,
  SubTaskType,
  TodoContextType,
  TodoType,
  UserContextType,
  UserType,
} from "utils/types";
import React, { useState } from "react";
import { setSessionStorageToken } from "utils/functions";

const initialState: UserType = {
  token: null,
};
const TodoContext = React.createContext<TodoContextType>({} as TodoContextType);

const TodoProvider = ({ children }: ChildrenType) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTask = (task: TodoType) => {
    setTodos([...todos, task]);
  };

  const deleteTask = (id: string) => {
    setTodos(todos.filter((todo: TodoType) => todo.id !== id));
  };

  const addSubTask = (taskId: string, subTask: SubTaskType) => {
    const temp = [...todos];
    const index = todos.findIndex((todo) => todo.id === taskId);
    if (index > -1) {
      temp[index].subTasks = [...temp[index].subTasks, subTask];
      setTodos(temp);
    }
    return;
  };

  const deleteSubTask = (taskId: string, subTaskId: string) => {
    const temp = [...todos];
    const index = todos.findIndex((todo) => todo.id === taskId);
    if (index > -1) {
      temp[index].subTasks = temp[index].subTasks.filter(
        (t) => t.id !== subTaskId
      );
      setTodos(temp);
    }
    return;
  };

  const toggleTaskStatus = (taskId: string) => {
    const temp = [...todos];
    const index = todos.findIndex((todo) => todo.id === taskId);
    if (index > -1) {
      temp[index].done = !temp[index].done;
      setTodos(temp);
    }
    return;
  };

  const toggleSubTaskStatus = (taskId: string, subTaskId: string) => {
    const temp = [...todos];
    const taskIndex = todos.findIndex((todo) => todo.id === taskId);
    if (taskIndex > -1) {
      const subTaskIndex = temp[taskIndex].subTasks.findIndex((t)=>t.id === subTaskId);
      const subTask = temp[taskIndex].subTasks[subTaskIndex];
      temp[taskIndex].subTasks[subTaskIndex].done = !subTask.done;
      setTodos(temp);
    }
    return;
  };

  return (
    <TodoContext.Provider
      value={{ todos, addSubTask, addTask, deleteTask, deleteSubTask, toggleSubTaskStatus, toggleTaskStatus }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
