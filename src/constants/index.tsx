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

export interface IRequestParams {
  expand?: string;
  ordenar?: string | 'id-desc' | 'id-asc';
  limite?: number;
  pagina?: number;
  buscar?: string;
}

