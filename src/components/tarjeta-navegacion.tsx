import { Button, Typography } from "antd";
import React from "react";

export type TarjetaNavegacionProps = { 
  titulo?: string, 
  descripcion?: React.ReactNode, 
  icon?: React.ReactNode, 
  onClick?: () => void 
};
export function TarjetaNavegacion({ titulo, descripcion, icon, onClick }: TarjetaNavegacionProps) {

  const clonedIcon = icon ? React.cloneElement(icon as React.ReactElement, { size: 72 }) : null;

  return (
    <div className="flex flex-col gap-2 w-full min-h-[200px] overflow-hidden cursor-pointer shadow-sm hover:shadow-md backdrop-blur-md group"
      onClick={onClick}
    >
      <div className="h-full w-full border border-gray-200 flex flex-col justify-between transition-all px-3 py-2 ">
        <div className="flex flex-col gap-2">
          {clonedIcon &&
            <div className="relative transition-all w-full opacity-25 flex justify-center group-hover:text-primary group-hover:opacity-100 text-[72px]">
              {clonedIcon}
            </div>}
          <Typography.Text className=" text-2xl font-bold text-center group-hover:text-primary">
            {titulo || 'Sin titulo'}
          </Typography.Text>
          {descripcion && (
            <Typography.Text className="text-lg text-center">
              {descripcion}
            </Typography.Text>
          )}
        </div>
        <div className="transition-all w-auto duration-500 ease-in-out opacity-0 group-hover:opacity-100">
          <Button type="link" size="large" className="w-full">Acceder</Button>
        </div>
      </div>
    </div>

  )
}