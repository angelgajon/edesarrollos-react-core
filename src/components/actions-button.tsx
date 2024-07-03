import { DeleteOutlined, EditOutlined, FileExcelOutlined, FilePdfOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import React from "react";

interface ActionsButtonProps {
  menuItems?: MenuItemType[],
  onEditar?: () => void,
  onEliminar?: () => void,
  onPdf?: () => void,
  onExcel?: () => void
}
export function ActionsButton({ menuItems, onEditar, onEliminar, onPdf, onExcel }: ActionsButtonProps) {
  const items = React.useMemo(() => {
    const _items: MenuItemType[] = [];

    if (onEditar) {
      _items.push({
        key: "editar",
        label: "Editar",
        icon: <EditOutlined />,
        onClick: () => {
          onEditar();
        }
      })
    }

    if (menuItems) {
      _items.push(...menuItems)
    }

    if (onPdf) {
      _items.push({
        key: "pdf",
        label: "Imprimir Pdf",
        icon: <FilePdfOutlined style={{ color: "#e61b23" }} />,
        onClick: () => {
          onPdf();
        }
      })
    }

    if (onExcel) {
      _items.push({
        key: "excel",
        label: "Imprimir Excel",
        icon: <FileExcelOutlined style={{ color: "#1d6d43" }} />,
        onClick: () => {
          onExcel();
        }
      })
    }

    if (onEliminar) {
      _items.push({
        key: "eliminar",
        label: "Eliminar",
        icon: <DeleteOutlined />,
        style: { color: "#ff4d4f" },
        onClick: () => {
          onEliminar();
        },
      })
    }

    return _items
  }, [onEditar, onPdf, onExcel, onEliminar, menuItems]);
  return (
    <Dropdown menu={{ items }}>
      <Button icon={<MoreOutlined />} size="large"></Button>
    </Dropdown>
  )
}