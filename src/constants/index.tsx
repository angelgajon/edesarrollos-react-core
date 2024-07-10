import { TPaginacion } from "@/types";

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

export const DEFAULT_REQUEST_PARAMS: IRequestParams = {
  limite: 10,
  pagina: 1,
  ordenar: 'id-desc',
}

export const DEFAULT_PAGINACION: TPaginacion = {
  total: 0,
  pagina: 1,
  limite: 10,
}

