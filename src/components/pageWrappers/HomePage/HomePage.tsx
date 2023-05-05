import React from "react";
import styles from "./HomePage.module.scss";
import Head from "next/head";
import AppLayout from "components/AppLayout";
import ProtectedRoute from "components/ProtectedRoute";
import TodoForm from "components/TodoForm";
import TodoList from "components/TodoList";
const HomePage = () => {
  return (
    <AppLayout>
      <ProtectedRoute>
        <>
          <Head>
            <title>Todo list - Dashboard</title>
          </Head>
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
