import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },

    keyboardAvoiding: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        paddingBottom: 12,
    },

    containerLogo: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 8,
    },

    containerForm: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 20,
    },

    cardVazio: {
        minHeight: 180,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e8edf3",
        backgroundColor: "#f8fbff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    textoVazio: {
        marginTop: 10,
        fontSize: 15,
        color: "#777",
        textAlign: "center",
    },

    textoVazioDescricao: {
        marginTop: 6,
        fontSize: 13,
        color: "#888",
        textAlign: "center",
    },

    cardTarefa: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e8edf3",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },

    cardTarefaConcluida: {
        backgroundColor: "#f8f9fa",
        opacity: 0.85,
    },

    cardConteudo: {
        width: "100%",
    },

    cardNumero: {
        fontSize: 12,
        fontWeight: "600",
        color: "#007bff",
        marginBottom: 4,
    },

    cardTitulo: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    cardValor: {
        fontSize: 15,
        fontWeight: "700",
        color: "#007bff",
    },

    cardInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },

    cardInfoTexto: {
        marginLeft: 6,
        fontSize: 14,
        color: "#555",
    },

    cardDescricaoTitulo: {
        marginTop: 12,
        fontSize: 13,
        fontWeight: "700",
        color: "#333",
    },

    cardDescricao: {
        marginTop: 4,
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },

    cardAcoes: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        marginTop: 14,
        paddingTop: 10,
    },

    botaoAcao: {
        marginLeft: 14,
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },

    textoConcluido: {
        textDecorationLine: "line-through",
        color: "#777",
    },

    footerContainer: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },

    botao: {
        width: "100%",
        height: 48,
        backgroundColor: "#007BFF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    filtrosContainer: {
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 8,
        marginBottom: 12,
    },

    filtrosScroll: {
        gap: 8,
        paddingRight: 20,
    },

    filtroBotao: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#d9d9d9",
    },

    filtroBotaoAtivo: {
        backgroundColor: "#007BFF",
        borderColor: "#007BFF",
    },

    filtroTexto: {
        color: "#666666",
        fontSize: 13,
        fontWeight: "600",
    },

    filtroTextoAtivo: {
        color: "#ffffff",
    },
    statusConcluida: {
        backgroundColor: "#28a745",
    },
    statusEmAndamento: {
        backgroundColor: "#007BFF",
    },
    statusPendente: {
        backgroundColor: "#ffc107",
    },
    statusExpirado: {
        backgroundColor: "#dc3545",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: "flex-start",
        marginTop: 6,
    },
    statusTexto: {
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "700",
    },
    statusEmAberto: {
        backgroundColor: "#ffc107",
    },

    statusAguardandoAprovacao: {
        backgroundColor: "#6f42c1",
    },

    statusRecusada: {
        backgroundColor: "#6c757d",
    },

    headerContainer: {
        width: "100%",
        marginBottom: 16,
    },

    headerRow: {
        width: "100%",
    },

    textContainer: {
        width: "100%",
        marginBottom: 12,
    },

    headerActions: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
    },

    titulo: {
        fontSize: 34,
        fontWeight: "800",
        color: "#1a1a1a",
    },

    subtitulo: {
        fontSize: 16,
        color: "#666666",
        marginTop: 4,
    },

    usuarioLogadoTexto: {
        fontSize: 14,
        color: "#666666",
        marginTop: 4,
    },

    botaoFilhos: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "#eaf3ff",
    },

    botaoFilhosTexto: {
        color: "#007BFF",
        fontSize: 13,
        fontWeight: "700",
    },

    botaoCofrinho: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "#eaf3ff",
    },

    botaoCofrinhoTexto: {
        color: "#007BFF",
        fontSize: 13,
        fontWeight: "700",
    },

    botaoSair: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#fff5f5",
        borderWidth: 1,
        borderColor: "#ffd6d6",
    },

    botaoSairTexto: {
        color: "#dc3545",
        fontSize: 13,
        fontWeight: "700",
    },
    botaoFamilia: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "#eaf3ff",
    },

    botaoFamiliaTexto: {
        color: "#007BFF",
        fontSize: 13,
        fontWeight: "700",
    },

    cardHeader: {
    width: "100%",
    gap: 10,
},

cardTituloContainer: {
    width: "100%",
},

cardValorStatusContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
},
});
