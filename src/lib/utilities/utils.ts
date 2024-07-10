import { paramsToQuery } from "../constants";

// custom functions

export const abrirArchivo = (url: string, params?: any) => {
  const stringParams = params ? paramsToQuery(params) : "";
  const queryParams = new URLSearchParams(stringParams).toString();

  if (url) {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = queryParams ? `${url}?${queryParams}` : url;
    a.click();
  }
}
export function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}
export function obtenerColorBoolean(bool: boolean) {
  return bool ? 'green' : 'red'
}