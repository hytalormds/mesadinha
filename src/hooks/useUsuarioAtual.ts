import React from "react";

import type { Usuario } from "@/types/navigation";
import { getCurrentUser } from "@/services/mesadinha/session.service";

export function useUsuarioAtual() {
    const [usuario, setUsuario] = React.useState<Usuario | null>(() =>
        getCurrentUser(),
    );

    function recarregarUsuario() {
        setUsuario(getCurrentUser());
    }

    const usuarioEhPai = usuario?.id_tipo === 1 || usuario?.papel === "responsavel";

    const usuarioEhFilho = usuario?.id_tipo === 2 || usuario?.papel === "crianca";

    return {
        usuario,
        setUsuario,
        recarregarUsuario,
        usuarioEhPai,
        usuarioEhFilho,
    };
}