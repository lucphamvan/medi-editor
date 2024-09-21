import {
  HeadingNode,
  HeadingTagType,
  SerializedHeadingNode,
} from "@lexical/rich-text";
import { EditorConfig, LexicalNode, NodeKey } from "lexical";
import "./index.css";

interface SerializedHeadNode extends SerializedHeadingNode {
  className?: string;
}

export class HeadNode extends HeadingNode {
  private __className?: string;

  constructor(tag: HeadingTagType, className?: string, key?: NodeKey) {
    super(tag, key);
    this.__className = className;
  }

  static clone(node: HeadNode): HeadNode {
    return new HeadNode(node.__tag, node.__className, node.__key);
  }

  static getType(): string {
    return "head-node";
  }

  static importJSON(serializedNode: SerializedHeadNode): HeadingNode {
    return $createHeadNode(serializedNode.tag);
  }

  private updateClassnameForDOM(dom: HTMLElement) {
    const isEmpty = this.getTextContent() === "";
    if (isEmpty) {
      dom.classList.add("editor-first-heading");
    } else {
      dom.classList.remove("editor-first-heading");
    }
    if (this.__className) {
      dom.classList.add(this.__className);
    }
    return dom;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    this.updateClassnameForDOM(dom);
    return dom;
  }

  updateDOM(prevNode: HeadNode, dom: HTMLElement): boolean {
    this.updateClassnameForDOM(dom);
    return super.updateDOM(prevNode, dom);
  }

  exportJSON(): SerializedHeadNode {
    const serializedHeadNode = super.exportJSON();
    return {
      ...serializedHeadNode,
      className: this.__className,
      type: HeadNode.getType(),
    };
  }
}

export function $createHeadNode(
  headingTag: HeadingTagType,
  className?: string
): HeadingNode {
  return new HeadNode(headingTag, className);
}

export function $isHeadNode(node: LexicalNode): boolean {
  return node.getType() === HeadNode.getType();
}
