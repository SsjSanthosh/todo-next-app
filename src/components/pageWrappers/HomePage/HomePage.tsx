import React from "react";
import styles from "./HomePage.module.scss";
import Head from "next/head";
import ThemeToggle from "components/ThemeToggle";
const HomePage = () => {
  return (
    <div className={styles["container"]}>
      <Head>
        <title>Todo list - Dashboard</title>
      </Head>
      <div className={styles["content"]}>
        <h1>Todo list</h1>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default HomePage;
