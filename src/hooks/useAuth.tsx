import ENDPOINTS from "@/lib/api/endpoints";
import { HttpService } from "@/lib/constants";
import { DefaultResponse } from "@/lib/types/responses";
import { IUsuario } from "@/lib/types/usuario.interface";
import { ILoginForm } from "@/routes/-pages/home/login-form";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { App } from "antd";
import React, { useCallback } from "react";

interface AuthContextType {
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  user: IUsuario | undefined;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  iniciarSesion: (
    values: ILoginForm
  ) => Promise<DefaultResponse | undefined>;
  cerrarSesion: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  token: undefined,
  setToken: () => { },
  user: undefined,
  isAuthenticated: false,
  setUser: () => { },
  iniciarSesion: async () => {
    return undefined;
  },
  cerrarSesion: () => { },
});
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { modal } = App.useApp();
  const [token, setToken] = React.useState<string | undefined>(undefined);
  const [user, setUser] = React.useState<IUsuario | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const navigate = useNavigate();

  const iniciarSesion = useCallback(async (
    values: ILoginForm
  ): Promise<DefaultResponse | undefined> => {
    const r = (await HttpService.post(
      ENDPOINTS.INICIAR_SESION,
      values
    )) as DefaultResponse<IUsuario>;

    const usuario = r.detalle;

    if (usuario) {
      setToken(usuario.token);
      setUser(usuario);
      return r;
    }

    return undefined;
  }, []);

  const cerrarSesion = useCallback(() => {
    modal.confirm({
      title: "Atención",
      icon: <ExclamationCircleOutlined />,
      content: "¿Desea cerrar sesión?",
      okButtonProps: {
        danger: true
      },
      okText: "Cerrar Sesión",
      cancelText: "Cancelar",
      onOk() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(undefined);
        setUser(undefined);

        navigate({ to: "/" });
      }
    })
  }, [modal, navigate]);


  React.useEffect(() => {
    const _user = localStorage.getItem("user");
    if (!user && _user) {
      setUser(JSON.parse(_user));
    } else if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    const _token = localStorage.getItem("token");
    if (!token && _token) {
      setToken(_token);
    } else if (token) {
      localStorage.setItem("token", token);
    }

    if (!(user || _user) && !(token || _token)) {
      setIsAuthenticated(false);
      navigate({ to: "/" });
    } else {
      setIsAuthenticated(true);
    }
  }, [user, token, navigate]);

  const value = React.useMemo(() => {
    return {
      token,
      setToken,
      user,
      setUser,
      iniciarSesion,
      cerrarSesion,
      isAuthenticated,
    };
  }, [token, user, isAuthenticated, cerrarSesion, iniciarSesion]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
