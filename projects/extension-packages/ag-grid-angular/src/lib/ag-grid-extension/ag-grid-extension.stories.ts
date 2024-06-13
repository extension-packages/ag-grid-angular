import { GridOptions } from 'ag-grid-community';
import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { AgGridModule } from 'ag-grid-angular';
import {
  AgGridExtensionModule,
  AgGridExtensionComponent,
  AgGridToolbarAction,
  actionsSets,
} from '../../public-api';
import { gridOptions } from '../../stories/story-helpers/grid-options';

const actions: AgGridToolbarAction[] = [
  {
    clickFn: (params) => {
      const { api } = params.event;
      const data = { id: Number((Math.random() * 1000).toFixed(0)) };
      const transaction = api.applyTransaction({ add: [data], addIndex: 0 });
      api.flashCells({ rowNodes: transaction?.add });
    },
    color: 'seagreen',
    icon: 'plus',
    tooltip: 'Add new row',
  },
  {
    clickFn: () => {
      alert('Edit action clicked');
    },
    color: 'dodgerblue',
    disabled: true,
    icon: 'eye',
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
    icon: 'cancel',
    tooltip: 'Delete selected row(s)',
    tooltipDisabled: 'Select row(s) to delete',
  },
  {},
  ...actionsSets.standard,
];

const defaults = {
  actions: actionsSets.standard,
  debounceSearch: 500,
  disableSearch: false,
  enableSearch: true,
  placeholderSearch: 'Search..',
};

const meta: Meta<AgGridExtensionComponent> = {
  title: 'Ag Grid Extension',
  component: AgGridExtensionComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="height: 500px;">${story}</div>`,
    ),
    moduleMetadata({
      imports: [AgGridModule, AgGridExtensionModule],
    }),
  ],
  render: (args) => {
    return {
      props: {
        ...args,
        gridOptions: {
          ...gridOptions,
          ...(args as any).extraGridOptions,
        },
      },
      template: `
    <ag-grid-extension
      [class]="agTheme"
      [actions]="actions"
      [disableSearch]="disableSearch"
      [debounceSearch]="debounceSearch"
      [enableSearch]="enableSearch"
      [placeholderSearch]="placeholderSearch">
      
      <ag-grid-angular [gridOptions]="gridOptions"></ag-grid-angular>
    </ag-grid-extension>
    `,
    };
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<
  AgGridExtensionComponent & { extraGridOptions?: GridOptions }
>;

export const SeachAndActions: Story = {
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
      gridOptions,
    },
    template: `
    <ag-grid-extension
      [class]="agTheme"
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

      <ag-grid-angular [gridOptions]="gridOptions"></ag-grid-angular>
    </ag-grid-extension>
    `,
  }),
};

export const UpdateActionOnClick: Story = {
  args: {
    ...defaults,
    actions: [
      {
        icon: 'radio-button-off',
        clickFn: (params) => {
          const { action } = params;
          if (action.icon === 'radio-button-off') {
            action.icon = 'radio-button-on';
            action.color = 'seagreen';
          } else {
            action.icon = 'radio-button-off';
            action.color = '';
          }
          action.tooltip = `Action icon changed to ${action.icon}`;
        },
      },
      {},
      {
        icon: 'checkbox-unchecked',
        clickFn: (params) => {
          const { action } = params;
          if (action.icon === 'checkbox-unchecked') {
            action.icon = 'checkbox-checked';
            action.color = 'seagreen';
          } else if (action.icon === 'checkbox-checked') {
            action.icon = 'checkbox-indeterminate';
            action.color = 'orange';
          } else {
            action.icon = 'checkbox-unchecked';
            action.color = '';
          }
          action.tooltip = `Action icon changed to ${action.icon}`;
        },
      },
    ],
    extraGridOptions: {
      onFirstDataRendered: (params) => {
        params.api.getDisplayedRowAtIndex(0)?.setSelected(true);
      },
    },
  },
};
