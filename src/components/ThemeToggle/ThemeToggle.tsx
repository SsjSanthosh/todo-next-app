import { FormControl, FormLabel, Switch, useColorMode } from "@chakra-ui/react";
import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import styles from "./ThemeToggle.module.scss";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const iconClassName = styles["icon"];
  return (
    <div>
      <FormControl className={styles["container"]}>
        <label htmlFor="theme-toggle">
          {!isDarkMode ? (
            <BsFillSunFill className={iconClassName} />
          ) : (
            <MdDarkMode className={iconClassName} />
          )}
        </label>
        <Switch
          name="theme-toggle"
          onChange={toggleColorMode}
          defaultChecked={!isDarkMode}
          size="md"
        ></Switch>
      </FormControl>
    </div>
  );
};

export default ThemeToggle;
