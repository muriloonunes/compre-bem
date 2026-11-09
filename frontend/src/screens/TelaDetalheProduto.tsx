import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetalheProduto} from "../components/DetalheProduto";
import {Produto} from "../types/Produto";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {deleteProduto, getProdutoById} from "../service/produtoService";
import {ActivityIndicator, Alert, TouchableOpacity} from "react-native";
import {theme} from "../theme/theme";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import Toast from "react-native-toast-message";

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

    useEffect(() => {
        carregarProduto()
    }, [carregarProduto])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: produto?.nome || 'Detalhes do Produto',
            headerRight: () => (
                excluindo ? (
                    <ActivityIndicator size="small" color={theme.colors.danger}/>
                ) : (
                    <TouchableOpacity
                        onPress={confirmarExclusao}
                        disabled={excluindo}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    >
                        <MaterialDesignIcons
                            name="trash-can-outline"
                            size={22}
                            color={theme.colors.danger}
                        />
                    </TouchableOpacity>
                )
            )
        })
    }, [navigation, produto, excluindo])

    return <DetalheProduto
        produto={produto}
        carregando={carregando}
        atualizando={atualizando}
        erro={erro}
        onAtualizar={() => carregarProduto(true)}
    />;
}
