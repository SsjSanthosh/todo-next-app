import React, { useState } from "react";
import {
  removeSessionStorageToken,
  setSessionStorageToken,
} from "utils/functions";
import { ChildrenType, UserContextType, UserType } from "utils/types";

const initialState: UserType = {
  token: null,
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
    removeSessionStorageToken();
  };
  return (
    <UserContext.Provider value={{ user, setUserToken, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
