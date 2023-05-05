import AppLayout from "components/AppLayout";
import styles from "./ProtectedRoute.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "context/user";
import { useRouter } from "next/router";
import { getSessionStorageToken } from "utils/functions";
import { ChildrenType } from "utils/types";
import { SkeletonText } from "@chakra-ui/react";

const ProtectedRoute = ({ children }: ChildrenType) => {
  const { user, setUserToken } = useContext(UserContext);
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

  return !isAuthenticated ? (
    <div className={styles["skeleton-container"]}>
      <SkeletonText
        noOfLines={8}
        spacing={6}
        skeletonHeight="10"
        speed={1}
      />
    </div>
  ) : (
    children
  );
};

export default ProtectedRoute;
