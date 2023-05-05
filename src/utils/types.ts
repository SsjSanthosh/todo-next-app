export interface ChildrenType {
  children: React.ReactElement;
}

export interface UserType {
  token: null | string;
  todos: String[];
}

export interface UserContextType {
  user: UserType;
  setUserToken: (token: string) => void;
  logoutUser: () => void;
}
