import {StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetalheProduto} from "../components/DetalheProduto";
import {produtosMock} from "../mocks/produtosMock";
import {theme} from "../theme/theme";

type RootStackParamList = {
    Lista: undefined;
    Detalhe: { produtoId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

export default function TelaDetalheProduto({route}: Props) {
    const {produtoId} = route.params;
    const produto = produtosMock.find((p) => p.id === produtoId);

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
