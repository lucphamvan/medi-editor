import {
    ParagraphNode,
    EditorConfig,
    NodeKey,
    SerializedParagraphNode,
  } from "lexical";
  import "./PlaceholderParagraphNode.css";
  
  export class ParagraphWithPlaceholderNode extends ParagraphNode {
    __placeholder: string;
  
    constructor(placeholder: string, key?: NodeKey) {
      super(key);
      this.__placeholder = placeholder;
    }
  
    // Override the createDOM method to handle the placeholder
    createDOM(config: EditorConfig): HTMLElement {
      const dom = super.createDOM(config);
      const isEmpty = this.getTextContent() === "";
      dom.classList.add("custom-paragraph-node");
      dom.setAttribute("data-placeholder", isEmpty ? this.__placeholder : "");
      return dom;
    }
  
    updateDOM(
      prevNode: ParagraphNode,
      dom: HTMLElement,
      config: EditorConfig
    ): boolean {
      const isEmpty = this.getTextContent() === "";
      dom.setAttribute("data-placeholder", isEmpty ? this.__placeholder : "");
      return super.updateDOM(prevNode, dom, config);
    }
  
    // Override clone method
    static clone(
      node: ParagraphWithPlaceholderNode
    ): ParagraphWithPlaceholderNode {
      return new ParagraphWithPlaceholderNode(node.__placeholder, node.__key);
    }
  
    // Define the node type
    static getType(): string {
      return "custom-paragraph-node";
    }
  
    static importJSON(
      serializedNode: SerializedParagraphNode
    ): ParagraphWithPlaceholderNode {
      return super.importJSON(serializedNode) as ParagraphWithPlaceholderNode;
    }
  
    exportJSON(): SerializedParagraphNode {
      return super.exportJSON();
    }
  }
  