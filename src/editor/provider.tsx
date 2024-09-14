import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ParagraphWithPlaceholderNode } from "./node/PlaceholderParagraphNode";
import { MyDecoratorNode } from "./node/decorator-node";

interface ProviderProps {
  children: React.ReactNode;
}

const onError = (error: Error) => {
  console.error(error);
};

const theme = {};

const initialConfig: InitialConfigType = {
  namespace: "MyEditor",
  theme,
  onError,
  nodes: [ParagraphWithPlaceholderNode, MyDecoratorNode],
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <LexicalComposer initialConfig={initialConfig}>{children}</LexicalComposer>
  );
};

export default Provider;
