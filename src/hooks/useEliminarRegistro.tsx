import { HttpService, IRequestParams } from "@/lib/constants";
import { DeleteOutlined } from "@ant-design/icons";
import { App } from "antd";

export const useEliminarRegistro = () => {
  const {modal, notification} = App.useApp();
  return {
    eliminarRegistro (nombre: string, params: {id?: number | string} & IRequestParams, url: string, alTerminar: () => void) {
      modal.confirm({
        title: "Eliminar",
        content: (
          <>¿Está seguro de eliminar el registro de <strong>{nombre}</strong>?</>
        ),
        icon: <DeleteOutlined style={{ color: '#ff0000' }} />,
        okText: 'Eliminar',
        okButtonProps: {
          type: 'default',
          style: { color: '#FFFFFF', background: '#FF0000' }
        },
        cancelText: 'Cancelar',
        onOk: async () => {
          try {
            const res = await HttpService.delete(url, params);
            if (res && res.status === 200) {
              notification.success({
                message: 'Éxito',
                description: res?.mensaje
              });
              console.log(alTerminar)
              alTerminar && alTerminar();
            }
            else if (res?.status === 400) {
              notification.error({
                message: "Atención",
                description: res?.mensaje,
              });
            }
          } catch (error) {
            console.log(error);
            notification.error({
              message: 'Error',
              description: <>{error}</>,
            });
            return 'error';
          }
        },
      });
    }
  }
};