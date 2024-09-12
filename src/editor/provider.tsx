import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { CustomParagraphNode } from "./node/CustomParagraphNode";

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
  nodes: [CustomParagraphNode],
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <LexicalComposer initialConfig={initialConfig}>{children}</LexicalComposer>
  );
};

export default Provider;
