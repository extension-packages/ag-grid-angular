export interface DropdownSelectionChangeEvent<TData = unknown>
  extends DropdownPanelSelectionChangeEvent<TData> {
  /** Value when single selection */
  value: TData | null;
}

export interface DropdownPanelSelectionChangeEvent<TData = unknown> {
  /** Selected item when single selection */
  selected: TData | TData[];
}
