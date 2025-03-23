import { Injectable } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';

@Injectable({ providedIn: 'root' })
export class GridOptionsService {
  getDefaultColDef = (): ColDef => {
    return { editable: true, enableCellChangeFlash: true, sortable: true };
  };

  getColDefs = (): ColDef[] => [
    { field: 'id', width: 55 },
    { field: 'brand' },
    { field: 'model' },
    { field: 'price', width: 90 },
    { field: 'isNew', width: 80 },
  ];

  core = (): GridOptions => {
    return {
      context: {},
      defaultColDef: this.getDefaultColDef(),
      getRowId: (params) => {
        return String(params.data['id']);
      },
      rowSelection: {
        mode: 'singleRow',
      },
      undoRedoCellEditing: true,
    };
  };

  clientSide = (): GridOptions => {
    return {
      ...this.core(),
      rowModelType: 'clientSide',
    };
  };

  serverSide = (): GridOptions => {
    return {
      ...this.core(),
      rowModelType: 'serverSide',
    };
  };
}
