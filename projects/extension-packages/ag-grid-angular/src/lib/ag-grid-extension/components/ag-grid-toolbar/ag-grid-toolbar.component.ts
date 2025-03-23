import { Component, input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridToolbarSearchComponent } from '../ag-grid-toolbar-search/ag-grid-toolbar-search.component';

@Component({
  imports: [AgGridToolbarSearchComponent],
  selector: 'ag-grid-toolbar',
  standalone: true,
  styleUrls: ['./ag-grid-toolbar.component.css'],
  template: `
    <div class="ag-grid-toolbar">
      <div class="ag-grid-toolbar-content">
        <div class="ag-grid-toolbar-content-left">
          @if (enableSearch()) {
            <ag-grid-toolbar-search
              [agGrid]="agGrid()"
              [debounceTime]="debounceSearch()"
              [disabled]="disableSearch()"
              [placeholder]="placeholderSearch()"
            ></ag-grid-toolbar-search>
          }
          <ng-content select="[toolbarLeft]"></ng-content>
        </div>
        <div class="ag-grid-toolbar-content-center">
          <ng-content select="[toolbarCenter]"></ng-content>
        </div>
        <div class="ag-grid-toolbar-content-right">
          <ng-content select="[toolbarRight]"></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class AgGridToolbarComponent {
  readonly agGrid = input.required<AgGridAngular>();
  readonly debounceSearch = input(500);
  readonly disableSearch = input(false);
  readonly enableSearch = input(true);
  readonly placeholderSearch = input('Search...');
}
