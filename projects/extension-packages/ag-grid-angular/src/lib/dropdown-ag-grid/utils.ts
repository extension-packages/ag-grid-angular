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

  static getValue<T>(data: T, valueField?: keyof T): T[keyof T] | T {
    return valueField ? data[valueField] : data;
  }

  static getValues<T>(data: T[], valueField?: keyof T): T[keyof T][] | T[] {
    return this.mapField(data, valueField);
  }

  static getDisplayText(data: any, displayFields: string[]): string {
    if (!data || !displayFields) return '';
    const items = this.normalizeData(data);
    const baseText = this.getBaseDisplayText(items[0], displayFields);
    return this.appendCountSuffix(baseText, items.length);
  }

  static getRowIds(selected: any | any[], valueField: string): string[] {
    const normalizedData = this.normalizeData(selected);
    return this.mapField(normalizedData, valueField).map(String);
  }

  // Private helper methods
  private static normalizeData<T>(data: T | T[]): T[] {
    return Array.isArray(data) ? data : [data];
  }

  private static getBaseDisplayText(item: any, displayFields: string[]): string {
    return typeof item === 'object' && item !== null
      ? displayFields.map((field) => String(item[field] ?? '')).join(' - ')
      : String(item);
  }

  private static appendCountSuffix(baseText: string, count: number): string {
    return count > 1 ? `${baseText} + ${count - 1}` : baseText;
  }

  private static mapField<T>(data: T[], field?: keyof T): T[keyof T][] | T[] {
    return field ? data.map((item) => item[field]) : data;
  }
}
