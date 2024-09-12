import {
  $getSelection,
  EditorState,
  LexicalEditor,
  $isRangeSelection,
} from "lexical";
import { useEffect, useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// import TreeViewPlugin from "./plugins/TreeviewPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { Box, Icon, Stack } from "@chakra-ui/react";
import { AddCircleIcon } from "hugeicons-react";
import "./editor.css";

const Editor = () => {
  const [isEmptyNode, setIsEmptyNode] = useState(false);
  const [rect, setRect] = useState<DOMRect>();

  const handleScroll = () => {
    setIsEmptyNode(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOnchange = (state: EditorState, editor: LexicalEditor) => {
    state.read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const selectionNode = selection.anchor.getNode();
        const nodekey = selectionNode.getKey();
        const element = editor.getElementByKey(nodekey);
        const rect = element?.getBoundingClientRect();
        // Check if the node is a text node and if it's empty
        if (selectionNode.getTextContent() === "") {
          setIsEmptyNode(true);
          setRect(rect);
          return;
        }
        setIsEmptyNode(false);
        setRect(undefined);
      }
    });
  };

  return (
    <Stack position="relative" fontSize={18} lineHeight="2rem" padding="1rem">
      <RichTextPlugin
        placeholder={
          <Box
            position="absolute"
            opacity={0.5}
            tabIndex={-1}
            pointerEvents="none"
            fontStyle="italic"
          >
            Tell your story...
          </Box>
        }
        contentEditable={<ContentEditable className="content-editor" />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      {/* <TreeViewPlugin /> */}
      <OnChangePlugin onChange={handleOnchange} />
      {isEmptyNode && (
        <Icon
          as={AddCircleIcon}
          position="fixed"
          cursor="pointer"
          fontSize={30}
          color="gray"
          top={rect?.bottom ? rect.bottom - 31 + "px" : "0px"}
          left={rect?.left ? rect.left - 50 + "px" : "0px"}
        />
      )}
    </Stack>
  );
};

export default Editor;
