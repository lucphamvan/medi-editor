import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeviewPlugin";
import { Box, Grid, GridItem, Stack } from "@chakra-ui/react";
import "./editor.css";
import MenuPlugin from "./plugins/MenuPlugin";
import { ManageEditorStatePlugin } from "./plugins/ManageEditorSatePlugin";

const Editor = () => {
  return (
    <Grid templateColumns={"1fr 1fr"} gap={4}>
      <GridItem>
        <Stack
          m="4"
          position="relative"
          fontSize={18}
          lineHeight="2rem"
          padding="1rem"
          border="1px solid #e2e8f0"
          rounded="4"
        >
          <RichTextPlugin
            placeholder={
              <Box
                position="absolute"
                opacity={0.5}
                tabIndex={-1}
                pointerEvents="none"
                fontStyle="italic"
                px={2}
              >
                Tell your story...
              </Box>
            }
            contentEditable={<ContentEditable className="content-editor" />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ManageEditorStatePlugin />

          <MenuPlugin />
        </Stack>
      </GridItem>
      <GridItem>
        <Stack p="4">
          <TreeViewPlugin />
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default Editor;
