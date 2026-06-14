import React from "react";

import type { Tarefa, Usuario } from "@/types/navigation";
import type { FiltroStatusTarefa } from "@/componentes/FiltroStatus";
import {
    obterStatusTarefa,
    tarefaPertenceAoFilhoLogado,
} from "@/services/tarefaService";

type Params = {
    tarefas: Tarefa[];
    usuario: Usuario | null;
    filtroInicial?: FiltroStatusTarefa;
};

export function useFiltroTarefas({
    tarefas,
    usuario,
    filtroInicial = "Todas",
}: Params) {
    const [filtroStatus, setFiltroStatus] =
        React.useState<FiltroStatusTarefa>(filtroInicial);

    const usuarioEhPai =
        usuario?.id_tipo === 1 || usuario?.papel === "responsavel";

    const usuarioEhFilho =
        usuario?.id_tipo === 2 || usuario?.papel === "crianca";

    const tarefasPermitidas = React.useMemo(() => {
        if (!usuario) {
            return [];
        }

        if (usuarioEhPai) {
            return tarefas;
        }

        if (usuarioEhFilho) {
            return tarefas.filter((tarefa) =>
                tarefaPertenceAoFilhoLogado(tarefa, usuario),
            );
        }

        return [];
    }, [
        tarefas,
        usuario,
        usuarioEhPai,
        usuarioEhFilho,
    ]);

    const tarefasFiltradas = React.useMemo(() => {
        if (filtroStatus === "Todas") {
            return tarefasPermitidas;
        }

        return tarefasPermitidas.filter((tarefa) => {
            const statusAtual = obterStatusTarefa(tarefa);

            return statusAtual === filtroStatus;
        });
    }, [tarefasPermitidas, filtroStatus]);

    const totalTarefas = tarefasPermitidas.length;
    const totalFiltradas = tarefasFiltradas.length;

    return {
        filtroStatus,
        setFiltroStatus,
        tarefasPermitidas,
        tarefasFiltradas,
        totalTarefas,
        totalFiltradas,
    };
}