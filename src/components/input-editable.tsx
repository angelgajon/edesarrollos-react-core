import { ESTILOS } from "@/constants";
import { Input, InputProps, Tooltip } from "antd";
import React from "react";

export function InputEditable({ value, index, isEditing, showTooltip = false, onSetEditandoFila, ...props }: InputProps & { index: number, isEditing: boolean, showTooltip?: boolean, onSetEditandoFila: (index: number, isEditando?: boolean) => void }) {
  const isEditingStyle = React.useMemo(() => {
    return !isEditing ? ESTILOS.INPUT_SOLO_LECTURA : {}
  }, [isEditing]);

  return (
    <Tooltip title={showTooltip ? value?.toString() : undefined}>
      <Input
        {...props}
        onFocus={() => {
          onSetEditandoFila(index, true)
        }}
        onBlur={() => {
          onSetEditandoFila(index, false)
        }}
        readOnly={!isEditing}
        style={{ width: "100%", ...props.style, ...isEditingStyle }}
        value={value}
      />
    </Tooltip>
  )
}