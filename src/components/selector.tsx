import { getModelsQueryOptions } from "@/lib/api/generic.api";
import { IRequestParams } from "@/lib/constants";
import { ListStateType } from "@/lib/types/propTypes.interface";
import { useQuery } from "@tanstack/react-query";
import { Empty, Select, Tooltip } from "antd";
import { LabelInValueType } from "rc-select/lib/Select";
import React, { useCallback } from "react";

export type SelectorType = {
  url: string,
  params?: IRequestParams,
  queryKey?: string,
  initialValue?: number | string,
  placeholder?: string,
  labelProp?: string,
  valueProp?: string,
  extraParams?: any,
  disabled?: boolean,
  blacklist?: ListStateType[],
  blackListIdProp?: string,
  style?: React.CSSProperties,
  popupMatchSelectWidth?: boolean,
  allowClear?: boolean,
  render?: (option: any) => React.ReactNode;
  onChange?: (value: any) => void
  onSelect?: (data: any, value?: string | number) => void
};
export function Selector({ url, queryKey, placeholder, initialValue, allowClear = true, labelProp = "nombre", valueProp = "id", blacklist = [], blackListIdProp, disabled = false, params = {}, popupMatchSelectWidth = true, style = {}, extraParams, render, onChange, onSelect, ...props }: SelectorType) {
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = React.useState("");
  const [requestParams, setRequestParams] = React.useState<IRequestParams>(params);
  const [options, setOptions] = React.useState([]);

  const query = useQuery(getModelsQueryOptions({ url: url, params: { ...requestParams, ...extraParams }, key: queryKey }));

  const updateParams = useCallback((value: string) => {
    setRequestParams((prev: IRequestParams) => ({ ...prev, buscar: value }));
  }, []);

  function getDataByValue(value?: string | number) {
    const _data = query.data?.resultado?.find((item: any): any => (item[valueProp] === value));
    return _data;
  }

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    }
  }, [searchValue]);

  React.useEffect(() => {
    updateParams(debouncedSearchValue)
  }, [debouncedSearchValue, updateParams]);

  React.useEffect(() => {
    const _opciones = query.data?.resultado?.map((item: any): LabelInValueType => ({ key: item[valueProp], value: item[valueProp], label: item[labelProp] }));
    setOptions(_opciones);
  }, [query.data, valueProp, labelProp, initialValue]);

  return (
    <>
      <Select
        {...props}
        popupMatchSelectWidth={popupMatchSelectWidth}
        disabled={disabled}
        showSearch
        defaultValue={initialValue}
        onSearch={(value) => {
          setSearchValue(value);
        }}
        defaultActiveFirstOption={false}
        filterOption={false}
        notFoundContent={<Empty description="No se encontraron resultados" />}
        allowClear={allowClear}
        loading={query.isLoading}
        onClear={() => {
          setRequestParams((prev: IRequestParams) => ({ ...prev, buscar: "" }));
        }}
        options={
          blacklist?.length > 0 ?
            (options?.filter((item: any) => {
              return (!blacklist.find((blacklistItem: ListStateType<any>) => blacklistItem?.value?.[blackListIdProp || valueProp] === item.value) || item.value === initialValue)
            })) : options
        }
        onSelect={(value) => {
          const selectedOption = options?.find((item: any) => {
            return item.value === value;
          }) as LabelInValueType | undefined;

          if (onSelect && selectedOption) {
            const _data = getDataByValue(value);
            onSelect(_data, value);
          }
        }}
        style={style || { width: "100%" }}
        placeholder={placeholder}
        onChange={(value) => {
          if (onChange) {
            onChange(value);
          }
        }}

        labelRender={(option) => {
          // if (render) {
          //   const _data = getDataByValue(option?.value);
          //   return render(_data);
          // }
          return <Tooltip title={option?.label}>{option?.label}</Tooltip>;
        }}
        optionRender={(option) => {
          if (render) {
            const _data = getDataByValue(option?.value);
            return render(_data);
          }
          return option?.label;
        }}
      />
    </>
  )

}