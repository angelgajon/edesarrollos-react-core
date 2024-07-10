import { LoadingOutlined } from "@ant-design/icons";

export const loadingIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

export const ESTILOS = {
  INPUT_SOLO_LECTURA: {
    border: 'none',
    cursor: 'pointer',
    background: 'none'
  } as React.CSSProperties,
  INPUT: {
    cursor: 'text'
  }
}