import { SkeletonText } from "@chakra-ui/react";
import { TodoContext } from "context/todos";
import { UserContext } from "context/user";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getSessionStorageToken, getTasks } from "utils/functions";
import { ChildrenType } from "utils/types";

import styles from "./ProtectedRoute.module.scss";

const ProtectedRoute = ({ children }: ChildrenType) => {
  const { user, setUserToken } = useContext(UserContext);
  const { setTasksFromStorage } = useContext(TodoContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const sessionToken = getSessionStorageToken();
    setIsAuthenticated(false);
    if (!user.token && !sessionToken) {
      router.push("/login");
      return;
    }
    if (!user.token && sessionToken) {
      setUserToken(sessionToken);
    }
    if (user.token && sessionToken) {
      setIsAuthenticated(true);
    }
  }, [user.token, router, setUserToken]);

  useEffect(() => {
    const tasks = getTasks();
    if (tasks) {
      setTasksFromStorage(tasks);
    }
  }, [setTasksFromStorage]);

  return !isAuthenticated ? (
    <div className={styles["skeleton-container"]}>
      <SkeletonText noOfLines={8} spacing={6} skeletonHeight="10" speed={1} />
    </div>
  ) : (
    children
  );
};

export default ProtectedRoute;
