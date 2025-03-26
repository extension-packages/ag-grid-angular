import { Component, input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

let timer: any;
@Component({
  selector: 'ag-grid-toolbar-search',
  standalone: true,
  styleUrls: ['./ag-grid-toolbar-search.component.css'],
  template: `
    <input
      type="search"
      [disabled]="disabled()"
      [placeholder]="placeholder()"
      (keyup)="onSearch($event)"
      (search)="onSearch($event)"
    />
  `,
})
export class AgGridToolbarSearchComponent {
  readonly agGrid = input.required<AgGridAngular>();
  readonly debounceTime = input(500);
  readonly disabled = input(false);
  readonly placeholder = input('Search...');

  get context(): { quickFilterText: string } {
    const agGrid = this.agGrid();
    return agGrid.context || agGrid.gridOptions?.context;
  }

  onSearch({ target }: any) {
    const { api } = this.agGrid();
    clearTimeout(timer);
    timer = setTimeout(() => {
      const rowModelType = api.getGridOption('rowModelType');
      if (rowModelType === 'serverSide') {
        this.setQuickFilter(target.value);
        api.onFilterChanged();
      } else {
        api.setGridOption('quickFilterText', target.value);
        this.setQuickFilter(target.value);
      }
      const rowSelection = api.getGridOption('rowSelection');
      if (rowSelection !== 'multiple') {
        api.deselectAll();
      }
    }, this.debounceTime());
  }

  setQuickFilter(term: string) {
    if (this.context) {
      this.context.quickFilterText = term;
    }
  }
}
