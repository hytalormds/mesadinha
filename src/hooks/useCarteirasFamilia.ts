import React from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
    CarteiraComUsuario,
    listarCarteiras,
    listarMovimentacoes,
} from "@/services/mesadinha/carteira.services";

import type { Movimentacao, Usuario } from "@/types/navigation";

type Params = {
    usuario: Usuario | null;
    carregarMovimentacoes?: boolean;
};

export function useCarteirasFamilia({
    usuario,
    carregarMovimentacoes = true,
}: Params) {
    const [carteiras, setCarteiras] = React.useState<CarteiraComUsuario[]>([]);
    const [movimentacoes, setMovimentacoes] = React.useState<Movimentacao[]>([]);
    const [carregando, setCarregando] = React.useState(true);

    const usuarioEhPai =
        usuario?.id_tipo === 1 || usuario?.papel === "responsavel";

    const usuarioEhFilho =
        usuario?.id_tipo === 2 || usuario?.papel === "crianca";

    async function carregarDados() {
        if (!usuario) {
            setCarteiras([]);
            setMovimentacoes([]);
            setCarregando(false);
            return;
        }

        try {
            setCarregando(true);

            if (carregarMovimentacoes) {
                const [carteirasResponse, movimentacoesResponse] =
                    await Promise.all([
                        listarCarteiras(),
                        listarMovimentacoes(),
                    ]);

                setCarteiras(carteirasResponse);
                setMovimentacoes(movimentacoesResponse);
                return;
            }

            const carteirasResponse = await listarCarteiras();

            setCarteiras(carteirasResponse);
            setMovimentacoes([]);
        } catch (error) {
            console.log("Erro ao carregar carteiras da família:", error);
            Alert.alert("Erro", "Não foi possível carregar os dados da família.");
        } finally {
            setCarregando(false);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            carregarDados();
        }, [usuario?.id_usuario, usuario?.id_tipo, usuario?.papel]),
    );

    const carteirasDosFilhos = carteiras.filter((carteira) => {
        const usuarioDaCarteira = carteira.usuario;

        return (
            usuarioDaCarteira?.id_tipo === 2 ||
            usuarioDaCarteira?.papel === "crianca"
        );
    });

    const carteirasVisiveisNoCofrinho = carteirasDosFilhos.filter((carteira) => {
        if (!usuario) {
            return false;
        }

        const carteiraEhDoUsuarioLogado =
            String(carteira.fk_usuario_id) === String(usuario.id_usuario);

        if (usuarioEhPai) {
            return !carteiraEhDoUsuarioLogado;
        }

        if (usuarioEhFilho) {
            return carteiraEhDoUsuarioLogado;
        }

        return false;
    });

    const carteirasVisiveisNaFamilia = carteirasDosFilhos;

    const saldoTotalCofrinho = carteirasVisiveisNoCofrinho.reduce(
        (total, carteira) => total + carteira.saldo,
        0,
    );

    const saldoTotalFamilia = carteirasVisiveisNaFamilia.reduce(
        (total, carteira) => total + carteira.saldo,
        0,
    );

    const idsCarteirasCofrinho = carteirasVisiveisNoCofrinho.map((carteira) =>
        String(carteira.id_carteira),
    );

    const movimentacoesVisiveisNoCofrinho = movimentacoes.filter(
        (movimentacao) =>
            idsCarteirasCofrinho.includes(String(movimentacao.fk_carteira_id)),
    );

    return {
        carteiras,
        carteirasDosFilhos,
        carteirasVisiveisNoCofrinho,
        carteirasVisiveisNaFamilia,
        movimentacoes,
        movimentacoesVisiveisNoCofrinho,
        saldoTotalCofrinho,
        saldoTotalFamilia,
        carregando,
        carregarDados,
    };
}