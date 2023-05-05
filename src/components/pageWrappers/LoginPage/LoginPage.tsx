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
import axios from "axios";
import AppLayout from "components/AppLayout";
import { UserContext } from "context/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormEvent, useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LOGIN_ENDPOINT } from "utils/constants";
import { validateEmail } from "utils/functions";

import styles from "./LoginPage.module.scss";
import { LoginErrorsType, LoginValueType } from "./LoginPage.types";

const initialErrorState: LoginErrorsType = {
  password: null,
  email: null,
  auth: null,
};

const initialState: LoginValueType = {
  email: "",
  password: "",
};

const showPasswordSize = 24;

const LoginPage = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrorState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { setUserToken, user } = useContext(UserContext);
  const router = useRouter();

  const isFormValid = () => {
    const errors = initialErrorState;
    const { email, password } = values;
    if (!email.length) errors.email = "Email is required to login.";
    if (!password.length) errors.password = "Password cannot be empty.";
    if (!validateEmail(email)) errors.email = "Please enter a valid email";
    if (!errors.email && !errors.password) return true;
    setErrors({ ...errors });
    return false;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;
    const body = { email, password };
    setErrors({ ...initialErrorState });
    try {
      setLoading(true);
      const rdata = await axios.post(LOGIN_ENDPOINT, { ...body });
      const token = rdata.data.token;
      setUserToken(token);
      router.push("/");
    } catch (err) {
      setErrors({
        ...initialErrorState,
        auth: "Invalid email or password, please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateValue = (value: string, key: keyof LoginValueType) => {
    setValues({ ...values, [key]: value });
  };

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const resetErrors = () => {
    setErrors((old) => {
      return { ...initialErrorState };
    });
  };

  useEffect(() => {
    if (user.token) router.push("/");
  }, [user.token, router]);

  return (
    <>
      <Head>
        <title>Login to your account</title>
      </Head>
      <AppLayout>
        <form className={styles["container"]} onSubmit={(e) => handleSubmit(e)}>
          <FormControl className={styles["form-items"]}>
            <h1>Log in to see your To-dos</h1>
            {errors.email}
            {/* Email input */}
            <FormControl
              className={styles["form-item"]}
              isInvalid={!!errors.email?.length}
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                required
                type="email"
                value={values.email}
                onChange={(e) => updateValue(e.target.value, "email")}
                onFocus={resetErrors}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
              {!errors.email && (
                <FormHelperText>
                  Enter your account email address
                </FormHelperText>
              )}
            </FormControl>
            {/* Password Input */}
            <FormControl
              className={styles["form-item"]}
              isInvalid={!!errors.password?.length}
            >
              <FormLabel htmlFor="email">Password</FormLabel>
              <InputGroup>
                <Input
                  required
                  type={isPasswordVisible ? "text" : "password"}
                  value={values.password}
                  minLength={8}
                  onChange={(e) => updateValue(e.target.value, "password")}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    onClick={togglePasswordVisibility}
                    style={{ height: "25px", padding: "12px 4px" }}
                  >
                    {isPasswordVisible ? (
                      <AiFillEye size={showPasswordSize} />
                    ) : (
                      <AiFillEyeInvisible size={showPasswordSize} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
              {!errors.email && (
                <FormHelperText>Passwords are case sensitive</FormHelperText>
              )}
            </FormControl>
            {/* Button submit */}
            <FormControl isInvalid={!!errors.auth}>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                style={{ width: "100%" }}
              >
                Log in
              </Button>
              <FormErrorMessage mt="4">{errors.auth}</FormErrorMessage>
            </FormControl>
          </FormControl>
        </form>
      </AppLayout>
    </>
  );
};

export default LoginPage;
