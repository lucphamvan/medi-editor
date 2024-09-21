import { Button, Stack } from "@chakra-ui/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $insertNodes,
  createCommand,
  LexicalEditor,
  SerializedEditorState,
} from "lexical";
import { useEffect, useState } from "react";
import { $createMyDecoratorNode } from "../node/decorator-node";

const ADD_MY_DECORATOR_NODE_COMMAND = createCommand(
  "ADD_MY_DECORATOR_NODE_COMMAND"
);
const LOAD_EDITOR_STATE_COMMAND = createCommand("LOAD_EDITOR_STATE_COMMAND");

export const StateManagementPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [state, setState] = useState<SerializedEditorState>();

  useEffect(() => {
    editor.registerCommand(
      ADD_MY_DECORATOR_NODE_COMMAND,
      () => {
        const myDecoratorNode = $createMyDecoratorNode();
        $insertNodes([myDecoratorNode]);
        return true;
      },
      1
    );
    editor.registerUpdateListener(() => {
      setState(editor.getEditorState().toJSON());
    });
    editor.registerCommand(
      LOAD_EDITOR_STATE_COMMAND,
      () => {
        handleLoad(editor);
        return true;
      },
      1
    );
  }, [editor]);

  const handleInsertCustomDecoratorNode = () => {
    editor.dispatchCommand(ADD_MY_DECORATOR_NODE_COMMAND, null);
  };

  const handleSave = () => {
    localStorage.setItem("kulnode", JSON.stringify(state));
  };

  const handleLoad = (editor: LexicalEditor) => {
    const data = localStorage.getItem("kulnode");
    if (data) {
      const parseEditorState = JSON.parse(data);
      const editorState = editor.parseEditorState(parseEditorState);
      editor.setEditorState(editorState);
    }
  };

  const onLoad = () => {
    editor.dispatchCommand(LOAD_EDITOR_STATE_COMMAND, null);
  };

  return (
    <Stack direction="row">
      <Button colorScheme="gray" onClick={handleInsertCustomDecoratorNode}>
        Insert My Decorator Node
      </Button>
      <Button
        rounded="3px"
        background="#868d95"
        _hover={{ bg: "#6f757c" }}
        color="white"
        onClick={handleSave}
      >
        Save Editor State
      </Button>
      <Button colorScheme="gray" onClick={onLoad}>
        Load Editor State
      </Button>
    </Stack>
  );
};
