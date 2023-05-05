import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { TodoContext } from "context/todos";
import { UserContext } from "context/user";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AiOutlineEnter, AiOutlinePlus } from "react-icons/ai";
import { AUTH_ENDPOINT } from "utils/constants";
import { generateSubTask, generateTask } from "utils/functions";

import styles from "./TodoForm.module.scss";

const TodoForm = ({
  type,
  taskId,
  callback,
}: {
  type: "task" | "subtask";
  taskId?: string;
  callback?: () => void;
}) => {
  const { addTask, addSubTask } = useContext(TodoContext);
  const { user, logoutUser } = useContext(UserContext);
  const [task, setTask] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const resetTask = () => {
    setTask("");
  };
  const resetError = () => setError(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.length) {
      try {
        setLoading(true);
        await axios.get(AUTH_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (type === "task") {
          const taskToAdd = generateTask(task);
          addTask(taskToAdd);
        } else {
          const subTaskToAdd = generateSubTask(task);
          addSubTask(taskId as string, subTaskToAdd);
          if (callback) callback();
        }
      } catch (err) {
        setError("Unauthorized use, redirecting to login page");
        logoutUser();
        router.push("/login");
      } finally {
        resetTask();
        setLoading(false);
      }
    } else setError("Please enter a valid task.");
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles["container"]}>
      {type === "task" && <h1>Hi , what do you want to do next?</h1>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl isInvalid={!!error}>
          <InputGroup>
            <InputLeftElement>
              <AiOutlinePlus />
            </InputLeftElement>
            <Input
              value={task}
              type="text"
              placeholder="Add your task here"
              onChange={(e) => {
                resetError();
                setTask(e.target.value);
              }}
              ref={inputRef}
            />
            <InputRightElement
              
              width="3.5rem"
            >
              {loading ? (
                <Spinner />
              ) : (
                <span className={styles["form-right-element"]}>
                  Hit{" "}
                  <AiOutlineEnter
                    className={styles["form-right-element-icon"]}
                  />
                </span>
              )}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>Please enter a valid task.</FormErrorMessage>
        </FormControl>
      </form>
    </div>
  );
};

export default TodoForm;
