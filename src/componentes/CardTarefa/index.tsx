import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { ButtonIcon } from "@/componentes/ButtonIcon";
import { StatusBadge } from "@/componentes/StatusBadge";
import type { StatusTarefa, Tarefa } from "@/types/navigation";
import { formatarValor } from "@/utils/formatadores";

import styles from "./styles";

type Props = {
  tarefa: Tarefa;
  numero: number;
  status: StatusTarefa;
  usuarioEhPai: boolean;
  tarefaEhDoFilhoLogado: boolean;
  onEditar: () => void;
  onExcluir: () => void;
  onAceitar: () => void;
  onRecusar: () => void;
  onIniciar: () => void;
  onEnviarParaAprovacao: () => void;
};

export function CardTarefa({
  tarefa,
  numero,
  status,
  usuarioEhPai,
  tarefaEhDoFilhoLogado,
  onEditar,
  onExcluir,
  onAceitar,
  onRecusar,
  onIniciar,
  onEnviarParaAprovacao,
}: Props) {
  const tarefaConcluida = status === "Concluída";

  const podeIniciarTarefa =
    tarefaEhDoFilhoLogado && status === "Em Aberto";

  const podeEnviarParaAprovacao =
    tarefaEhDoFilhoLogado &&
    (status === "Em Andamento" || status === "Recusada");

  const deveExibirAcoesDoFilho =
    podeIniciarTarefa || podeEnviarParaAprovacao;

  return (
    <View
      style={[
        styles.cardTarefa,
        tarefaConcluida && styles.cardTarefaConcluida,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!usuarioEhPai}
        style={styles.cardConteudo}
        onPress={onEditar}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTituloContainer}>
            <Text
              style={[
                styles.cardNumero,
                tarefaConcluida && styles.textoConcluido,
              ]}
            >
              Tarefa {numero}
            </Text>

            <Text
              numberOfLines={2}
              style={[
                styles.cardTitulo,
                tarefaConcluida && styles.textoConcluido,
              ]}
            >
              {tarefa.titulo}
            </Text>
          </View>

          <View style={styles.cardValorStatusContainer}>
            <Text style={styles.cardValor}>
              {formatarValor(tarefa.valor_recompensa)}
            </Text>

            <StatusBadge status={status} />
          </View>
        </View>

        <View style={styles.cardInfoRow}>
          <MaterialIcons name="person" size={18} color="#666666" />

          <Text style={styles.cardInfoTexto}>
            Responsável: {tarefa.nome_usuario_responsavel || "Não informado"}
          </Text>
        </View>

        <View style={styles.cardInfoRow}>
          <MaterialIcons name="child-care" size={18} color="#666666" />

          <Text style={styles.cardInfoTexto}>
            Criança:{" "}
            {tarefa.nome_usuario_crianca ||
              tarefa.nome_usuario_responsavel ||
              "Não vinculada"}
          </Text>
        </View>

        <View style={styles.cardInfoRow}>
          <MaterialIcons name="event" size={18} color="#666666" />

          <Text style={styles.cardInfoTexto}>
            Data limite: {tarefa.dataLimite || "Não informada"}
          </Text>
        </View>

        <Text style={styles.cardDescricaoTitulo}>Descrição</Text>

        <Text style={styles.cardDescricao}>
          {tarefa.descricao || "Sem descrição informada."}
        </Text>
      </TouchableOpacity>

      {usuarioEhPai && (
        <View style={styles.cardAcoes}>
          {status === "Aguardando Aprovação" && (
            <>
              <ButtonIcon
                name="check-circle"
                size={28}
                color="#095414"
                style={styles.botaoAcao}
                onPress={onAceitar}
              />

              <ButtonIcon
                name="cancel"
                size={28}
                color="#dc3545"
                style={styles.botaoAcao}
                onPress={onRecusar}
              />
            </>
          )}

          <ButtonIcon
            name="edit"
            size={28}
            color="#007BFF"
            style={styles.botaoAcao}
            onPress={onEditar}
          />

          <ButtonIcon
            name="delete-outline"
            size={28}
            color="#dc3545"
            style={styles.botaoAcao}
            onPress={onExcluir}
          />
        </View>
      )}

      {deveExibirAcoesDoFilho && (
        <View style={styles.cardAcoes}>
          {podeIniciarTarefa && (
            <ButtonIcon
              name="play-arrow"
              size={28}
              color="#007BFF"
              style={styles.botaoAcao}
              onPress={onIniciar}
            />
          )}

          {podeEnviarParaAprovacao && (
            <ButtonIcon
              name="check-circle"
              size={28}
              color="#095414"
              style={styles.botaoAcao}
              onPress={onEnviarParaAprovacao}
            />
          )}
        </View>
      )}
    </View>
  );
}