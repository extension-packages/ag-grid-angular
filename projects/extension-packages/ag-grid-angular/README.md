# @extension-packages/ag-grid-angular

Link to docs: http://extension-packages.github.io/ag-grid-angular

## Ag Grid Extension

Extends ag-grid with a toolbar, search and actions.

![Ag Grid Extension](static/ag-grid-extension.png "Ag Grid Extension")

### Prerequisites

- [Ag Grid Angular](https://www.ag-grid.com/angular-data-grid/getting-started/)
- (Optional) Add icon-font(s) of your choice. Must be included in your html and css.
  - Default: `ag-icon`
    - https://www.ag-grid.com/angular-data-grid/custom-icons/#provided-icons

```html
<!-- Google icon-font: https://developers.google.com/fonts/docs/material_icons -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
```

### Features:

- Quick search
- Toolbar actions
  - Clickable icons
    - Default: `ag-icon` https://www.ag-grid.com/angular-data-grid/custom-icons/#provided-icons
    - (Optional) Add icon-font(s) of your choice.
      - Google material icons: https://developers.google.com/fonts/docs/material_icons
- Content projections
  - Multi-slot
    - toolbarLeft => Toolbar left
    - toolbarCenter => Toolbar center
    - toolbarRight => Toolbar right
    - actionsLeft => pre actions
    - actionsRight => post actions
  - Single-slot
- Adapts to ag-grid themes

### Usage Overview

```ts
@Component({
  standalone: true,
  selector: "app-demo-grid",
  imports: [AgGridExtensionModule],
  template: `
    <ag-grid-extension class="ag-theme-balham" [actions]="actions">
      <ag-grid-angular [gridOptions]="gridOptions"></ag-grid-angular>
    </ag-grid-extension>
  `,
})
export class DemoGridComponent {
  actions: AgGridToolbarAction = [
    {
      color: "seagreen",
      icon: "plus",
      tooltip: "Add new row",
      clickFn: (event) => {
        const rowData = {...};
        event.api.applyTransaction({ add: [rowData], addIndex: 0 });
      }
    },
    {
      color: "dodgerblue",
      icon: "eye",
      tooltip: "Edit row",
      clickFn: ({ api, context }) => {
        const rowData = api.getSelectedRows()[0];
        // ... some logic
      }
    },
    {}, // seprator
    ...
  ];
  gridOptions: GridOptions;
}
```
