
import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from '@/components';

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
}
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story args={{ placeholder: 'Buscar...' }} />
      </div>
    )
  ]
}

