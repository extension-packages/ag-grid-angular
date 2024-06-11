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
import Utils from '../../stories/story-helpers/utils';

const actions: AgGridToolbarAction[] = [
  {
    clickFn: (params) => {
      const { api } = params.event;
      const data = { id: Number((Math.random() * 1000).toFixed(0)) };
      const transaction = api.applyTransaction({ add: [data], addIndex: 0 });
      api.flashCells({ rowNodes: transaction?.add });
    },
    color: 'seagreen',
    icon: 'add_circle',
    tooltip: 'Add new row',
  },
  {
    clickFn: () => {
      alert('Edit action clicked');
    },
    color: 'dodgerblue',
    disabled: true,
    icon: 'edit',
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
  ...actionsSets.redoUndo,
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
    actions: actions,
  },
  render: (args) => ({
    props: {
      ...args,
      gridOptions,
    },
    template: `
    <ag-grid-extension
      [class]="agTheme"
      [actions]="actions"
      [disableSearch]="disableSearch"
      [debounceSearch]="debounceSearch"
      [enableSearch]="enableSearch"
      [placeholderSearch]="placeholderSearch">
      <div toolbarLeft>toolbarLeft</div>
      <div toolbarCenter>toolbarCenter</div>
      <div toolbarRight>toolbarRight</div>
      <ag-grid-toolbar-action actionsLeft tooltip="I'm here because of *actionsLeft* content projection">arrow_left</ag-grid-toolbar-action>
      <ag-grid-toolbar-action actionsRight tooltip="I'm here because of *actionsRight* content projection">arrow_right</ag-grid-toolbar-action>

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
        icon: 'home',
        clickFn: (params) => {
          const { action } = params;
          const color = Utils.getRandomColor();
          action.color = color;
          action.tooltip = `Action color changed to ${color}`;
        },
      },
      {
        icon: 'home',
        clickFn: (params) => {
          const { action } = params;
          const color = Utils.getRandomColor();
          action.color = color;
          action.tooltip = `Action color changed to ${color}`;
        },
      },
    ],
  },
};
