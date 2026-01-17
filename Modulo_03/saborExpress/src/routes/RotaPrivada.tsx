import { Navigate } from "react-router-dom";
import { useUsuario } from "../hooks/useUsuario";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function RotaPrivada({ children }: Props) {
    const { usuario } = useUsuario();

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}