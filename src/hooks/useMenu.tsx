import React from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { BreadcrumbItemType } from "antd/lib/breadcrumb/Breadcrumb";
import { BookOutlined, FileDoneOutlined, HomeOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { BriefcaseBusiness, ReceiptText, ShoppingBasket, Store, Truck } from "lucide-react"
import { ItemType } from "antd/lib/menu/hooks/useItems";

interface MenuContextType {
  menuItems: ItemType[]
  breadcrumbs: BreadcrumbItemType[]
  activeMenu: ItemType<any> | undefined,
  activeKeys: string[],
  getMenuItemByKey: (key: string, items: ItemType<any>[]) => ItemType<any> | undefined;
}

const MenuContext = React.createContext<MenuContextType>({
  menuItems: [],
  breadcrumbs: [],
  activeMenu: undefined,
  activeKeys: [],
  getMenuItemByKey: () => {
    return undefined;
  }
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItemType[]>([]);
  const { location } = useRouterState();

  const [activeMenu, setActiveMenu] = React.useState<ItemType<any> | undefined>(undefined);
  const [activeKeys, setActiveKeys] = React.useState<string[]>([]);

  /**
   * Elementos del menú, usado para el menú lateral
   * construir breadcrumbs, o los menús reactivos.
   */
  const menuItems = React.useMemo(() => {
    return [
      {
        key: "/",
        label: "Inicio",
        icon: <HomeOutlined />,
        onClick: () => {
          navigate({ to: '/' });
        }
      },
      {
        key: "/cotizaciones",
        label: "Cotizaciones",
        icon: <FileDoneOutlined />,
        onClick: () => {
          navigate({ to: '/cotizaciones' });
        }
      },
      {
        key: "/facturaciones",
        label: "Facturaciones",
        icon: <BookOutlined />,
        onClick: () => {
          navigate({ to: '/facturaciones' });
        }
      },
      {
        key: "/compras",
        label: "Compras",
        icon: <ShoppingCartOutlined />,
        onClick: () => {
          navigate({ to: '/compras' });
        }
      },
      {
        key: "/polizas",
        label: "Pólizas",
        icon: <ReceiptText size={16} />,
        onClick: () => {
          navigate({ to: '/polizas' });
        }
      },
      {
        key: "/administracion",
        label: "Administración",
        icon: <SettingOutlined />,
        children: [
          {
            key: "/administracion/usuarios",
            label: "Usuarios",
            icon: <UserOutlined />,
            onClick: () => {
              navigate({ to: '/administracion/usuarios' });
            }
          },
          {
            key: "/administracion/clientes",
            label: "Clientes",
            icon: <BriefcaseBusiness size={16} />,
            onClick: () => {
              navigate({ to: '/administracion/clientes' });
            }
          },
          {
            key: "/administracion/empresas",
            label: "Empresas",
            icon: <Store size={16} />,
            onClick: () => {
              navigate({ to: '/administracion/empresas' });
            }
          },
          {
            key: "/administracion/productos",
            label: "Productos",
            icon: <ShoppingBasket size={16} />,
            onClick: () => {
              navigate({ to: '/administracion/productos' });
            }
          },
          {
            key: "/administracion/proveedores",
            label: "Proveedores",
            icon: <Truck size={16} />,
            onClick: () => {
              navigate({ to: '/administracion/proveedores' })
            }
          },

        ]
      }
    ] as ItemType<any>[]
  }, [navigate]);

  /**
   * Función para obtener un item en base a su llave
   */
  const getMenuItemByKey = React.useCallback((key: string, items: ItemType<any>[]): ItemType<any> | undefined => {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const found = getMenuItemByKey(key, item.children);
        if (found) {
          return found;
        }
      }
    }
  }, []);

  /**
   * Se encarga de mappear el breadcrumbs en base a la url
   */
  React.useEffect(() => {
    const routeArray = location.pathname.split('/').filter((item: string) => (item !== '' && !item.includes('detalle')));
    const _breadCrumbs = routeArray.map((item, index) => {
      let _key = ''

      for (let i = 0; i <= index; i++) {
        _key = `${_key}/${routeArray[i]}`
      }

      const _menuItem = getMenuItemByKey(_key, menuItems);

      return {
        title: <div className="flex gap-2 items-center cursor-pointer">{_menuItem?.icon} {item}</div>,
        onClick: () => {
          navigate({ to: _menuItem?.key });
        }
      } as BreadcrumbItemType
    })

    _breadCrumbs.unshift({
      title: <div className="flex gap-2 items-center cursor-pointer"><HomeOutlined /> Inicio</div>,
      onClick: () => {
        navigate({ to: '/' });
      }
    })

    setBreadcrumbs(_breadCrumbs);

  }, [location, navigate, getMenuItemByKey, menuItems]);

  /**
   * Se encarga de buscar el menu activo en base a la url
   */
  React.useEffect(() => {
    const _activeMenu = getMenuItemByKey(location.pathname, menuItems);

    setActiveMenu(_activeMenu);
  }, [getMenuItemByKey, location.pathname, menuItems, setActiveMenu]);

  /**
   * Se encarga de llenar un arreglo con las llaves activas
   * en base a la url, para activar los elementos del menu lateral
   */
  React.useEffect(() => {
    const urlKeys = location.pathname.split('/').filter(item => item !== '');
    const _activeKeys: string[] = [];

    for (let i = 0; i < urlKeys.length; i++) {
      if (i === 0) {
        _activeKeys.push(`/${urlKeys[i]}`);
      } else {
        _activeKeys.push(`/${urlKeys[i - 1]}/${urlKeys[i]}`);
      }
    }

    setActiveKeys(_activeKeys);
  }, [activeMenu, location.pathname, setActiveKeys]);

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        breadcrumbs,
        activeMenu,
        activeKeys,
        getMenuItemByKey
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  if (!MenuContext) {
    throw new Error("useMenu must be used within an SidebarProvider")
  }
  return React.useContext(MenuContext)
}