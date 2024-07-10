import type { Meta, StoryObj } from '@storybook/react';

import '../css/tailwind.css';
import { TarjetaNavegacion } from '../components';
import { AlertOutlined } from '@ant-design/icons';

const meta: Meta<typeof TarjetaNavegacion> = {
  component: TarjetaNavegacion,
}
export default meta;

type Story = StoryObj<typeof TarjetaNavegacion>;

export const Primary: Story = {
  args: {
    titulo: 'Ejemplo de Tarjeta',
    icon: <AlertOutlined />
  }
}

