import { DecoratorNode, SerializedLexicalNode } from "lexical";
import { ReactNode } from "react";
import { DecoratorBody } from "./decorator-body";

export class MyDecoratorNode extends DecoratorNode<ReactNode> {
  static getType(): string {
    return "my-decorator-node";
  }

  static clone(node: MyDecoratorNode): MyDecoratorNode {
    return new MyDecoratorNode(node.__key);
  }

  constructor(key?: string) {
    super(key);
  }

  createDOM(): HTMLElement {
    const element = document.createElement("div");
    element.classList.add("my-decorator-node");
    return element;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): ReactNode {
    return <DecoratorBody />;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static importJSON(_serializedNode: SerializedLexicalNode) {
    return new MyDecoratorNode();
  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: MyDecoratorNode.getType(),
      version: 1,
    };
  }
}

export function $createMyDecoratorNode(): MyDecoratorNode {
  return new MyDecoratorNode();
}
