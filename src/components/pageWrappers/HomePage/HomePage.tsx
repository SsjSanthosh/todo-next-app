import React from "react";
import styles from "./HomePage.module.scss";
import Head from "next/head";
import AppLayout from "components/AppLayout";
import ProtectedRoute from "components/ProtectedRoute";
const HomePage = () => {
  return (
    <AppLayout>
      <ProtectedRoute>
        <>
          <Head>
            <title>Todo list - Dashboard</title>
          </Head>
          <div className={styles["container"]}></div>
        </>
      </ProtectedRoute>
    </AppLayout>
  );
};

export default HomePage;
