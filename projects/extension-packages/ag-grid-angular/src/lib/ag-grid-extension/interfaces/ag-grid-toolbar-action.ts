import { AgGridEvent } from 'ag-grid-community';

export interface AgGridToolbarAction<TData = any, TContext = any> {
  /** Action color */
  color?: string;
  /** Default: `false`. */
  disabled?: boolean;
  /** If no icon is provided, the `ToolbarAction` will be treated as a separator. */
  icon?: string;
  /** ID for toolbar action, used to set html id. */
  id?: string;
  /** Tooltip text. */
  tooltip?: string;
  /** Tooltop text for disabled action */
  tooltipDisabled?: string;
  /** Arrow function to execute on click. */
  clickFn?: (event: AgGridToolbarActionClickParams<TData, TContext>) => void;
}

export interface AgGridToolbarActionClickParams<TData = any, TContext = any> {
  /** AgGrid event */
  event: AgGridEvent<TData, TContext>;
  /** Reference to the clicked action */
  action: AgGridToolbarAction<TData, TContext>;
}
