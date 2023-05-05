import { ChildrenType, UserContextType, UserType } from "utils/types";
import React, { useState } from "react";
import { setSessionStorageToken } from "utils/functions";

const initialState: UserType = {
  token: null,
  todos: [],
};
const UserContext = React.createContext<UserContextType>({} as UserContextType);

const UserProvider = ({ children }: ChildrenType) => {
  const [user, setUser] = useState<UserType>(initialState);

  const setUserToken = (token: string) => {
    setUser({ ...user, token });
    setSessionStorageToken(token);
  };

  const logoutUser = () => {
    setUser(initialState);
  };
  return (
    <UserContext.Provider value={{ user, setUserToken, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
