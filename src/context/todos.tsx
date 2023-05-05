import React, { useCallback, useState } from "react";
import { saveTasks } from "utils/functions";
import {
  ChildrenType,
  SubTaskType,
  TodoContextType,
  TodoType,
} from "utils/types";

const TodoContext = React.createContext<TodoContextType>({} as TodoContextType);

const TodoProvider = ({ children }: ChildrenType) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const setTasksFromStorage = useCallback((tasks: TodoType[]) => {
    setTodos(tasks);
  }, []);

  const addTask = (task: TodoType) => {
    const temp = [...todos, task];
    setTodos(temp);
    saveTasks(temp);
  };

  const deleteTask = (id: string) => {
    const temp = todos.filter((todo: TodoType) => todo.id !== id);
    setTodos(temp);
    saveTasks(temp);
  };

  const addSubTask = (taskId: string, subTask: SubTaskType) => {
    const temp = [...todos];
    const index = todos.findIndex((todo) => todo.id === taskId);
    if (index > -1) {
      temp[index].subTasks = [...temp[index].subTasks, subTask];
      setTodos(temp);
      saveTasks(temp);
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
      saveTasks(temp);
    }
    return;
  };

  const toggleTaskStatus = (taskId: string) => {
    const temp = [...todos];
    const index = todos.findIndex((todo) => todo.id === taskId);
    if (index > -1) {
      temp[index].done = !temp[index].done;
      setTodos(temp);
      saveTasks(temp);
    }
    return;
  };

  const toggleSubTaskStatus = (taskId: string, subTaskId: string) => {
    const temp = [...todos];
    const taskIndex = todos.findIndex((todo) => todo.id === taskId);
    if (taskIndex > -1) {
      const subTaskIndex = temp[taskIndex].subTasks.findIndex(
        (t) => t.id === subTaskId
      );
      const subTask = temp[taskIndex].subTasks[subTaskIndex];
      temp[taskIndex].subTasks[subTaskIndex].done = !subTask.done;
      console.log(
        temp[taskIndex],
        temp[taskIndex].subTasks[subTaskIndex],
        subTask
      );
      setTodos([...temp]);
      saveTasks(temp);
    }
    return;
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addSubTask,
        addTask,
        deleteTask,
        deleteSubTask,
        toggleSubTaskStatus,
        toggleTaskStatus,
        setTasksFromStorage,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
