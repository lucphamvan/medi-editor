import { Button, Stack } from "@chakra-ui/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, createCommand } from "lexical";
import { useEffect } from "react";
import { $setBlocksType } from "@lexical/selection";
import { $createCodeNode, registerCodeHighlighting } from "@lexical/code";

const HIGHLIGHT_CODE_COMMAND = createCommand("highlight-code");

const HighlightCodePlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      HIGHLIGHT_CODE_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createCodeNode("javascript"));
        }
        return true;
      },
      1
    );
  }, [editor]);

  useEffect(() => {
    registerCodeHighlighting(editor);
  }, [editor]);

  const handleHighlightCode = () => {
    editor.dispatchCommand(HIGHLIGHT_CODE_COMMAND, null);
  };

  return (
    <Stack>
      <Button onClick={handleHighlightCode}>Highlight</Button>
    </Stack>
  );
};

export default HighlightCodePlugin;
