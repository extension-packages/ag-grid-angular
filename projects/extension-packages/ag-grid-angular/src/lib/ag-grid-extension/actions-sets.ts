import { AgGridToolbarAction } from './interfaces/ag-grid-toolbar-action';

export const presetActions: {
  [key in 'export' | 'fit' | 'reset' | 'redo' | 'undo']: AgGridToolbarAction;
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
  redo: {
    disabled: true,
    icon: 'redo',
    tooltip: 'Redo',
    clickFn: (params) => {
      const { api } = params.event;
      api.redoCellEditing();
    },
  },
  reset: {
    icon: 'restart_alt',
    tooltip: 'Reset columns',
    clickFn: (params) => {
      const { api } = params.event;
      api.resetColumnState();
    },
  },
  undo: {
    disabled: true,
    icon: 'undo',
    tooltip: 'Undo',
    clickFn: (params) => {
      const { api } = params.event;
      api.undoCellEditing();
    },
  },
};

export const actionsSets = {
  redoUndo: [presetActions.redo, presetActions.undo],
  standard: [presetActions.reset, presetActions.fit, presetActions.export],
};
