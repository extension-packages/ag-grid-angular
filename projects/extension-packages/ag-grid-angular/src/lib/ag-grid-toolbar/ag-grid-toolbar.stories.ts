import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { AgGridModule } from 'ag-grid-angular';
import {
  AllCommunityModule,
  GridOptions,
  ModuleRegistry,
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
} from 'ag-grid-community';
import { agGridToolbarAction, AgGridToolbarAction } from '../../public-api';
import { gridOptions } from '../../stories/story-helpers/grid-options';
import { AgGridToolbarComponent } from './components/ag-grid-toolbar/ag-grid-toolbar.component';
ModuleRegistry.registerModules([AllCommunityModule]);

const themeMap = {
  alpine: themeAlpine,
  balham: themeBalham,
  material: themeMaterial,
  quartz: themeQuartz,
};

const actions: AgGridToolbarAction[] = [
  {
    clickFn: (params) => {
      const { api } = params.event;
      const data = { id: Number((Math.random() * 1000).toFixed(0)) };
      const transaction = api.applyTransaction({ add: [data], addIndex: 0 });
      api.flashCells({ rowNodes: transaction?.add });
    },
    color: 'seagreen',
    icon: 'add',
    tooltip: 'Add new row',
  },
  {
    clickFn: () => {
      alert('Edit action clicked');
    },
    color: 'dodgerblue',
    disabled: true,
    icon: 'visibility',
    tooltip: 'Edit',
    tooltipDisabled: 'Select a row to edit',
  },
  {
    clickFn: (params) => {
      const { api } = params.event;
      const rows = api.getSelectedRows();
      api.applyTransaction({ remove: rows });
    },
    color: 'crimson',
    disabled: true,
    icon: 'delete',
    tooltip: 'Delete selected row(s)',
    tooltipDisabled: 'Select row(s) to delete',
  },
  {},
  agGridToolbarAction.copySelectedRows,
  agGridToolbarAction.fit,
  agGridToolbarAction.reset,
  agGridToolbarAction.csv,
];

const defaults = {
  actions: [
    agGridToolbarAction.fit,
    agGridToolbarAction.reset,
    agGridToolbarAction.csv,
  ],
  debounceSearch: 500,
  disableSearch: false,
  enableSearch: true,
  placeholderSearch: 'Search..',
};

const meta: Meta<AgGridToolbarComponent> = {
  title: 'Ag Grid Extension',
  component: AgGridToolbarComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="height: 500px;">${story}</div>`,
    ),
    moduleMetadata({
      imports: [AgGridModule],
    }),
  ],
  render: (args) => {
    return {
      props: {
        ...args,
        themeMap,
        gridOptions: {
          ...gridOptions,
          ...(args as any).extraGridOptions,
        },
      },
      template: `
    <ag-grid-toolbar
      [actions]="actions"
      [disableSearch]="disableSearch"
      [debounceSearch]="debounceSearch"
      [enableSearch]="enableSearch"
      [placeholderSearch]="placeholderSearch">
      
      <ag-grid-angular [gridOptions]="gridOptions" [theme]="themeMap[agTheme]"></ag-grid-angular>
    </ag-grid-toolbar>
    `,
    };
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<
  AgGridToolbarComponent & { extraGridOptions?: GridOptions }
>;

export const SearchAndActions: Story = {
  args: {
    ...defaults,
    actions: actions,
  },
};

export const ContentProjections: Story = {
  args: {
    ...defaults,
    actions: [{}, ...actions, {}],
  },
  render: (args) => ({
    props: {
      ...args,
      themeMap,
      gridOptions,
    },
    template: `
    <ag-grid-toolbar
      [actions]="null"
      [disableSearch]="disableSearch"
      [debounceSearch]="debounceSearch"
      [enableSearch]="enableSearch"
      [placeholderSearch]="placeholderSearch">
      <div toolbarLeft>toolbarLeft</div>
      <div toolbarCenter>toolbarCenter</div>
      <div toolbarRight>toolbarRight &nbsp;</div>
      <div actionsLeft>actionsLeft &nbsp;</div>
      <div actionsRight>actionsRight &nbsp;</div>

      <ag-grid-angular [gridOptions]="gridOptions" [theme]="themeMap[agTheme]"></ag-grid-angular>
    </ag-grid-toolbar>
    `,
  }),
};

// export const UpdateActionOnClick: Story = {
//   args: {
//     ...defaults,
//     actions: [
//       {
//         icon: 'radio-button-off',
//         clickFn: (params) => {
//           const { action } = params;
//           if (action.icon === 'radio-button-off') {
//             action.icon = 'radio-button-on';
//             action.color = 'seagreen';
//           } else {
//             action.icon = 'radio-button-off';
//             action.color = '';
//           }
//           action.tooltip = `Action icon changed to ${action.icon}`;
//         },
//       },
//       {},
//       {
//         icon: 'checkbox-unchecked',
//         clickFn: (params) => {
//           const { action } = params;
//           if (action.icon === 'checkbox-unchecked') {
//             action.icon = 'checkbox-checked';
//             action.color = 'seagreen';
//           } else if (action.icon === 'checkbox-checked') {
//             action.icon = 'checkbox-indeterminate';
//             action.color = 'orange';
//           } else {
//             action.icon = 'checkbox-unchecked';
//             action.color = '';
//           }
//           action.tooltip = `Action icon changed to ${action.icon}`;
//         },
//       },
//     ],
//     extraGridOptions: {
//       onFirstDataRendered: (params) => {
//         params.api.getDisplayedRowAtIndex(0)?.setSelected(true);
//       },
//     },
//   },
// };
