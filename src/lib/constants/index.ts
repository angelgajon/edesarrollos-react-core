import { GetResponse, PostResponse, TPaginacion } from "../types/responses";
import imagenNoDisponible from '@/assets/imagen-no-disponible.png'

export const IMAGEN_NO_DISPONIBLE = imagenNoDisponible;
export const API_URL = import.meta.env.VITE_API_URL;
export const IS_DEV = import.meta.env.VITE_IS_DEV === 'true';
export const SHOW_DEVTOOLS = import.meta.env.VITE_SHOW_DEVTOOLS === 'true';
export const VERSION = import.meta.env.VITE_VERSION;

export const getDefaultHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }
};

export const getFileHeaders = () => {
  return {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }
};

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

interface IHttpService {
  get: <t>(endpoint: string, params?: any) => Promise<GetResponse<t>>;
  getBlob: (endpoint: string, data: any) => Promise<Blob>;
  downloadBlob: (endpoint: string, data: any, fileName: string) => Promise<void>;
  post: <t>(endpoint: string, body: any) => Promise<PostResponse<t>>;
  postFormData: (endpoint: string, data: any) => Promise<PostResponse<any>>;
  delete: (endpoint: string, body: { id?: number | string } & IRequestParams) => Promise<PostResponse<any>>;
  put: (endpoint: string, body: any) => Promise<any>;
}

export const HttpService: IHttpService = {
  get: async <t>(endpoint: string, params: any = DEFAULT_REQUEST_PARAMS) => {
    const stringParams = params ? paramsToQuery(params) : "";
    const queryParams = new URLSearchParams(stringParams).toString();

    let url = `${API_URL}${endpoint}`
    if (queryParams) {
      url = `${API_URL}${endpoint}?${queryParams}`
    }

    const _response = await fetch(url, {
      method: "GET",
      headers: getDefaultHeaders(),

    });

    const response = await _response.json() as GetResponse<t>;

    return {
      ...response,
      isError: response?.status !== 200 ? true : false,
      status: response?.status,
      resultado: response?.resultado || response,
    } as GetResponse<t>
  },
  getBlob: async (endpoint: string, data: any) => {
    const _response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data),
    });
    const response = await _response.blob();
    return response
  },
  downloadBlob: async (endpoint: string, data: any, fileName: string = 'fileName') => {
    const _response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data),
    });
    const blob = await _response.blob();

    const urlBlob = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(urlBlob);
    link.remove();
  },
  post: async <t>(endpoint: string, body: any) => {
    const _response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(body),
    });
    const status = _response.status;
    const response = await _response.json() as PostResponse<t>;
    console.log("RESPONSE: ", response);

    return {
      ...response,
      isError: status !== 200 ? true : false,
      status: status
    } as PostResponse<t>
  },
  postFormData: async (endpoint: string, data: any) => {
    const _response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: getFileHeaders(),
      body: data,
    });

    const response = await _response.json;

    return {
      ...response,
      isError: _response?.status !== 200 ? true : false,
      status: _response?.status
    } as PostResponse<any>
  },
  delete: async (endpoint: string, body: { id?: number | string } & IRequestParams) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      body: JSON.stringify(body),
      method: "DELETE",
      headers: getDefaultHeaders(),
    });

    const status = response.status;
    const responseJson = await response.json();
    return {
      ...responseJson,
      isError: status !== 200 ? true : false,
      status: status
    } as PostResponse<any>
  },
  put: async (endpoint: string, body: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: getDefaultHeaders(),
      body: JSON.stringify(body),
    });
    return response.json();
  },
};

export const paramsToQuery = (params: any) =>
  Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");

export interface IRequest {
  req: string;
  endpoint: string;
  params: any;
  body: any;
}
export const emptyRequest = () => ({
  req: '',
  endpoint: '',
  params: null,
  body: null,
}) as IRequest;

export const getRequest = (endpoint: string, params: any = {}) => ({
  req: "GET",
  endpoint,
  params,
  body: null,
}) as IRequest;

export const postRequest = <T>(endpoint: string, body: T, params: any = {}) => ({
  req: "POST",
  endpoint,
  params,
  body,
}) as IRequest;

export const deleteRequest = (endpoint: string, params: any = {}) => ({
  req: "DELETE",
  endpoint: `${endpoint}/eliminar`,
  body: {
    ...params,
  },
}) as IRequest;

export const REGEX = {
  TELEFONO: new RegExp(/^[0-9]{10,10}$/),
  CORREO: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
  MAYUSCULAS: new RegExp(/[A-Z]/),
  MINUSCULAS: new RegExp(/[a-z]/),
  NUMEROS: new RegExp(/[0-9]/),
  CARACTERES_ESPECIALES: new RegExp(/[!@#$%^&*_\-+=?]/),
  BASE_64_IMG: new RegExp(/^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/]+={0,2}$/)
};

