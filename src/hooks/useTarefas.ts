import React from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import type { StatusTarefa, Tarefa, Usuario } from "@/types/navigation";
import {
    atualizarStatusTarefaApi,
    excluirTarefaApi,
    listarTarefas,
} from "@/services/mesadinha/tarefa.services";
import { creditarTarefa } from "@/services/mesadinha/carteira.services";

type Params = {
    usuario: Usuario | null;
};

export function useTarefas({ usuario }: Params) {
    const [tarefas, setTarefas] = React.useState<Tarefa[]>([]);
    const [carregando, setCarregando] = React.useState(true);

    async function carregarTarefas() {
        if (!usuario) {
            setTarefas([]);
            setCarregando(false);
            return;
        }

        try {
            setCarregando(true);

            const tarefasResponse = await listarTarefas();

            setTarefas(tarefasResponse);
        } catch (error) {
            console.log("Erro ao carregar tarefas:", error);
            Alert.alert("Erro", "Não foi possível carregar as tarefas.");
            setTarefas([]);
        } finally {
            setCarregando(false);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            carregarTarefas();
        }, [usuario?.id_usuario, usuario?.id_tipo, usuario?.papel]),
    );

    async function alterarStatusTarefa(
        id: string,
        novoStatus: StatusTarefa,
    ) {
        try {
            await atualizarStatusTarefaApi(id, novoStatus);

            setTarefas((tarefasAtuais) =>
                tarefasAtuais.map((tarefa) =>
                    tarefa.id === id
                        ? {
                              ...tarefa,
                              status: novoStatus,
                              concluida: novoStatus === "Concluída",
                          }
                        : tarefa,
                ),
            );
        } catch (error) {
            console.log("Erro ao atualizar tarefa:", error);
            Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
        }
    }

    async function excluirTarefa(id: string) {
        try {
            await excluirTarefaApi(id);

            setTarefas((tarefasAtuais) =>
                tarefasAtuais.filter((tarefa) => tarefa.id !== id),
            );
        } catch (error) {
            console.log("Erro ao excluir tarefa:", error);
            Alert.alert("Erro", "Não foi possível excluir a tarefa.");
        }
    }

    async function aceitarTarefa(tarefaSelecionada: Tarefa) {
        const criancaId = String(
            tarefaSelecionada.fk_usuario_crianca ??
                tarefaSelecionada.fk_usuario_responsavel ??
                "",
        );

        if (!criancaId) {
            Alert.alert("Atenção", "Criança da tarefa não encontrada.");
            return;
        }

        try {
            await creditarTarefa(tarefaSelecionada.id);

            setTarefas((tarefasAtuais) =>
                tarefasAtuais.map((tarefa) =>
                    tarefa.id === tarefaSelecionada.id
                        ? {
                              ...tarefa,
                              status: "Concluída",
                              concluida: true,
                              recompensa_creditada: true,
                          }
                        : tarefa,
                ),
            );

            Alert.alert(
                "Tarefa aceita",
                "A recompensa foi adicionada ao cofrinho da criança.",
            );
        } catch (error) {
            console.log("Erro ao creditar tarefa:", error);
            Alert.alert("Erro", "Não foi possível creditar a recompensa.");
        }
    }

    return {
        tarefas,
        carregando,
        carregarTarefas,
        alterarStatusTarefa,
        excluirTarefa,
        aceitarTarefa,
    };
}