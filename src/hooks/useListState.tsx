import { ListStateType } from "@/lib/types/propTypes.interface";
import { App } from "antd";
import React, { useEffect } from "react";

export function useListState<T>(initialList?: T[]) {
  const { notification } = App.useApp();
  const [listState, setListState] = React.useState<ListStateType<T>[]>([]);
  const [list, setList] = React.useState<T[]>([]);
  const [wasInitialized, setWasInitialized] = React.useState<boolean>(false);

  /**
   * 
   * @param value Valor del elemento de la lista
   * @param isEditing Valor inicial de la bandera de edición
   */
  function agregar(value?: T, isEditing?: boolean) {
    const index = listState?.length
    if (!value) {
      notification.warning({
        message: 'Atención',
        description: 'No se puede agregar un elemento vacío'
      })
      return;
    }
    setListState([
      ...listState,
      {
        index: index,
        value: value,
        isEditing: isEditing || false
      } as ListStateType<T>
    ]);
  }
  function eliminar(index: number) {
    setListState(listState.filter((item) => item.index !== index).map((item, index) => ({ ...item, index } as ListStateType<T>)));
  }

  /**
   * Función para actualizar un elemento de la lista.
   * @param index Índice del elemento a actualizar
   * @param value Valor de la propiedad del elemento actualizado
   * @param prop Llave de la propiedad a actualizar
   */
  function actualizar(index: number, value: any, prop: string) {
    const _list = listState.map((_item) => {
      if (_item.index === index) {
        return {
          ..._item,
          value: {
            ..._item.value,
            [prop]: value
          }
        } as ListStateType<T>
      } else {
        return _item
      }
    })

    setListState(_list);
  }

  /**
   * Función para activar o desactivar la propiedad "isEditing" de un elemento de la lista.
   * @param index Índice de la fila
   * @param isEditando Valor de la bandera de edición, undefined usar el valor opuesto al actual
   */
  function setEditandoFila(index: number, isEditando?: boolean) {
    const _list = listState.map((_item) => {
      if (_item.index === index) {
        return {
          ..._item,
          isEditing: isEditando ?? !_item.isEditing
        } as ListStateType<T>
      } else {
        return _item
      }
    })

    setListState(_list);
  }

  useEffect(() => {
    setList(listState.map((item) => item.value as T));
  }, [listState]);

  useEffect(() => {
    if (listState.length === 0 && initialList && !wasInitialized) {
      setListState(initialList.map((item, index) => ({
        value: item,
        index: index,
        isEditing: false
      } as ListStateType<T>)));
      setWasInitialized(true);
    }
  }, [initialList, listState, wasInitialized]);

  return { list, listState, agregar, eliminar, actualizar, setEditandoFila };
}