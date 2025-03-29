import { GridApi } from 'ag-grid-community';
export class DropdownUtils {
  static focusGridCell(api?: GridApi) {
    if (!api) return;
    const selectedNodes = api.getSelectedNodes();
    const rowIndex = selectedNodes[0]?.rowIndex ?? 0;
    const columns = api.getAllDisplayedColumns();
    api.setFocusedCell(rowIndex, columns[0]);
    api.ensureIndexVisible(rowIndex, 'middle');
  }

  static getSelectionType(api: GridApi): 'single' | 'multiple' | undefined {
    const type = api.getGridOption('rowSelection');
    if (typeof type === 'string') {
      if (type === 'single') return 'single';
      if (type === 'multiple') return 'multiple';
    }
    if (typeof type === 'object' && type !== null) {
      if (type.mode === 'singleRow') return 'single';
      if (type.mode === 'multiRow') return 'multiple';
    }
    return undefined;
  }

  static getValue(data: any, valueField?: string): any {
    return valueField ? data[valueField] : data;
  }

  static getValues(data: any[], valueField?: string): any[] {
    return valueField ? data.map((d) => d[valueField]) : data;
  }

  static getDisplayText(
    data: string | number | object | string[] | number[] | object[],
    displayFields: string[]
  ): string {
    // Handle null/undefined
    if (!data) return '';

    // Normalize to array
    const items = Array.isArray(data) ? data : [data];
    const firstItem = items[0];

    // Compute base text based on type
    const baseText =
      typeof firstItem === 'object' && firstItem !== null
        ? displayFields.map((field) => String((firstItem as any)[field] ?? '')).join(' - ')
        : String(firstItem);

    // Add suffix for multiple items
    return items.length > 1 ? `${baseText} + ${items.length - 1}` : baseText;
  }

  static getRowIds(selected: any, valueField: string): string[] {
    return selected && valueField
      ? Array.isArray(selected)
        ? selected.map((item) => String(item[valueField]))
        : [String(selected[valueField])]
      : [];
  }
}
