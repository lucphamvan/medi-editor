import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ParagraphWithPlaceholderNode } from "./node/paragraph-placeholder-node";
import { MyDecoratorNode } from "./node/decorator-node";
import { EditorThemeClasses } from "lexical";
import { QuoteNode } from "@lexical/rich-text";
import { CodeNode } from "@lexical/code";
import { HeadNode } from "./node/head-node";

interface ProviderProps {
  children: React.ReactNode;
}

const onError = (error: Error) => {
  console.error(error);
};

// this is important to define the theme classes and format the editor
const theme: EditorThemeClasses = {
  code: "editor-code",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  image: "editor-image",
  link: "editor-link",
  list: {
    listitem: "editor-listitem",
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
  },
  ltr: "ltr",
  paragraph: "editor-paragraph",
  placeholder: "editor-placeholder",
  quote: "editor-quote",
  rtl: "rtl",
  text: {
    bold: "editor-text-bold",
    code: "editor-text-code",
    hashtag: "editor-text-hashtag",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    strikethrough: "editor-text-strikethrough",
    underline: "editor-text-underline",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
  },
};

const initialConfig: InitialConfigType = {
  namespace: "MyEditor",
  theme,
  onError,
  nodes: [
    ParagraphWithPlaceholderNode,
    MyDecoratorNode,
    QuoteNode,
    CodeNode,
    HeadNode,
  ],
};

const LexicalProvider = ({ children }: ProviderProps) => {
  return (
    <LexicalComposer initialConfig={initialConfig}>{children}</LexicalComposer>
  );
};

export default LexicalProvider;
