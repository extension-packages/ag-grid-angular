import { AgGridToolbarAction } from './interfaces/ag-grid-toolbar-action';

export const presetActions: {
  [key in 'export' | 'fit' | 'reset']: AgGridToolbarAction;
} = {
  export: {
    icon: 'file_download',
    tooltip: 'Export as csv',
    clickFn: (params) => {
      const { api } = params.event;
      api.exportDataAsCsv();
    },
  },
  fit: {
    icon: 'view_column',
    tooltip: 'Fit columns',
    clickFn: (params) => {
      const { api } = params.event;
      api.sizeColumnsToFit();
    },
  },
  reset: {
    icon: 'history',
    tooltip: 'Reset columns',
    clickFn: (params) => {
      const { api } = params.event;
      api.resetColumnState();
    },
  },
};

export const actionsSets = {
  standard: [presetActions.reset, presetActions.fit, presetActions.export],
};
