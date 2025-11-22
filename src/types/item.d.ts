export interface Item extends Record<string, unknown> {
  id: ID;
  parent: ID | null;
}

export type ID = string | number;
