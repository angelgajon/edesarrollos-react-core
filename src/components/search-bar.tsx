import { IRequestParams } from "@/constants";
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import React, { useCallback } from "react";

export function SearchBar({ placeholder, setRequestParams }: { placeholder: string, setRequestParams: React.Dispatch<React.SetStateAction<IRequestParams>> }) {
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = React.useState("");

  const updateParams = useCallback((value: string) => {
    setRequestParams((prev: IRequestParams) => ({ ...prev, buscar: value }));
  }, [setRequestParams]);


  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    }
  }, [searchValue]);

  React.useEffect(() => {
    if (debouncedSearchValue) {
      updateParams(debouncedSearchValue)
    }
  }, [debouncedSearchValue, updateParams]);

  return (
    <div className="w-full flex flex-wrap gap-2 py-2">
      <div className="flex">
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          allowClear={false}
          style={{ borderRadius: "4px 0 0 4px" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateParams(searchValue);
            }
          }}
        />
        <Tooltip title="Buscar">
          <Button icon={<SearchOutlined />} type="primary" style={{
            borderRadius: "0 4px 4px 0",
            padding: "0 1rem",
          }} />
        </Tooltip>

      </div>
      <div>
        <Tooltip title="Limpiar búsqueda">
          <Button icon={<ClearOutlined />} style={{ padding: "0 1rem" }} onClick={() => {
            setSearchValue("");
            updateParams("");
          }} />
        </Tooltip>
      </div>
    </div>
  )
}