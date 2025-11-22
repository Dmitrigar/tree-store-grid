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
}
