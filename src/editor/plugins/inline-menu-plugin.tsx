import { Center, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from "lexical";
import { $createQuoteNode, $isQuoteNode } from "@lexical/rich-text";
import { useEffect, useRef, useState } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatQuote,
} from "react-icons/md";
import useOutsideClick from "../hook/useOutSideClick";
import { $setBlocksType } from "@lexical/selection";

const Color = {
  icon: "#dcdfe6",
};
const InlineMenuPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const { isOpen: isShowInlineMenu, onOpen, onClose } = useDisclosure();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useOutsideClick(menuRef, onClose);

  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(() => {
      editor.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const nativeSelection = window.getSelection();
          const domRange = nativeSelection?.getRangeAt(0);
          const rect = domRange?.getBoundingClientRect();
          if (selection.isCollapsed()) {
            onClose();
          } else {
            if (rect) {
              setMenuPosition({
                top: rect.bottom + window.scrollY + 2, // Position above the text
                left: rect.left + window.scrollX + rect.width / 2 - 40,
              });
            }
            onOpen();
          }
        } else {
          onClose();
        }
      });
    });

    return () => removeUpdateListener();
  }, [editor, onOpen, onClose]);

  const formatText = (type: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  const markAsQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor.getNode().getParent();
        if ($isQuoteNode(anchor)) {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      }
    });
  };

  return (
    <>
      {isShowInlineMenu && (
        <Flex
          position="absolute"
          top={`${menuPosition.top}px`}
          left={`${menuPosition.left}px`}
          background="#282C34"
          gap="4"
          p="2"
          px="4"
          shadow="md"
          borderRadius="3px"
          alignItems="center"
          ref={menuRef}
        >
          <Center rounded="sm">
            <Icon
              cursor="pointer"
              as={MdFormatBold}
              fontSize={22}
              color={Color.icon}
              onClick={() => formatText("bold")}
            />
          </Center>
          <Center rounded="sm">
            <Icon
              cursor="pointer"
              as={MdFormatItalic}
              fontSize={22}
              color={Color.icon}
              onClick={() => formatText("italic")}
            />
          </Center>
          <Center rounded="sm">
            <Icon
              cursor="pointer"
              as={MdFormatUnderlined}
              fontSize={22}
              color={Color.icon}
              onClick={() => formatText("underline")}
            />
          </Center>
          <Center rounded="sm">
            <Icon
              cursor="pointer"
              as={MdFormatQuote}
              fontSize={22}
              color={Color.icon}
              onClick={markAsQuote}
            />
          </Center>
        </Flex>
      )}
    </>
  );
};
export default InlineMenuPlugin;
