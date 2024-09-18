import { Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
	TextBoldIcon,
	TextItalicIcon,
	TextUnderlineIcon,
} from "hugeicons-react";
import { $getSelection, $isRangeSelection } from "lexical";
import { useEffect, useState } from "react";

const InLineMenuPlugin = () => {
	const [editor] = useLexicalComposerContext();
	const { isOpen: isShowInlineMenu, onOpen, onClose } = useDisclosure();
	const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

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
							console.log(rect);
							console.log(selection.getTextContent());
							setMenuPosition({
								top: rect.top + window.scrollY - 50, // Position above the text
								left:
									rect.left +
									window.scrollX +
									rect.width / 2 -
									40,
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

	return (
		<>
			{isShowInlineMenu && (
				<Flex
					position="absolute"
					top={`${menuPosition.top}px`}
					left={`${menuPosition.left}px`}
					background="white"
					boxShadow="md"
					gap="4"
					px="4"
					py="2"
					borderRadius="4px"
					alignItems="center"
				>
					<Icon
						cursor="pointer"
						as={TextBoldIcon}
						fontSize={15}
						strokeWidth={2}
						_hover={{ background: "gray.100" }}
					/>
					<Icon
						cursor="pointer"
						as={TextItalicIcon}
						fontSize={15}
						strokeWidth={2}
						_hover={{ background: "gray.100" }}
					/>
					<Icon
						cursor="pointer"
						_hover={{ background: "gray.100" }}
						as={TextUnderlineIcon}
						fontSize={15}
						strokeWidth={2}
					/>
				</Flex>
			)}
		</>
	);
};
export default InLineMenuPlugin;
