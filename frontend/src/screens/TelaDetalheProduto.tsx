import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetalheProduto} from "../components/DetalheProduto";
import {CriarProdutoDTO, Produto} from "../types/Produto";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {deleteProduto, getProdutoById, updateProduto} from "../service/produtoService";
import {ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View} from "react-native";
import {theme} from "../theme/theme";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import Toast from "react-native-toast-message";
import NovoProdutoModal from "../components/NovoProdutoModal";

type RootStackParamList = {
    ListaProdutos: undefined;
    DetalheProduto: { produtoId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheProduto'>;

export default function TelaDetalheProduto({route, navigation}: Props) {
    const {produtoId} = route.params;
    const [produto, setProduto] = useState<Produto | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [excluindo, setExcluindo] = useState(false);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);

    const carregarProduto = useCallback(async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setAtualizando(true)
            } else {
                setCarregando(true)
            }

            setErro(null)

            const produto = await getProdutoById(produtoId)
            setProduto(produto)
        } catch (error) {
            console.error('Erro ao carregar o produto:', error);
            setErro('Erro ao carregar o produto.');
        } finally {
            setAtualizando(false)
            setCarregando(false)
        }
    }, [produtoId])

    function confirmarExclusao() {
        Alert.alert(
            'Excluir produto',
            `Tem certeza que deseja excluir "${produto?.nome || 'este produto'}"?`,
            [
                {text: 'Cancelar', style: 'cancel'},
                {
                    text: 'Excluir', style: 'destructive',
                    onPress: async () => {
                        try {
                            setExcluindo(true)
                            await deleteProduto(produtoId)
                            navigation.goBack()
                        } catch (error) {
                            Toast.show({
                                type: "error",
                                text1: "Erro ao excluir o produto",
                            })
                        } finally {
                            setExcluindo(false)
                        }
                    }
                }
            ]
        )
    }

    async function handleSalvarEdicao(dadosAtualizados: CriarProdutoDTO) {
        const produtoAtualizado = await updateProduto(produtoId, dadosAtualizados);
        setProduto(produtoAtualizado);
    }

    useEffect(() => {
        carregarProduto()
    }, [carregarProduto])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: produto?.nome || "Detalhes",
            headerRight: () => {
                if (!produto) return null;

                if (excluindo) {
                    return (
                        <View style={styles.headerActions}>
                            <ActivityIndicator size="small" color={theme.colors.danger} />
                        </View>
                    );
                }

                return (
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            onPress={() => setModalEditarAberto(true)}
                            disabled={excluindo}
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            style={styles.headerButton}
                            accessibilityLabel="Editar produto"
                            accessibilityRole="button"
                        >
                            <MaterialDesignIcons
                                name="pencil-outline"
                                size={22}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={confirmarExclusao}
                            disabled={excluindo}
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            style={styles.headerButton}
                            accessibilityLabel="Excluir produto"
                            accessibilityRole="button"
                        >
                            <MaterialDesignIcons
                                name="trash-can-outline"
                                size={22}
                                color={theme.colors.danger}
                            />
                        </TouchableOpacity>
                    </View>
                );
            },
        });
    }, [navigation, produto, excluindo]);

    return (
        <View style={styles.container}>
            <DetalheProduto
                produto={produto}
                carregando={carregando}
                atualizando={atualizando}
                erro={erro}
                onAtualizar={() => carregarProduto(true)}
            />

            <NovoProdutoModal
                visible={modalEditarAberto}
                onClose={() => setModalEditarAberto(false)}
                onSave={handleSalvarEdicao}
                produtoEditar={produto}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        paddingRight: theme.spacing.xs,
    },
    headerButton: {
        padding: theme.spacing.xs,
        justifyContent: 'center',
        alignItems: 'center',
    },
});