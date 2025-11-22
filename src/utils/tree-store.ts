import type { ID, Item } from "../types/item";

export class TreeStore {
  private readonly items!: Item[];

  constructor(items: Item[]) {
    this.items = items.slice();
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

  public getAllParents(id: ID) {
    const parents = [];
    let currentItem = this.getItem(id);

    while (currentItem) {
      parents.push(currentItem);
      currentItem = currentItem.parent
        ? this.getItem(currentItem.parent)
        : undefined;
    }

    return parents;
  }

  public addItem(item: Item) {
    this.items.push(item);
  }

  public removeItem(id: ID) {
    const childrenIds = this.getAllChildren(id).map(item => item.id);
    const ids = [id].concat(childrenIds);

    while (ids.length) {
      const currentId = ids.pop();
      this.items.splice(this.items.findIndex(item => item.id === currentId), 1);
    }
  }

  public updateItem(item: Item) {
    const originalItem = this.getItem(item.id);
    if (originalItem) {
      Object.assign(originalItem, item);
    }
  }
}
