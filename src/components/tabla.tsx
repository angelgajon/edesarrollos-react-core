import { DEFAULT_PAGINACION, IRequestParams } from "@/constants";
import { useSortColumns } from "@/hooks/useSortColumns";
import { TPaginacion } from "@/types";

import { Table, TablePaginationConfig } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";

export function Tabla({ columns, data, setRequestParams, paginacion = DEFAULT_PAGINACION, isLoading = false, order = 'id-desc' }: { columns: ColumnsType<any>, paginacion?: TPaginacion, data: any, setRequestParams: React.Dispatch<React.SetStateAction<IRequestParams>>, isLoading: boolean, order?: string }) {
  const { sortValue, sortedColumns } = useSortColumns({ columnsData: columns, order: order });
  const paginationConfig = React.useMemo<TablePaginationConfig>(() => ({
    total: paginacion.total,
    current: paginacion.pagina,
    pageSize: paginacion.limite,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20],
    onChange(current, pageSize) {
      setRequestParams((prev: IRequestParams) => ({ ...prev, pagina: current, limite: pageSize }))
    }
  } as TablePaginationConfig), [paginacion, setRequestParams]);

  React.useEffect(() => {
    setRequestParams((prev: IRequestParams) => ({ ...prev, pagina: 1, ordenar: sortValue }))
  }, [sortValue, setRequestParams])

  return (
    <Table
      columns={sortedColumns}
      dataSource={data?.map((item: any) => ({ ...item, key: item.id }))}
      pagination={paginationConfig}
      loading={isLoading}
      scroll={{ x: scrollX }}
      size="small"
    />
  )
}