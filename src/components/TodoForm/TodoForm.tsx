import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AiOutlinePlus, AiOutlineEnter } from "react-icons/ai";
import styles from "./TodoForm.module.scss";
import { TodoContext } from "context/todos";

const TodoForm = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className={styles["container"]}>
      <h1>Hi , What do you want to do next?</h1>
      <FormControl>
        <InputGroup>
          <InputLeftElement>
            <AiOutlinePlus />
          </InputLeftElement>
          <Input type="text" placeholder="Add your task here" />
          <InputRightElement
            className={styles["form-right-element"]}
            width="3.5rem"
          >
            Hit <AiOutlineEnter className={styles["form-right-element-icon"]} />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </div>
  );
};

export default TodoForm;
