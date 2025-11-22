import type { ID, Item } from "../types/item";

export class TreeStore {
  private readonly items!: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  public getAll() {
    return this.items;
  }

  public getItem(id: ID) {
    return this.items.find(item => item.id === id);
  }

  public getChildren(parent: ID) {
    return this.items.filter(item => item.parent === parent);
  }

  public getAllChildren(parent: ID) {
    const parents = [parent];
    let children: Item[] = [];

    while (parents.length) {
      const currentParent = parents.pop();
      const currentChildren = this.getChildren(currentParent!);

      children = children.concat(currentChildren)

      for (let i = currentChildren.length - 1; i >= 0; i--) {
        parents.push(currentChildren[i]!.id);
      }
    }

    return children;
  }
}
