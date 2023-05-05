import "styles/normalize.scss";
import "styles/global.scss";

import { ChakraProvider } from "@chakra-ui/react";
import { TodoProvider } from "context/todos";
import { UserProvider } from "context/user";
import type { AppProps } from "next/app";

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
