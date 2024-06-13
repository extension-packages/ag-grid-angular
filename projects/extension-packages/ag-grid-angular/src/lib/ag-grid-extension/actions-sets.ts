import { AgGridToolbarAction } from './interfaces/ag-grid-toolbar-action';

export const presetActions: {
  [key in 'export' | 'fit' | 'reset']: AgGridToolbarAction;
} = {
  export: {
    icon: 'csv',
    tooltip: 'Export as csv',
    clickFn: (params) => {
      const { api } = params.event;
      api.exportDataAsCsv();
    },
  },
  fit: {
    icon: 'arrows',
    tooltip: 'Fit columns',
    clickFn: (params) => {
      const { api } = params.event;
      api.sizeColumnsToFit();
    },
  },
  reset: {
    icon: 'columns',
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
