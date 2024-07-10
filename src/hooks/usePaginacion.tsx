import React from "react"

export interface IPaginacion {
  totalInicial?: number
  paginaInicial?: number
  limiteInicial?: number
}

export const usePaginacion = ({ totalInicial = 0, paginaInicial = 1, limiteInicial = 20 }: IPaginacion) => {
  const [pagina, setPagina] = React.useState(paginaInicial);
  const [total, setTotal] = React.useState(totalInicial);
  const [limite, setLimite] = React.useState(limiteInicial);
  return {
    pagina: pagina,
    total: total,
    limite: limite,
    setPagina,
    setTotal,
    setLimite
  }
}