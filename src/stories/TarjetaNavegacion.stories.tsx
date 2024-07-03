import type { Meta, StoryObj } from '@storybook/react';

import { TarjetaNavegacion } from '../components';

const meta: Meta<typeof TarjetaNavegacion> = {
  component: TarjetaNavegacion,
}
export default meta;

type Story = StoryObj<typeof TarjetaNavegacion>;

export const Primary: Story = {
  args: {
    titulo: 'Ejemplo de Tarjeta',

  }
}

