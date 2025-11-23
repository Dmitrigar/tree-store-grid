<script lang="ts">
  import { defineComponent, useCssModule } from 'vue';

  import {
    ModuleRegistry,

    ClientSideRowModelModule,
  } from 'ag-grid-community';
  import {
    TreeDataModule,
    RowNumbersModule,
    type RowNumbersOptions
  } from 'ag-grid-enterprise';

  ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    RowNumbersModule,
    TreeDataModule
  ]);

  const rowHeaderComponent = defineComponent({
    render() {
      return '№ п\\п';
    }
  })
</script>

<script setup lang="ts">
  import { AgGridVue } from 'ag-grid-vue3';
  import type { ColDef, GetDataPath } from 'ag-grid-community';

  import { TreeStore } from '../utils/tree-store';
  import type { Item } from '../types/item';

  const { treeStore } = defineProps<{
    treeStore: TreeStore;
  }>();

  const $style = useCssModule();

  const rowNumbersOptions: RowNumbersOptions = {
    headerComponent: rowHeaderComponent,
    minWidth: 80
  };

  const autoGroupColumnDef: ColDef<Item> = {
    headerName: 'Категория',
    flex: 1,
    cellRendererParams: {
      suppressCount: true
    },
    cellClassRules: {
      [$style['tree-store-cell--group']]: p => p.node.group === true
    },
    valueGetter: p => {
      if (p.data?.id) {
        return treeStore.getChildren(p.data!.id).length ? 'Группа' : 'Элемент';
      }

      return '';
    },
  };

  const columns: ColDef<Item>[] = [
    {
      headerName: 'Наименование',
      field: 'label',
      flex: 3,
      cellClassRules: {
        [$style['tree-store-cell--group']]: p => p.node.group === true
      },
    }
  ];


  const getItemPath: GetDataPath<Item> = item => {
    const parents = treeStore.getAllParents(item.id);
    parents.reverse();
    return parents.map(x => String(x.id));
  };
</script>

<template>
  <AgGridVue
    :class="$style['tree-store-grid']"
    :row-numbers="rowNumbersOptions"
    :auto-group-column-def="autoGroupColumnDef"
    :column-defs="columns"
    :row-data="treeStore.getAll()"
    :tree-data="true"
    :get-data-path="getItemPath"
  />
</template>

<style module>
  .tree-store-grid {
    height: 500px;
  }
  
  .tree-store-cell--group {
    font-weight: 500;
  }

  .tree-store-grid :global(.ag-row-number-cell) {
    text-align: start;
  }
</style>
