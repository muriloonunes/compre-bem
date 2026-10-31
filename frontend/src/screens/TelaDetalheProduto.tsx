import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetalheProduto} from "../components/DetalheProduto";
import {Produto} from "../types/Produto";
import {useCallback, useEffect, useState} from "react";
import {getProdutoById} from "../service/produtoService";

type RootStackParamList = {
    ListaProdutos: undefined;
    DetalheProduto: { produtoId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheProduto'>;

export default function TelaDetalheProduto({route}: Props) {
    const {produtoId} = route.params;
    const [produto, setProduto] = useState<Produto | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

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

    useEffect(() => {
        carregarProduto()
    }, [carregarProduto])

    return <DetalheProduto
        produto={produto}
        carregando={carregando}
        atualizando={atualizando}
        erro={erro}
        onAtualizar={() => carregarProduto(true)}
    />;
}
