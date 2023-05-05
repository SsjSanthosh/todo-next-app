import { Button, Checkbox } from "@chakra-ui/react";
import TodoForm from "components/TodoForm";
import { TodoContext } from "context/todos";
import { useContext, useState } from "react";
import { AiOutlineClose,AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { TodoType } from "utils/types";

import styles from "./TodoItem.module.scss";

const TodoItem = ({ todo }: { todo: TodoType }) => {
  const [isSubTaskVisible, setIsSubTaskVisible] = useState(false);
  const { toggleTaskStatus, toggleSubTaskStatus, deleteTask, deleteSubTask } =
    useContext(TodoContext);
  const toggleSubTaskForm = () => setIsSubTaskVisible(!isSubTaskVisible);
  return (
    <div className={styles["container"]}>
      <div className={styles["task-container"]}>
        <div className={styles["main-task-container"]}>
          <Checkbox
            defaultChecked={todo.done}
            key={todo.id}
            size="lg"
            onChange={() => toggleTaskStatus(todo.id)}
          >
            <p
              className={`${styles["subtask-name"]} ${
                todo.done && styles["done-text"]
              }`}
            >
              {todo.name}
            </p>
          </Checkbox>
          <div className={styles["task-actions"]}>
            <Button size="sm" onClick={toggleSubTaskForm}>
              {isSubTaskVisible ? <AiOutlineClose /> : <AiOutlinePlus />}
            </Button>
            <Button size="sm" onClick={() => deleteTask(todo.id)}>
              <MdDeleteOutline />
            </Button>
          </div>
        </div>

        {/* Sub tasks list */}
        {!!todo.subTasks.length &&
          todo.subTasks.map((sub) => {
            return (
              <div key={sub.id} className={styles["subtask-container"]}>
                <Checkbox
                  defaultChecked={sub.done}
                  checked={sub.done}
                  key={sub.id}
                  size="md"
                  onChange={() => toggleSubTaskStatus(todo.id, sub.id)}
                >
                  <span className={styles["subtask"]}>
                    <span
                      className={`${styles["subtask-name"]} ${
                        sub.done && styles["done-text"]
                      }`}
                    >
                      {sub.name}
                    </span>
                  </span>
                </Checkbox>
                <span
                  className={styles["subtask-delete-container"]}
                  onClick={() => deleteSubTask(todo.id, sub.id)}
                  role="button"
                >
                  <MdDeleteOutline size={16} />
                </span>
              </div>
            );
          })}
      </div>
      {isSubTaskVisible && (
        <div className={styles["task-form-container"]}>
          <TodoForm
            type="subtask"
            taskId={todo.id}
            callback={toggleSubTaskForm}
          />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
