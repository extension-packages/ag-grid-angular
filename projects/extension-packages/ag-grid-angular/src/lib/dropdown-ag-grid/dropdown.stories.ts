import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { AgGridModule } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
} from 'ag-grid-community';
import { DropdownComponent } from './components/dropdown/dropdown.component';
ModuleRegistry.registerModules([AllCommunityModule]);

const themeMap = {
  alpine: themeAlpine,
  balham: themeBalham,
  material: themeMaterial,
  quartz: themeQuartz,
};

const meta: Meta<DropdownComponent> = {
  title: 'Dropdown',
  component: DropdownComponent,
  decorators: [
    componentWrapperDecorator((story) => `<div style="height: 500px;">${story}</div>`),
    moduleMetadata({
      imports: [AgGridModule],
    }),
  ],
  render: (args) => {
    return {
      props: {
        ...args,
        themeMap,
        selectionChange: (event: any) => {
          console.log('selectionChange', event);
        },
      },
      template: `
      <ag-dropdown
        [columnHeaderVisible]="columnHeaderVisible"
        [displayFields]="displayFields"
        [gridOptions]="gridOptions"
        [listSize]="listSize" 
        [selected]="selected"
        [theme]="themeMap[agTheme]"
        [valueField]="valueField" 
        (selectionChange)="selectionChange = $event">
      </ag-dropdown>
      <code>
        <pre>{{ selectionChange | json }}</pre>
      </code>
      `,
    };
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DropdownComponent>;

const columnDefs: ColDef[] = [
  { field: 'id', hide: true, width: 55 },
  { field: 'brand' },
  { field: 'model' },
];
const rowData = [
  { id: 1, brand: 'Toyota', model: 'Camry' },
  { id: 2, brand: 'Honda', model: 'Civic' },
  { id: 3, brand: 'Ford', model: 'Mustang' },
  { id: 4, brand: 'Chevrolet', model: 'Corvette' },
  { id: 5, brand: 'Volkswagen', model: 'Golf' },
  { id: 6, brand: 'Nissan', model: 'Altima' },
  { id: 7, brand: 'Kia', model: 'Sorento' },
  { id: 8, brand: 'Hyundai', model: 'Elantra' },
  { id: 9, brand: 'Subaru', model: 'Outback' },
  { id: 10, brand: 'Audi', model: 'A4' },
  { id: 11, brand: 'BMW', model: 'X5' },
  { id: 12, brand: 'Mercedes', model: 'C-Class' },
  { id: 13, brand: 'Lexus', model: 'LX' },
  { id: 14, brand: 'Tesla', model: 'Model S' },
  { id: 15, brand: 'Tesla', model: 'Model 3' },
  { id: 16, brand: 'Tesla', model: 'Model X' },
  { id: 17, brand: 'Tesla', model: 'Model Y' },
  { id: 18, brand: 'Tesla', model: 'Cybertruck' },
];

export const SingleSelect: Story = {
  args: {
    displayFields: ['brand', 'model'],
    valueField: 'id',
    listSize: 7,
    gridOptions: {
      columnDefs,
      rowSelection: { mode: 'singleRow', enableClickSelection: true, checkboxes: false },
      rowData,
    },
    selected: rowData[5],
  },
};

export const MultiSelect: Story = {
  args: {
    displayFields: ['brand', 'model'],
    gridOptions: {
      columnDefs,
      rowSelection: {
        mode: 'multiRow',
        enableClickSelection: true,
        checkboxes: false,
        headerCheckbox: false,
      },
      rowData,
    },
    listSize: 7,
    selected: [rowData[5], rowData[6]],
    valueField: 'id',
  },
};
