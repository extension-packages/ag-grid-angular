import { AgGridToolbarAction } from '../interfaces/ag-grid-toolbar-action';

export const agGridToolbarAction = {
  copySelectedRows: {
    icon: 'content_copy',
    tooltip: 'Copy selected rows',
    clickFn: async (params) => {
      const { api } = params.event;
      const rows = api.getSelectedRows();
      const jsonString = JSON.stringify(rows, null, 2);
      try {
        await navigator.clipboard.writeText(jsonString);
      } catch (err) {
        throw err;
      }
    },
  } as AgGridToolbarAction,
  csv: {
    icon: 'file_download',
    tooltip: 'Export as csv',
    clickFn: (params) => {
      const { api } = params.event;
      api.exportDataAsCsv();
    },
  } as AgGridToolbarAction,
  fit: {
    icon: 'view_column',
    tooltip: 'Fit columns',
    clickFn: (params) => {
      const { api } = params.event;
      api.sizeColumnsToFit();
    },
  } as AgGridToolbarAction,
  reset: {
    icon: 'history',
    tooltip: 'Reset columns',
    clickFn: (params) => {
      const { api } = params.event;
      api.resetColumnState();
    },
  } as AgGridToolbarAction,
} as const;
