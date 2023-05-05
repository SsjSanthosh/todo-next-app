import ThemeToggle from "components/ThemeToggle";
import { ChildrenType } from "utils/types";

import styles from "./AppLayout.module.scss";

const AppLayout = ({ children }: ChildrenType) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["theme-toggle-container"]}>
        <ThemeToggle />
      </div>
      <div className={styles["content-container"]}>{children}</div>
    </div>
  );
};

export default AppLayout;
