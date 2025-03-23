import { Component, input } from '@angular/core';

@Component({
  selector: 'ag-grid-toolbar-action',
  standalone: true,
  styleUrls: ['./ag-grid-toolbar-action.component.css'],
  template: `
    <span
      class="toolbar-action"
      [class.disabled]="disabled()"
      [id]="id()"
      [class]="iconFont()"
      [style.color]="disabled() ? '' : color()"
      [title]="tooltip()"
    >
      {{ icon() }}<ng-content></ng-content>
    </span>
  `,
})
export class AgGridToolbarActionComponent {
  readonly color = input<string>();
  readonly disabled = input<boolean>();
  /** A font class for the icon. Default: `material-icons`.
   *
   * The font needs to be included in your html and css.
   *
   * **Example font setup:**
   * - https://developers.google.com/fonts/docs/material_icons#icon_font_for_the_web */
  readonly iconFont = input('material-icons');
  /** ID for toolbar action, used to set html id */
  readonly id = input<string>();
  /** Icon name. Example `home`
   *
   *
   * ### Requirements
   *
   * Needs to have a font class included in your html and css.
   *
   * **With Google icons:**
   * ```html
   * <!-- Add this to your html: -->
   * <html>
   *   <head>
   *     <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
   *   </head>
   * <html>
   *
   * And set `iconFont: 'material-icons'`
   * ```
   */
  readonly icon = input<string>();
  readonly tooltip = input<string>();
}
