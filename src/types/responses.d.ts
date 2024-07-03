export type TPaginacion = {
  limite: number;
  total: number;
  pagina: number;
};

export type DefaultResponse<T = any> = {
  detalle: T;
}

export type GetResponse<T = any> = {
  isError: boolean;
  status: number;
  resultado: T | null;
  paginacion: TPaginacion | null;
  mensaje: string | null;
}

export type PostResponse<T = any> = {
  isError: boolean;
  status: number;
  errores: any | null;
  detalle: T | null;
  mensaje: string | null;
  response: any | null;
}