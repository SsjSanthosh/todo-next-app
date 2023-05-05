import AppLayout from "components/AppLayout";
import { FormEvent, useContext, useState } from "react";
import styles from "./LoginPage.module.scss";
import Head from "next/head";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import {
  LoginErrorsType,
  LoginFormType,
  LoginValueType,
} from "./LoginPage.types";
import { validateEmail } from "utils/functions";
import axios from "axios";
import { LOGIN_ENDPOINT } from "utils/constants";
import { UserContext } from "context/user";
import { useRouter } from "next/router";

const initialErrorState: LoginErrorsType = {
  password: null,
  email: null,
  auth: null,
};

const initialState: LoginFormType = {
  loading: false,
  errors: initialErrorState,
  values: {
    email: "",
    password: "",
  },
};

const showPasswordSize = 24;

const LoginPage = () => {
  const [form, setForm] = useState<LoginFormType>(initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setUserToken } = useContext(UserContext);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    const { email, password } = form.values;
    const body = { email, password };

    try {
      setForm({ ...form, loading: true });
      const rdata = await axios.post(LOGIN_ENDPOINT, { ...body });
      const token = rdata.data.token;
      setUserToken(token);
      router.push("/");
    } catch (err) {
      setForm({
        ...form,
        errors: {
          email: null,
          password: null,
          auth: "Invalid email/password combination, please try again",
        },
      });
    } finally {
      setForm({ ...form, loading: false });
    }
  };

  const resetErrors = () => {
    setForm({ ...form, errors: initialErrorState });
  };

  const updateValue = (value: string, key: keyof LoginValueType) => {
    setForm({
      ...form,
      values: { ...form.values, [key]: value },
      errors: initialErrorState,
    });
  };

  const isFormValid = () => {
    const errors = initialErrorState;
    const { email, password } = form.values;
    if (!email.length) errors.email = "Email is required to login.";
    if (!password.length) errors.password = "Password cannot be empty.";
    if (!validateEmail(email)) errors.email = "Please enter a valid email";
    else return true;
    setForm({ ...form, errors });
    return false;
  };

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <>
      <Head>
        <title>Login to your account</title>
      </Head>
      <AppLayout>
        <form className={styles["container"]} onSubmit={(e) => handleSubmit(e)}>
          <FormControl className={styles["form-items"]}>
            <h1>Log in to see your To-dos</h1>
            {/* Email input */}
            <FormControl
              className={styles["form-item"]}
              isInvalid={!!form.errors.email?.length}
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="text"
                value={form.values.email}
                onChange={(e) => updateValue(e.target.value, "email")}
              />
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              {!form.errors.email && (
                <FormHelperText>
                  Enter your account email address
                </FormHelperText>
              )}
            </FormControl>
            {/* Password Input */}
            <FormControl
              className={styles["form-item"]}
              isInvalid={!!form.errors.password?.length}
            >
              <FormLabel htmlFor="email">Password</FormLabel>
              <InputGroup>
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  value={form.values.password}
                  onChange={(e) => updateValue(e.target.value, "password")}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    onClick={togglePasswordVisibility}
                    style={{ height: "25px", padding: "12px 4px" }}
                    isLoading={form.loading}
                  >
                    {isPasswordVisible ? (
                      <AiFillEye size={showPasswordSize} />
                    ) : (
                      <AiFillEyeInvisible size={showPasswordSize} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              {!form.errors.email && (
                <FormHelperText>Passwords are case sensitive</FormHelperText>
              )}
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Log in
            </Button>
          </FormControl>
        </form>
      </AppLayout>
    </>
  );
};

export default LoginPage;
