import React from "react"

interface LayoutContextType {
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  headTitle: string
  setHeadTitle: React.Dispatch<React.SetStateAction<string>>
  titulo: string
  setTitulo: React.Dispatch<React.SetStateAction<string>>
  baseRoute: string | undefined
  setBaseRoute: React.Dispatch<React.SetStateAction<string | undefined>>
}

const LayoutContext = React.createContext<LayoutContextType>({
  showSidebar: false,
  setShowSidebar: () => { },
  headTitle: '',
  setHeadTitle: () => { },
  titulo: '',
  setTitulo: () => { },
  baseRoute: undefined,
  setBaseRoute: () => { }
})

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = React.useState(false)
  const [titulo, setTitulo] = React.useState('')
  const [headTitle, setHeadTitle] = React.useState('');
  const [baseRoute, setBaseRoute] = React.useState<string | undefined>(undefined);

  return (
    <LayoutContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        titulo,
        setTitulo,
        headTitle,
        setHeadTitle,
        baseRoute,
        setBaseRoute
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  if (!LayoutContext) {
    throw new Error("useLayout must be used within an LayoutProvider")
  }
  return React.useContext(LayoutContext)
}