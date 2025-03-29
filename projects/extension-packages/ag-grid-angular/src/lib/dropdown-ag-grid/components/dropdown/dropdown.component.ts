import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  inject,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import {
  CellKeyDownEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
  SelectionChangedEvent,
  Theme,
} from 'ag-grid-community';
import { DropdownSelectionChangeEvent } from '../../interfaces/dropdown-selection-change-event';
import { DropdownUtils } from '../../utils';
import { DropdownPanelComponent } from '../dropdown-panel/dropdown-panel.component';

@Component({
  selector: 'ag-dropdown',
  imports: [],
  template: `
    <input
      #inputRef
      type="text"
      [disabled]="disabled()"
      [placeholder]="placeholder()"
      [value]="displayText()"
      (focus)="openDropdown()"
      (keydown)="onKeyDown($event)"
      (input)="onInput($any($event.target).value)"
      (click)="openDropdown()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent<TData = any> {
  // Inputs
  readonly columnHeaderVisible = input(false);
  readonly disabled = input(false);
  readonly displayFields = input<string[]>([]);
  readonly gridOptions = input<GridOptions>();
  readonly listSize = input(7);
  readonly placeholder = input('Search...');
  readonly selected = input<TData | TData[]>();
  readonly theme = input<Theme>();
  readonly valueField = input<string>('');

  // Outputs
  selectionChange = output<DropdownSelectionChangeEvent<TData>>();

  // Signals
  displayText = linkedSignal(() =>
    DropdownUtils.getDisplayText(this.selectedData() as any, this.displayFields())
  );

  protected dropdownInput = viewChild.required<ElementRef<HTMLInputElement>>('inputRef');
  protected selectedData = linkedSignal(() => this.selected());

  /** Grid api from ag-grid inside dropdown panel */
  gridApi?: GridApi;
  overlayRef?: OverlayRef;

  private overlay = inject(Overlay);

  get isPanelOpen() {
    return this.overlayRef?.hasAttached();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.isPanelOpen) return;
    const inputEl = this.dropdownInput().nativeElement;
    const overlayEl = this.overlayRef?.overlayElement;
    const target = event.target as HTMLElement;

    if (!inputEl.contains(target) && !overlayEl?.contains(target)) {
      this.closeDropdown();
    }
  }

  openDropdown() {
    if (!this.isPanelOpen) this.createOverlay();
  }

  closeDropdown() {
    if (this.isPanelOpen) this.overlayRef?.dispose();
  }

  protected onInput = (value: string) => {
    this.gridApi?.setGridOption('quickFilterText', value);
  };

  // Add keydown handler
  protected onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'Enter':
        if (this.isPanelOpen) DropdownUtils.focusGridCell(this.gridApi);
        else this.openDropdown();
        event.preventDefault();
        break;
      case 'Escape':
        this.closeDropdown();
        break;
    }
  }

  private createOverlay() {
    const inputEl = this.dropdownInput().nativeElement;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.dropdownInput())
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      height: inputEl.offsetHeight * 1.5 + inputEl.offsetHeight * this.listSize(),
      width: inputEl.offsetWidth,
    });

    const panelPortal = new ComponentPortal(DropdownPanelComponent);
    const panelComponentRef = this.overlayRef.attach(panelPortal);

    this.initPanelComponent(panelComponentRef);
  }

  private initPanelComponent = (componentRef: ComponentRef<DropdownPanelComponent>) => {
    const gridOptions = this.getGridOptions();
    // Set inputs
    componentRef.setInput('columnHeaderVisible', this.columnHeaderVisible());
    componentRef.setInput('gridOptions', gridOptions);
    componentRef.setInput('theme', this.theme());

    const component = componentRef.instance;
    component.cellKeyDown.subscribe(this.onCellKeyDown);
    component.gridReady.subscribe(this.onGridReady);
    component.selectionChanged.subscribe(this.onSelectionChanged);
  };

  private onCellKeyDown = (event: CellKeyDownEvent) => {
    const keyEvent = event.event as KeyboardEvent;
    const { key } = keyEvent;
    switch (key) {
      case 'Enter':
        event.node.setSelected(true);
        break;
      case 'Escape':
        this.dropdownInput().nativeElement.focus();
        this.closeDropdown();
        break;
    }
  };

  private onGridReady = ({ api }: GridReadyEvent) => {
    this.gridApi = api;
    api.sizeColumnsToFit();
    const selectedData = this.selectedData();
    if (selectedData) {
      const rowData = Array.isArray(selectedData) ? selectedData : [selectedData];
      api.ensureNodeVisible(rowData[0], 'middle');
    }
    DropdownUtils.focusGridCell(api);
  };

  private onSelectionChanged = ({ api, source }: SelectionChangedEvent) => {
    const rows = api.getSelectedRows();
    const displayText = DropdownUtils.getDisplayText(rows, this.displayFields());
    this.displayText.set(displayText);
    if (source === 'gridInitializing') return;
    const type = DropdownUtils.getSelectionType(api);

    const selected = type === 'single' ? rows[0] : rows;
    const value = type === 'single' ? DropdownUtils.getValue(rows[0], this.valueField()) : null;
    this.selectionChange.emit({ selected, value });
    this.selectedData.set(selected);

    switch (type) {
      case 'single':
        this.dropdownInput().nativeElement.focus();
        this.closeDropdown();
        break;
    }
  };

  private getGridOptions(): GridOptions {
    const inputEl = this.dropdownInput().nativeElement;
    const gridOptions = this.gridOptions() || {};
    if (!gridOptions.rowHeight) {
      gridOptions.rowHeight = inputEl.offsetHeight;
    }
    if (!gridOptions.headerHeight) {
      gridOptions.headerHeight = inputEl.offsetHeight * 1.5 - 3;
    }
    if (!gridOptions.getRowId && this.valueField()) {
      gridOptions.getRowId = (params) => {
        return String(params.data[this.valueField()]);
      };
    }
    const rowSelection = DropdownUtils.getRowIds(this.selectedData(), this.valueField());
    gridOptions.initialState = { rowSelection };
    return gridOptions;
  }
}
