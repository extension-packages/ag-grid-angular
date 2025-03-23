import {
  AfterContentInit,
  AfterViewInit,
  Component,
  contentChild,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridEvent } from 'ag-grid-community';
import { firstValueFrom } from 'rxjs';
import { actionsSets } from '../../actions-sets';
import { AgGridToolbarAction } from '../../interfaces/ag-grid-toolbar-action';
import { AgGridToolbarActionComponent } from '../ag-grid-toolbar-action/ag-grid-toolbar-action.component';
import { AgGridToolbarComponent } from '../ag-grid-toolbar/ag-grid-toolbar.component';
import { AgGridContext } from '../../interfaces/ag-grid-context';

/**
 * Extends ag-grid with a toolbar, search and actions.
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
 * **Class:** `AgGridExtensionComponent`, `AgGridToolbarActionComponent`
 *
 * **Constants:**
 * - `actionsSets: AgGridToolbarAction[]` => Predefined sets of actions
 * - `presetActions: AgGridToolbarAction` => Predefined single actions. Fit columns, reset columns, cvs export etc
 *
 * **Interfaces:**
 * - `AgGridContext` => Properties this component adds to `gridOptions.context`
 * - `AgGridToolbarAction` => Properties for a toolbar action
 *
 * **Selector:** `ag-grid-extension`
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
 *   imports: [AgGridModule, AgGridExtensionComponent],
 *   template: `
 *     <ag-grid-extension [actions]="actions">
 *       <ag-grid-angular [gridOptions]="gridOptions"></ag-grid-angular>
 *     </ag-grid-extension>
 *   `,
 * })
 * export class DemoGridComponent {
 *   actions: AgGridToolbarAction[];
 *   gridOptions: GridOptions;
 * }
 * ```
 */
@Component({
  imports: [AgGridToolbarComponent, AgGridToolbarActionComponent],
  selector: 'ag-grid-extension',
  templateUrl: './ag-grid-extension.component.html',
  standalone: true,
  styleUrls: ['./ag-grid-extension.component.css'],
  host: { class: 'ag-theme-extension' },
})
export class AgGridExtensionComponent<TData = any, TContext = any>
  implements AfterContentInit, AfterViewInit
{
  /** Toolbar actions */
  readonly actions = input<AgGridToolbarAction[]>(actionsSets.standard);
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
  /** Ag-grid component ref */
  readonly agGrid = contentChild.required(AgGridAngular);

  private readonly elRef: ElementRef = inject(ElementRef);

  get context(): TContext & AgGridContext {
    return this.agGrid().context || this.agGrid().gridOptions?.context;
  }

  get event(): AgGridEvent<TData, TContext> {
    return {
      api: this.agGrid().api,
      context: this.context,
    } as AgGridEvent<TData, TContext>;
  }

  ngAfterContentInit(): void {
    firstValueFrom(this.agGrid().gridReady).then((event) => {
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
