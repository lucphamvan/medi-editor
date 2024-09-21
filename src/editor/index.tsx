import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/tree-view-plugin";
import { Box, Grid, GridItem, Stack } from "@chakra-ui/react";
import "./editor.css";
import ActionMenuPlugin from "./plugins/action-menu-plugin";
import { StateManagementPlugin } from "./plugins/state-management-plugin";
import InlineMenuPlugin from "./plugins/inline-menu-plugin";
import FirstHeadingPlugin from "./plugins/first-heading-plugin";
import HighlightCodePlugin from "./plugins/highlight-code-plugin";

interface EditorProps {
  developMode?: boolean;
}
const Editor = ({ developMode = false }: EditorProps) => {
  const templateColumns = developMode ? "1fr 1fr" : "1fr";
  return (
    <Grid templateColumns={templateColumns} gap={4}>
      <GridItem>
        <Stack
          m="4"
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
          <StateManagementPlugin />
          <InlineMenuPlugin />
          <ActionMenuPlugin />
          <FirstHeadingPlugin />
          <HighlightCodePlugin />
        </Stack>
      </GridItem>
      {developMode && (
        <GridItem>
          <Stack p="4">
            <TreeViewPlugin />
          </Stack>
        </GridItem>
      )}
    </Grid>
  );
};

export default Editor;
