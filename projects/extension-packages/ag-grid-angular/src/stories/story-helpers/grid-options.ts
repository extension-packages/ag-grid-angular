import { AgGridEvent } from 'ag-grid-community';
import { DatasourceService } from './datasource.service';
import { GridOptionsService } from './grid-options.service';
import { AgGridContext } from '../../public-api';

const datasourceService = new DatasourceService();
const gridOptionsService = new GridOptionsService();
export const gridOptions = gridOptionsService.clientSide();
gridOptions.rowSelection = { mode: 'multiRow' };
gridOptions.columnDefs = [...gridOptionsService.getColDefs()];
gridOptions.rowData = datasourceService.generateItems(15);
gridOptions.onSelectionChanged = (event: AgGridEvent<any, AgGridContext>) => {
  const { api, context } = event;
  const nodes = api.getSelectedNodes();
  const deleteAction = context.actions?.find(({ icon }) => icon === 'delete');
  const editAction = context.actions?.find(({ icon }) => icon === 'visibility');
  const copyAction = context.actions?.find(
    ({ icon }) => icon === 'content_copy',
  );
  if (deleteAction) {
    deleteAction.disabled = nodes.length === 0;
  }
  if (editAction) {
    editAction.disabled = nodes.length === 0;
  }
  if (copyAction) {
    copyAction.disabled = nodes.length === 0;
  }
};
gridOptions.onCellValueChanged = (event: AgGridEvent<any, AgGridContext>) => {
  const { api, context } = event;
  const redoAction = context.actions?.find(({ icon }) => icon === 'left');
  const undoAction = context.actions?.find(({ icon }) => icon === 'right');
  if (redoAction) {
    redoAction.disabled = api.getCurrentRedoSize() === 0;
  }
  if (undoAction) {
    undoAction.disabled = api.getCurrentUndoSize() === 0;
  }
};
