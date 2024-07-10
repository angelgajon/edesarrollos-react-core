import type { Meta, StoryObj } from '@storybook/react';

import '../css/tailwind.css';
import { TarjetaNavegacion } from '../components';
import { AlertOutlined } from '@ant-design/icons';

const meta: Meta<typeof TarjetaNavegacion> = {
  component: TarjetaNavegacion,
}
export default meta;

type Story = StoryObj<typeof TarjetaNavegacion>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story args={{
          titulo: 'Ejemplo de Tarjeta',
          icon: <AlertOutlined />,
          descripcion: 'Ejemplo de descripción',
        }} />
      </div>
    )
  ]
}

