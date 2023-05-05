export interface ChildrenType {
  children: React.ReactElement;
}

export interface UserType {
  token: null | string;
}

export interface UserContextType {
  user: UserType;
  setUserToken: (token: string) => void;
  logoutUser: () => void;
}

export interface SubTaskType {
  name: string;
  id: string;
  done: boolean;
}

export interface TodoType {
  name: string;
  id: string;
  done: boolean;
  subTasks: SubTaskType[];
}

export interface TodoContextType {
  todos: TodoType[];
  addTask: (todo: TodoType) => void;
  deleteTask: (id: string) => void;
  deleteSubTask: (taskId: string, subTaskId: string) => void;
  addSubTask: (id: string, task: SubTaskType) => void;
  toggleTaskStatus: (id: string) => void;
  toggleSubTaskStatus: (taskId: string, subTaskId: string) => void;
  setTasksFromStorage: (tasks: TodoType[]) => void;
}
