import { TimberNode } from './node';

export default class Timber {
  public root: null | TimberNode;
  public arr: Array<string>;
  constructor() {
    this.root = null;
    this.arr = [];
  }

  insert(str: string) {
    if (this.root === null) {
      this.root = new TimberNode();
    }

    this.arr.push(str);

    let currentNode = this.root;
    for (let i = 0, len = str.length; i < len; ++i) {
      const char = str[i];
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TimberNode(char));
      }
      currentNode = currentNode.children.get(char)!;
    }
    currentNode.isEndOfTheWord = true;
  }

  search(str: string) {
    if (this.root === null) return 'Trie is empty';
    let currentNode = this.root;
    for (let i = 0, len = str.length; i < len; ++i) {
      const char = str[i];
      currentNode = currentNode?.children.get(char)!;
      if (currentNode === null) break;
    }
    if (currentNode?.isEndOfTheWord) {
      return str;
    }
    return null;
  }

  deleteString(str: string) {
    if (this.root == null) {
      return;
    }
    let currentNode = this.root;
    for (let i = 0, len = str.length; i < len; ++i) {
      const char = str[i];
      currentNode = currentNode.children.get(char)!;
      if (currentNode === null) {
        return;
      }
    }
    if (currentNode.isEndOfTheWord) {
      currentNode.isEndOfTheWord = false;
    }
    if (currentNode.children.size === 0) {
      return;
    }
  }

  private findAllWords(str: string) {
    if (this.root === null) return 'Trie is empty';
    let currentNode = this.root;
    const result: Array<string> = [];
    for (let i = 0, len = str.length; i < len; ++i) {
      const char = str[i];
      if (!currentNode) return result;
      currentNode = currentNode.children.get(char)!;
    }
    this.helper(currentNode, result, str.substring(0, str.length));
    return result;
  }

  private helper(currentNode: TimberNode, result: Array<string>, str: string) {
    if (currentNode.isEndOfTheWord) {
      return result.push(str);
    }
    for (const [key, value] of currentNode.children) {
      this.helper(value, result, str + key);
    }
  }
}
