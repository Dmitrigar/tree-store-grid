<script setup lang="ts">
  import TreeStoreGrid from './components/TreeStoreGrid.vue';
  import { TreeStore } from './utils/tree-store';

  const treeStore = new TreeStore([
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
  ]);
</script>

<template>
  <TreeStoreGrid
    :tree-store="treeStore"
    style="height: calc(100vh - 2*var(--body-margin))"
  />
</template>

<style>
body {
  --body-margin: 8px;
  margin: var(--body-margin);
  padding: 0;
}
</style>
