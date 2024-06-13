import { Component, Input } from '@angular/core';

@Component({
  selector: 'ag-grid-toolbar-action',
  templateUrl: './ag-grid-toolbar-action.component.html',
  styleUrls: ['./ag-grid-toolbar-action.component.scss'],
})
export class AgGridToolbarActionComponent {
  @Input() color?: string;
  @Input() disabled?: boolean;
  /** A font class for the icon. Default: `ag-icon`.
   *
   * The font needs to be included in your html and css.
   *
   * **Example font setup:**
   * - https://developers.google.com/fonts/docs/material_icons#icon_font_for_the_web */
  @Input() iconFont = 'ag-icon';
  /** ID for toolbar action, used to set html id */
  @Input() id?: string;
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
  @Input() icon?: string;
  @Input() tooltip?: string;
}
