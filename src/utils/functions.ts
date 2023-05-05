import { TASKS_STORAGE_NAME, TOKEN_STORAGE_NAME } from "./constants";
import { nanoid } from "nanoid";
import { SubTaskType, TodoType } from "./types";

export const validateEmail = (email: string) => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailFormat) ? true : false;
};

export const setSessionStorageToken = (token: string) => {
  sessionStorage.setItem(TOKEN_STORAGE_NAME, token);
};

export const getSessionStorageToken = () => {
  return sessionStorage.getItem(TOKEN_STORAGE_NAME) || null;
};

export const removeSessionStorageToken = () => {
  sessionStorage.removeItem(TOKEN_STORAGE_NAME);
};

export const generateTask = (name: string): TodoType => {
  return {
    name,
    id: nanoid(),
    subTasks: [],
    done: false,
  };
};

export const generateSubTask = (name: string): SubTaskType => {
  return {
    name,
    id: nanoid(),
    done: false,
  };
};

export const saveTasks = (tasks: TodoType[]): void => {
  sessionStorage.setItem(TASKS_STORAGE_NAME, JSON.stringify(tasks));
};

export const getTasks = () => {
  const tasks = sessionStorage.getItem(TASKS_STORAGE_NAME);
  try {
    if (tasks) return JSON.parse(tasks);
    return null;
  } catch {
    return null;
  }
};
