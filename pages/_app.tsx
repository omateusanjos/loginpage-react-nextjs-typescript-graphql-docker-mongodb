// import App from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps /*, AppContext */ } from "next/app";
import "../styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
