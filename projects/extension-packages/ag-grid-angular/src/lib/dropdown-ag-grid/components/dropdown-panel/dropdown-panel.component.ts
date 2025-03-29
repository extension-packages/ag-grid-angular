import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellKeyDownEvent,
  FilterChangedEvent,
  FirstDataRenderedEvent,
  GridOptions,
  GridReadyEvent,
  SelectionChangedEvent,
  Theme,
} from 'ag-grid-community';

@Component({
  selector: 'ag-dropdown-panel',
  imports: [AgGridAngular],
  template: `
    <ag-grid-angular
      [gridOptions]="gridOptions()"
      [theme]="theme()"
      (cellKeyDown)="cellKeyDown.emit($any($event))"
      (firstDataRendered)="firstDataRendered.emit($event)"
      (filterChanged)="filterChanged.emit($event)"
      (gridReady)="gridReady.emit($event)"
      (selectionChanged)="selectionChanged.emit($event)"
    ></ag-grid-angular>
  `,
  styles: [
    `
      :host {
        height: inherit;
        width: inherit;
      }
      ag-grid-angular {
        height: 100%;
        width: 100%;
      }
      :host ::ng-deep .ag-row-focus {
        background-color: var(--ag-row-hover-color);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownPanelComponent<TData = any, TContext = any> implements AfterViewInit {
  columnHeaderVisible = input(false);
  gridOptions = input<GridOptions>();
  theme = input<Theme>();

  cellKeyDown = output<CellKeyDownEvent>();
  firstDataRendered = output<FirstDataRenderedEvent<TData, TContext>>();
  filterChanged = output<FilterChangedEvent<TData, TContext>>();
  gridReady = output<GridReadyEvent<TData, TContext>>();
  selectionChanged = output<SelectionChangedEvent<TData, TContext>>();

  agGrid = contentChild(AgGridAngular);
  private elRef = inject(ElementRef<HTMLElement>);

  get context() {
    return this.agGrid()?.context || this.agGrid()?.gridOptions?.context;
  }
  get gridApi() {
    return this.agGrid()?.api;
  }

  ngAfterViewInit(): void {
    this.initAgHeader();
  }

  private initAgHeader() {
    const element = this.elRef.nativeElement as HTMLElement;
    const agHeaderEl = element.querySelector('.ag-header') as HTMLElement;
    agHeaderEl.style.display = this.columnHeaderVisible() ? 'block' : 'none';
  }
}
