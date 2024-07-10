import { queryOptions } from "@tanstack/react-query";
import { HttpService, IRequestParams } from "../constants";
import { GetResponse, PostResponse } from "../types/responses";

export const getModelsQueryOptions = ({ url, params, key }: { url: string, params: IRequestParams, key?: string }) => {
  return queryOptions({
    queryKey: [key || url, { buscar: "", ...params }],
    queryFn: () => getModels(url, params),
    refetchOnMount: true
  })
}

export const getModelQueryOptions = <T = any>({ url, params, id, key }: { url: string, params: IRequestParams, id?: number | string, key?: string }) => {
  return queryOptions({
    queryKey: [key || url, { id }],
    queryFn: () => getModel<T>({ url, id, params }),
    enabled: !!id,
    refetchOnMount: true
  })
}

export async function getModels(url: string, params: any = {}) {
  const response = await HttpService.get(url, params);
  return response as GetResponse<any>;
}

export async function getModel<T>({ url, id, params }: { url: string, params: any, id?: number | string }) {
  const response = await HttpService.get(url, { id: id, ...params });
  return response as GetResponse<T[]>;
}

export async function postModel<T>(url: string, body: T, onSuccess?: () => void) {
  const response = await HttpService.post(url, body);
  if (onSuccess && !response.isError && response.status === 200) {
    onSuccess();
  }
  return response as PostResponse<T>;
}