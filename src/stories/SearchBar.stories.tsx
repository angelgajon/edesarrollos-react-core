
import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from '@/components';

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
}
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Primary: Story = {
  args: {
    placeholder: 'Buscar...'
  }
}

