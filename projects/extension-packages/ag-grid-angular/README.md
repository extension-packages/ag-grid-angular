# @extension-packages/ag-grid-angular

Link to docs: http://extension-packages.github.io/ag-grid-angular

## Ag Grid Extension

Extends ag-grid with a toolbar, search and actions.

![Ag Grid Extension](static/ag-grid-extension.png "Ag Grid Extension")

### Prerequisites

- [Ag Grid Angular](https://www.ag-grid.com/angular-data-grid/getting-started/)

- An icon-font of your choice. Must be included in your html and css.

```html
<!-- Google icon-font: https://developers.google.com/fonts/docs/material_icons -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
```

### Features:

- Quick search
- Toolbar actions
  - Clickable icons
  - Add icon-font of your choice.
    - Default: material-icons
    - Setup: https://developers.google.com/fonts/docs/material_icons
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
  actions: AgGridToolbarAction[];
  gridOptions: GridOptions;
}
```
