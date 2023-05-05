import { SubTaskType, TodoType } from "utils/types";
import styles from "./TodoItem.module.scss";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { Button, Checkbox } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import TodoForm from "components/TodoForm";
import { TodoContext } from "context/todos";

const TodoItem = ({ todo }: { todo: TodoType }) => {
  const [isSubTaskVisible, setIsSubTaskVisible] = useState(false);
  const { toggleTaskStatus, toggleSubTaskStatus } = useContext(TodoContext);
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
            <p className={styles["task-name"]}>{todo.name}</p>
          </Checkbox>
          <Button size="sm" onClick={toggleSubTaskForm}>
            {isSubTaskVisible ? <AiOutlineClose /> : <AiOutlinePlus />}
          </Button>
        </div>
        {!!todo.subTasks.length &&
          todo.subTasks.map((sub) => {
            return (
              <div className={styles["subtask-container"]} key={sub.id}>
                <Checkbox
                  defaultChecked={sub.done}
                  checked={sub.done}
                  key={sub.id}
                  size="md"
                  onChange={() => toggleSubTaskStatus(todo.id, sub.id)}
                >
                  <p className={styles["subtask-name"]}>{sub.name}</p>
                </Checkbox>
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
