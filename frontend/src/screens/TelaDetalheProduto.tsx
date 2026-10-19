import {StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetalheProduto} from "../components/DetalheProduto";
import {theme} from "../theme/theme";
import {Produto} from "../types/Produto";

type RootStackParamList = {
    ListaProdutos: undefined;
    DetalheProduto: { produtoId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheProduto'> & {
    produtos: Produto[];
};

export default function TelaDetalheProduto({route, produtos}: Props) {
    const {produtoId} = route.params;
    const produto = produtos.find((p) => p.id === produtoId);

    if (!produto) {
        return (
            <View style={styles.container}>
                <Text style={styles.erroText}>Produto não encontrado.</Text>
            </View>
        );
    }

    return <DetalheProduto produto={produto}/>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    erroText: {
        color: theme.colors.danger,
        fontSize: theme.fontSize.lg,
        textAlign: 'center',
        marginTop: 40,
    },
});
