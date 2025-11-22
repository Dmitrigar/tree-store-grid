import { expect, test } from 'vitest';
import type { Item } from '../types/item';
import { TreeStore } from './tree-store';


const testItems: Item[] = [
  { id: '123aabc', parent: null, label: 'Item 1' },

  { id: 11, parent: '123aabc', label: 'Item 2' },
  { id: 16, parent: '123aabc', label: 'Item 3' },
  { id: '1234cc', parent: '123aabc', label: 'Item 4' },

  { id: 2, parent: 11, label: 'Item 5' },
  { id: 'abc999', parent: 11, label: 'Item 6' },

  { id: 5, parent: 16, label: 'Item 7' },

  { id: '4545xyz', parent: 5, label: 'Item 8' },
  { id: 890, parent: 5, label: 'Item 9' },

  { id: 3, parent: '4545xyz', label: 'Item 10' }
];

test('constructor takes items array', () => {
  new TreeStore(testItems);
})

test('getAll returns initial items array', () => {
  expect(new TreeStore([]).getAll()).toEqual([]);
  expect(new TreeStore(testItems).getAll()).toEqual(testItems);
});

test('getItem takes an id, returns item by the id', () => {
  expect(new TreeStore(testItems).getItem(11)).toEqual({ id: 11, parent: '123aabc', label: 'Item 2' });
  expect(new TreeStore(testItems).getItem('4545xyz')).toEqual({ id: '4545xyz', parent: 5, label: 'Item 8' });
});
