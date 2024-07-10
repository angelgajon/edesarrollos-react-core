
import type { Meta, StoryObj } from '@storybook/react';

import { ActionsButton } from '@/components';

const meta: Meta<typeof ActionsButton> = {
  component: ActionsButton,
}
export default meta;

type Story = StoryObj<typeof ActionsButton>;

export const Default: Story = {
  args: {
    onEditar: () => {
      alert("Acción de editar!")
    },
    onEliminar: () => {
      alert("Acción de eliminar!")
    },
    onPdf: () => {
      alert("Acción de pdf!")
    },
    onExcel: () => {
      alert("Acción de excel!")
    }
  }
}

