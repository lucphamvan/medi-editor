import { Center, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
	AddCircleIcon,
	CancelCircleIcon,
	AiImageIcon,
	CodeCircleIcon,
	VideoReplayIcon,
} from "hugeicons-react";
import {
	EditorState,
	LexicalEditor,
	$getSelection,
	$isRangeSelection,
	createCommand,
} from "lexical";
import { useState, useEffect } from "react";

const WINDOW_SIZE_CHANGE_COMMAND = createCommand("WINDOW_SIZE_CHANGE_COMMAND");

const MenuPlugin = () => {
	const { onToggle, isOpen } = useDisclosure();
	const [isEmptyNode, setIsEmptyNode] = useState(false);
	const [rect, setRect] = useState<DOMRect>();
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		window.addEventListener("resize", (_ev) => {
			editor.dispatchCommand(WINDOW_SIZE_CHANGE_COMMAND, undefined);
		});
	}, [editor]);

	useEffect(() => {
		editor.registerUpdateListener(() => {
			handleOnchange(editor.getEditorState(), editor);
		});

		editor.registerCommand(
			WINDOW_SIZE_CHANGE_COMMAND,
			() => {
				handleOnchange(editor.getEditorState(), editor);
				return true;
			},
			1
		);
	}, [editor]);

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
		<>
			{isEmptyNode && (
				<Flex
					gap="4"
					alignItems="center"
					minH="40px"
					position="absolute"
					top={
						rect?.bottom
							? rect.bottom - 35 + window.scrollY + "px"
							: "0px"
					}
					left={
						rect?.left
							? rect.left - 60 + window.scrollX + "px"
							: "0px"
					}
					bg="white"
				>
					<Center minH="40px">
						<Icon
							as={isOpen ? CancelCircleIcon : AddCircleIcon}
							width={30}
							height={30}
							onClick={onToggle}
							cursor="pointer"
							color="#8b8b8b"
						/>
					</Center>
					{isOpen && (
						<Flex alignItems="center" gap="4">
							<Icon
								as={AiImageIcon}
								width={30}
								height={30}
								cursor="pointer"
								color="#78aa4d"
							/>
							<Icon
								as={CodeCircleIcon}
								width={30}
								height={30}
								cursor="pointer"
								color="#B9EB8E"
							/>
							<Icon
								as={VideoReplayIcon}
								width={30}
								height={30}
								cursor="pointer"
								color="#B9EB8E"
							/>
						</Flex>
					)}
				</Flex>
			)}
			{/* <OnChangePlugin onChange={handleOnchange} /> */}
		</>
	);
};

export default MenuPlugin;
