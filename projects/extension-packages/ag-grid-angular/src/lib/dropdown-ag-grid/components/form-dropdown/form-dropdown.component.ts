import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  input,
  linkedSignal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { GridOptions, Theme } from 'ag-grid-community';
import { DropdownSelectionChangeEvent } from '../../interfaces/dropdown-selection-change-event';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'ag-dropdown-form-control',
  imports: [DropdownComponent, ReactiveFormsModule],
  template: `
    <ag-dropdown
      [columnHeaderVisible]="columnHeaderVisible()"
      [disabled]="formControl()?.disabled ?? false"
      [displayFields]="displayFields()"
      [gridOptions]="gridOptions()"
      [listSize]="listSize()"
      [theme]="theme()"
      [valueField]="valueField()"
      [selected]="selectedData() || formControl()?.value"
      (selectionChange)="onSelectionChange($event)"
    ></ag-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownFormControlComponent),
      multi: true,
    },
  ],
})
export class DropdownFormControlComponent implements ControlValueAccessor {
  readonly columnHeaderVisible = input(false);
  readonly displayFields = input<string[]>([]);
  readonly formControl = input<FormControl>();
  readonly gridOptions = input<GridOptions>({});
  readonly listSize = input(7);
  readonly selected = input<any>();
  readonly theme = input<Theme>();
  readonly valueField = input('id');
  protected selectedData = linkedSignal(() => this.selected());

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(this.updateFormControl);
  }

  // Writes value from the form control to the component
  writeValue(value: any): void {
    // Since we're using FormControl directly via input,
    // we don't need to manage internal state here
    // The template binding will handle the display
  }

  // Registers callback for when value changes
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  // Registers callback for when control is touched
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Handles disabled state
  setDisabledState(isDisabled: boolean): void {
    // If you need to propagate this to the FormControl
    isDisabled ? this.formControl()?.disable() : this.formControl()?.enable();
  }

  onSelectionChange(event: DropdownSelectionChangeEvent): void {
    const newValue = event.value;
    this.selectedData.set(event.selected);
    this.formControl()?.setValue(event.value);
    this.onChange(newValue); // Notify form of change
    this.onTouched(); // Mark as touched
  }

  private updateFormControl = () => {
    const data = this.selected();
    const value = this.valueField() ? data?.[this.valueField()] || data : data;
    if (value === this.formControl()?.value) return;
    this.formControl()?.setValue(value, { emitEvent: false });
  };
}
