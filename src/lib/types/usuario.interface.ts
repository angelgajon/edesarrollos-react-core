export interface IUsuario {
  id: number
  correo: string
  nombre: string
  rol: string
  token: string
}

export enum ROLES_USUARIO {
  ADMIN = 'admin',
  DESARROLLADOR = 'desarrollador',
  USUARIO = 'usuario'
}