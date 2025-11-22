import type { Item } from "../types/item";

export class TreeStore {
  private readonly items!: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }
}
