import React, { useContext } from "react";
import styles from "./HomePage.module.scss";
import Head from "next/head";
import AppLayout from "components/AppLayout";
import ProtectedRoute from "components/ProtectedRoute";
import TodoForm from "components/TodoForm";
import TodoList from "components/TodoList";
import { Button } from "@chakra-ui/react";
import { UserContext } from "context/user";
const HomePage = () => {
  const { logoutUser } = useContext(UserContext);
  return (
    <AppLayout>
      <ProtectedRoute>
        <>
          <Head>
            <title>Todo list - Dashboard</title>
          </Head>
          <div className={styles["logout-container"]}>
            <Button onClick={logoutUser} colorScheme="blue" variant="outline" size="sm">Log out</Button>
          </div>
          <main className={styles["container"]}>
            <div className={styles["todo-form-container"]}>
              <TodoForm type="task" />
            </div>
            <div className={styles["todo-list-container"]}>
              <TodoList />
            </div>
          </main>
        </>
      </ProtectedRoute>
    </AppLayout>
  );
};

export default HomePage;
