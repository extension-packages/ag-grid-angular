import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  args: { agTheme: 'ag-theme-alpine' },
  argTypes: {
    agTheme: {
      control: { type: 'radio' },
      options: [
        'ag-theme-alpine',
        'ag-theme-balham',
        'ag-theme-material',
        'ag-theme-quartz',
      ],
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
