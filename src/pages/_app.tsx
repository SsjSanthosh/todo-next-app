import "styles/normalize.scss";
import "styles/global.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "context/user";
import { TodoProvider } from "context/todos";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserProvider>
        <TodoProvider>
          <Component {...pageProps} />
        </TodoProvider>
      </UserProvider>
    </ChakraProvider>
  );
}
