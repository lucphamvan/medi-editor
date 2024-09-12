import { Container } from "@chakra-ui/react";
import "./App.css";
import Editor from "./editor";
import Provider from "./editor/provider";

function App() {
  return (
    <Container maxW="container.md">
      <Provider>
        <Editor />
      </Provider>
    </Container>
  );
}

export default App;
