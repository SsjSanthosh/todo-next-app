import { useContext } from "react";
import styles from "./TodoList.module.scss";
import { TodoContext } from "context/todos";
import TodoItem from "components/TodoItem";

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  if (!todos.length) {
    return (
      <h4 className={styles["empty-task-container"]}>
        No tasks added, please add a task to see it here.
      </h4>
    );
  }
  return (
    <div className={styles["container"]}>
      {todos.map((todo) => {
        return (
          <div className={styles["task-container"]} key={todo.id}>
            <div className={styles["main-task"]}>
              <TodoItem todo={todo} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
