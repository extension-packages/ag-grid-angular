import {
  Component,
  contentChild,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridEvent } from 'ag-grid-community';
import { firstValueFrom } from 'rxjs';
import { agGridToolbarAction } from '../../constants/ag-grid-toolbar-actions';
import { AgGridContext } from '../../interfaces/ag-grid-context';
import { AgGridToolbarAction } from '../../interfaces/ag-grid-toolbar-action';
import { AgGridToolbarActionComponent } from '../ag-grid-toolbar-action/ag-grid-toolbar-action.component';
import { AgGridToolbarSearchComponent } from '../ag-grid-toolbar-search/ag-grid-toolbar-search.component';

/**
 * Adds toolbar to ag-grid, with search and actions.
 *
 * ### Prerequisites
 *
 * - [Ag Grid Angular](https://www.ag-grid.com/angular-data-grid/getting-started/)
 * - Add icon-font(s) of your choice. Must be included in your html and css.
 *   - Default: `material-icons`
 *
 * ```html
 * <!-- Google icon-font: https://developers.google.com/fonts/docs/material_icons -->
 * <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
 * ```
 *
 * ## Features:
 * - Quick search
 * - Toolbar actions
 *   - Clickable icons
 *   - Add icon-font of your choice.
 *     - Default: `material-icons`
 *     - Setup: https://developers.google.com/fonts/docs/material_icons#setup_method_1_using_via_google_fonts
 * - Toolbar content projection with ng-content
 *   - Content placeholders (selectors)
 *     - `toolbarLeft` => Toolbar left
 *     - `toolbarCenter` => Toolbar center
 *     - `toolbarRight` => Toolbar right
 *     - `actionsLeft` => pre actions
 *     - `actionsRight` => post actions
 *   - Single-slot
 * - Adapts to ag-grid themes
 *
 * ## Component overview
 *
 * **Class:** `AgGridToolbarComponent`, `AgGridToolbarActionComponent`
 *
 * **Constants:**
 * - `agGridToolbarActions: AgGridToolbarAction` => Predefined single actions. Fit columns, reset columns, cvs export etc
 *
 * **Interfaces:**
 * - `AgGridContext` => Properties this component adds to `gridOptions.context`
 * - `AgGridToolbarAction` => Properties for a toolbar action
 *
 * **Selector:** `ag-grid-toolbar`
 *
 * ### Toolbar search
 *
 * #### Client side
 *
 * Works out of the box for client side grids.
 *
 * #### Other row models
 *
 * Use `context.quickFilterText` in custom datasource implementation `IServerSideDatasource` like below.
 *
 * ```ts
 *   // server-side example
 *   export class ExampleDatasource implements IServerSideDatasource {
 *       getRows(params: IServerSideGetRowsParams): void {
 *         const { quickFilterText } = params.context as AgGridToolbarContext;
 *         // Then use `quickFilterText` in backend call etc..
 *       }
 *   }
 * ```
 *
 * ### Code example
 *
 * ```ts
 * @Component({
 *   standalone: true,
 *   selector: 'app-demo-grid',
 *   imports: [AgGridModule, AgGridToolbarComponent],
 *   template: `
 *     <ag-grid-toolbar [actions]="actions">
 *       <ag-grid-angular [gridOptions]="gridOptions"></ag-grid-angular>
 *     </ag-grid-toolbar>
 *   `,
 * })
 * export class DemoGridComponent {
 *   actions: AgGridToolbarAction[];
 *   gridOptions: GridOptions;
 * }
 * ```
 */
@Component({
  imports: [AgGridToolbarSearchComponent, AgGridToolbarActionComponent],
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
          <ng-content select="[actionsLeft]"></ng-content>
          @for (action of actions(); track $index) {
            @if (!action?.icon) {
              <span class="toolbar-action-separator"></span>
            }
            @if (action?.icon) {
              <!-- <div [title]="action.disabled ? action.tooltipDisabled || '' : ''"> -->
              <ag-grid-toolbar-action
                [color]="action?.color"
                [disabled]="action?.disabled || false"
                [icon]="action.icon"
                [id]="action.id"
                [tooltip]="action.tooltip || ''"
                (click)="action?.clickFn?.({ action, event })"
              ></ag-grid-toolbar-action>
              <!-- </div> -->
            }
          }
          <ng-content select="[actionsRight]"></ng-content>
        </div>
      </div>
    </div>

    <div class="ag-grid-content">
      <ng-content>
        <!-- ag-grid-angular -->
      </ng-content>
    </div>
  `,
})
export class AgGridToolbarComponent<TData = any, TContext = any> {
  /** Toolbar actions */
  readonly actions = input<AgGridToolbarAction[]>([
    agGridToolbarAction.fit,
    agGridToolbarAction.reset,
    agGridToolbarAction.csv,
  ]);
  /** Debounce in ms for search input */
  readonly debounceSearch = input(500);
  /** Disable search field*/
  readonly disableSearch = input(false);
  /** Enable search field*/
  readonly enableSearch = input(true);
  /** Search placeholder text */
  readonly placeholderSearch = input('Search...');

  /** Grid ready event */
  readonly gridReady = output<AgGridEvent<TData, TContext>>();

  readonly gridIsReady = signal(false);

  /** Ag-grid component ref */
  readonly agGrid = contentChild.required(AgGridAngular);

  private readonly elRef: ElementRef = inject(ElementRef);

  get context(): TContext & AgGridContext {
    return this.agGrid().context || this.agGrid().gridOptions?.context;
  }

  get event(): AgGridEvent<TData, TContext> {
    // this.agGrid().api.g
    return {
      api: this.agGrid().api,
      context: this.context,
    } as AgGridEvent<TData, TContext>;
  }

  ngAfterContentInit(): void {
    firstValueFrom(this.agGrid().gridReady).then((event) => {
      this.gridIsReady.set(true);
      if (event.context) {
        event.context.actions = this.actions();
      } else {
        const warning =
          'Missing `context` or `gridOptions.context`, some functionality will not work.';
        console.warn(warning);
      }
      this.gridReady.emit(event);
    });
  }

  ngAfterViewInit(): void {
    this.getAgStyles();
  }

  private getAgStyles() {
    const element = this.elRef.nativeElement;
    const variableNames = [
      '--ag-header-background-color',
      '--ag-wrapper-border',
      '--ag-border-color',
      '--ag-wrapper-border-radius',
      '--ag-input-disabled-background-color',
      '--ag-range-selection-border-color',
    ];
    const agEl = element.querySelector('ag-grid-angular')!;
    const styleEl = agEl.getElementsByTagName('style')[0];

    const computedStyles = window.getComputedStyle(styleEl);

    variableNames.forEach((varName) => {
      const value = computedStyles.getPropertyValue(varName);
      if (value) {
        document.documentElement.style.setProperty(varName, value.trim());
      }
    });
  }
}
