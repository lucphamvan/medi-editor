import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, ThemeOverride, extendTheme } from "@chakra-ui/react";

const customTheme: ThemeOverride = {
  styles: {
    global: {
      "html, body": {
        color: "#13324b",
        bg: "white",
      },
    },
  },
};

const theme = extendTheme(customTheme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
