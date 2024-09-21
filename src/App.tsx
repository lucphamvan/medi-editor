import { Container } from "@chakra-ui/react";
import "./App.css";
import Editor from "./editor";
import LexicalProvider from "./editor/provider";

function App() {
  return (
    <Container maxW="container.xl">
      <LexicalProvider>
        <Editor />
      </LexicalProvider>
    </Container>
  );
}

export default App;
