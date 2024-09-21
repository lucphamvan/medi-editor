import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $createHeadNode } from "../node/head-node";
import {
  $getRoot,
  $getTextContent,
  $insertNodes,
  $isParagraphNode,
  COMMAND_PRIORITY_LOW,
  createCommand,
  LexicalEditor,
} from "lexical";
import { mergeRegister } from "@lexical/utils";

const CREATE_HEAD_NODE_COMMAND = createCommand("CREATE_HEAD_NODE_COMMAND");

const FirstHeadingPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const createHeadNode = (editor: LexicalEditor) => {
    editor.update(() => {
      const headingNode = $createHeadNode("h1");
      $insertNodes([headingNode]);
    });
  };

  useEffect(() => {
    createHeadNode(editor);
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CREATE_HEAD_NODE_COMMAND,
        () => {
          createHeadNode(editor);
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const root = $getRoot();
          const firstNode = root.getChildren()[0];
          const textContent = $getTextContent();
          if (
            root.__size === 1 &&
            textContent === "" &&
            firstNode?.getTextContent() === "" &&
            $isParagraphNode(firstNode)
          ) {
            editor.dispatchCommand(CREATE_HEAD_NODE_COMMAND, null);
          }
        });
      })
    );
  }, [editor]);

  return <></>;
};
export default FirstHeadingPlugin;
