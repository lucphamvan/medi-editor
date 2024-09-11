import { $getSelection, EditorState, LexicalEditor, $isRangeSelection } from 'lexical';
import { useEffect, useState } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import TreeViewPlugin from './plugins/TreeviewPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import "./editor.css"
import { Badge, Icon } from '@chakra-ui/react';
import { Add02Icon } from "hugeicons-react"

const theme = {

}


function onError(error: Error) {
    console.error(error);
}

const Editor = () => {
    const initialConfig: InitialConfigType = {
        namespace: 'MyEditor',
        theme,
        onError,
    };
    const [isEmptyNode, setIsEmptyNode] = useState(false);
    const [rect, setRect] = useState<DOMRect>()

    const handleScroll = () => {
        setIsEmptyNode(false)
    }
    useEffect(() => {
        document.addEventListener("scroll", handleScroll)
        return () => {
            document.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const handleOnchange = (state: EditorState, editor: LexicalEditor) => {
        state.read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const anchorNode = selection.anchor.getNode();
                const nodekey = anchorNode.getKey()
                const element = editor.getElementByKey(nodekey)
                const rect = element?.getBoundingClientRect()
                // Check if the node is a text node and if it's empty
                if (anchorNode.getTextContent() === '') {
                    setIsEmptyNode(true)
                    setRect(rect)
                    console.log(rect)
                } else {
                    setIsEmptyNode(false)
                    setRect(undefined)
                }
            }
        })
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
                contentEditable={<ContentEditable className='content-editor' />}
                placeholder={<div>Enter some text...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <TreeViewPlugin />
            <OnChangePlugin onChange={handleOnchange} />
            {isEmptyNode && <Icon
                color="#B8E986"
                fill="#B8E986"
                as={Add02Icon}
                position="fixed"
                strokeWidth={3}
                cursor="pointer"
                top={rect?.bottom ? rect.bottom - 20 + "px" : "0px"}
                left={rect?.left ? rect.left - 30 + "px" : "0px"} />}
        </LexicalComposer>
    );
}

export default Editor